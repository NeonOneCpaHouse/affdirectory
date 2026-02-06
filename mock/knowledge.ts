import { client } from "@/lib/sanity"
import type { Localized } from "@/types"
import type { PortableTextBlock } from "@portabletext/types"

export type KnowledgeCategory =
  | "traffic"
  | "monetization-models"
  | "ad-formats"
  | "metrics"
  | "ad-networks"
  | "technical"
  | "webmaster"
  | "financial"

export interface KnowledgeEntry {
  slug: string
  title: Localized<string>
  category: KnowledgeCategory
  body: Localized<PortableTextBlock[]>
  thumbnail?: Localized<string>
  overview?: Localized<string>
}

export async function getAllKnowledgeEntries(audience: string = "affiliate"): Promise<KnowledgeEntry[]> {
  const query = `*[_type == "knowledge" && audience == $audience] | order(title.en asc) {
    "slug": slug.current,
    title,
    category,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    overview
  }`

  try {
    return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch knowledge entries from Sanity:", error)
    return []
  }
}

export async function getKnowledgeByCategory(
  category: KnowledgeCategory,
  audience: string = "affiliate",
): Promise<KnowledgeEntry[]> {
  const query = `*[_type == "knowledge" && category == $category && audience == $audience] | order(title.en asc) {
    "slug": slug.current,
    title,
    category,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    overview
  }`

  try {
    return await client.fetch(query, { category, audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch knowledge entries by category from Sanity:", error)
    return []
  }
}

export async function getKnowledgeBySlug(slug: string): Promise<KnowledgeEntry | undefined> {
  const query = `*[_type == "knowledge" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    category,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    overview
  }`

  try {
    return await client.fetch(query, { slug }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch knowledge entry by slug from Sanity:", error)
    return undefined
  }
}

export function groupKnowledgeByCategory(entries: KnowledgeEntry[]): Record<KnowledgeCategory, KnowledgeEntry[]> {
  const grouped: Record<string, KnowledgeEntry[]> = {
    traffic: [],
    "monetization-models": [],
    "ad-formats": [],
    metrics: [],
    "ad-networks": [],
    technical: [],
    webmaster: [],
    financial: [],
  }

  entries.forEach((entry) => {
    if (grouped[entry.category]) {
      grouped[entry.category].push(entry)
    }
  })

  return grouped as Record<KnowledgeCategory, KnowledgeEntry[]>
}
