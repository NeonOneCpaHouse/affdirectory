import { createClient } from "@sanity/client"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

function stripDraftPrefix(id) {
  return id.replace(/^drafts\./, "")
}

function isDraftId(id) {
  return id.startsWith("drafts.")
}

function normalizeSlug(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function getGroupSlug(doc) {
  return doc.slug?.current || normalizeSlug(doc.name?.en || "")
}

function selectCanonicalBase(candidates) {
  return [...candidates].sort((left, right) => {
    if (left.hasPublished !== right.hasPublished) {
      return left.hasPublished ? -1 : 1
    }

    const leftCreatedAt = left.createdAt || ""
    const rightCreatedAt = right.createdAt || ""
    return leftCreatedAt.localeCompare(rightCreatedAt)
  })[0]
}

function mergeLocalizedName(documents) {
  const merged = {
    en: "",
    ru: "",
  }
  const conflicts = []

  for (const locale of ["en", "ru"]) {
    for (const doc of documents) {
      const value = doc.name?.[locale]?.trim()
      if (!value) continue

      if (!merged[locale]) {
        merged[locale] = value
        continue
      }

      if (merged[locale] !== value) {
        conflicts.push({
          locale,
          kept: merged[locale],
          ignored: value,
          documentId: doc._id,
        })
      }
    }
  }

  return {
    merged,
    conflicts,
  }
}

function dedupeRefs(tagRefs) {
  const seen = new Set()
  const deduped = []

  for (const tag of tagRefs || []) {
    if (!tag?._ref || seen.has(tag._ref)) continue
    seen.add(tag._ref)
    deduped.push(tag)
  }

  return deduped
}

async function fetchTags() {
  return client.fetch(`*[_type == "articleTag"]{
    _id,
    _createdAt,
    audience,
    name,
    slug
  }`)
}

async function fetchArticles() {
  return client.fetch(`*[_type == "article"]{
    _id,
    tags
  }`)
}

async function migrate() {
  const report = {
    mergedGroups: [],
    updatedArticles: [],
    nameConflicts: [],
    skipped: [],
    deletedTagIds: [],
    normalizedTagIds: [],
  }

  const tags = await fetchTags()
  const groups = new Map()

  for (const tag of tags) {
    const groupSlug = getGroupSlug(tag)

    if (!tag.audience || !groupSlug) {
      report.skipped.push({
        tagId: tag._id,
        reason: "Missing audience or slug/name fallback",
      })
      continue
    }

    const groupKey = `${tag.audience}::${groupSlug}`
    const existing = groups.get(groupKey) || []
    existing.push(tag)
    groups.set(groupKey, existing)
  }

  const replacementMap = new Map()
  const canonicalPatchTargets = new Map()
  const duplicateIdsToDelete = new Set()

  for (const [groupKey, documents] of groups.entries()) {
    const byBaseId = new Map()

    for (const document of documents) {
      const baseId = stripDraftPrefix(document._id)
      const candidate = byBaseId.get(baseId) || {
        baseId,
        documents: [],
        hasPublished: false,
        createdAt: document._createdAt,
        publishedId: null,
        draftId: null,
      }

      candidate.documents.push(document)
      candidate.hasPublished = candidate.hasPublished || !isDraftId(document._id)
      candidate.createdAt =
        !candidate.createdAt || document._createdAt < candidate.createdAt
          ? document._createdAt
          : candidate.createdAt
      candidate.publishedId = !isDraftId(document._id) ? document._id : candidate.publishedId
      candidate.draftId = isDraftId(document._id) ? document._id : candidate.draftId

      byBaseId.set(baseId, candidate)
    }

    const candidates = Array.from(byBaseId.values())
    const canonical = selectCanonicalBase(candidates)
    const canonicalRefId = canonical.publishedId || canonical.draftId
    const mergedName = mergeLocalizedName(documents)
    const canonicalSlug = documents.find((doc) => doc.slug?.current)?.slug?.current || groupKey.split("::")[1]

    report.nameConflicts.push(
      ...mergedName.conflicts.map((conflict) => ({
        group: groupKey,
        ...conflict,
      })),
    )

    canonicalPatchTargets.set(canonical.baseId, {
      name: mergedName.merged,
      slug: canonicalSlug,
      docIds: canonical.documents.map((doc) => doc._id),
    })

    if (candidates.length > 1) {
      report.mergedGroups.push({
        group: groupKey,
        canonicalId: canonicalRefId,
        mergedIds: candidates
          .filter((candidate) => candidate.baseId !== canonical.baseId)
          .flatMap((candidate) => candidate.documents.map((doc) => doc._id)),
      })
    }

    for (const candidate of candidates) {
      if (candidate.baseId === canonical.baseId) continue

      if (candidate.publishedId) replacementMap.set(candidate.publishedId, canonicalRefId)
      if (candidate.draftId) replacementMap.set(candidate.draftId, canonicalRefId)

      for (const doc of candidate.documents) {
        duplicateIdsToDelete.add(doc._id)
      }
    }
  }

  for (const target of canonicalPatchTargets.values()) {
    const patchPayload = {
      name: target.name,
      slug: { _type: "slug", current: target.slug },
    }

    for (const docId of target.docIds) {
      await client.patch(docId).set(patchPayload).unset(["category"]).commit()
      report.normalizedTagIds.push(docId)
    }
  }

  const articles = await fetchArticles()

  for (const article of articles) {
    const nextTags = dedupeRefs(
      (article.tags || []).map((tag) =>
        replacementMap.has(tag._ref)
          ? { ...tag, _ref: replacementMap.get(tag._ref) }
          : tag,
      ),
    )

    const changed =
      JSON.stringify(article.tags || []) !== JSON.stringify(nextTags)

    if (!changed) continue

    await client.patch(article._id).set({ tags: nextTags }).commit()
    report.updatedArticles.push(article._id)
  }

  for (const duplicateId of duplicateIdsToDelete) {
    await client.delete(duplicateId)
    report.deletedTagIds.push(duplicateId)
  }

  console.log(JSON.stringify(report, null, 2))
}

migrate().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
