import { createClient } from "@sanity/client"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { getArticleViewCountKey } from "../lib/articleViews"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const sanityToken = process.env.SANITY_API_TOKEN
const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

if (!projectId || !dataset || !sanityToken) {
  throw new Error("Missing Sanity credentials for article view migration.")
}

if (!redisUrl || !redisToken) {
  throw new Error("Missing Upstash Redis credentials for article view migration.")
}

const sanityClient = createClient({
  projectId,
  dataset,
  token: sanityToken,
  apiVersion: "2024-01-01",
  useCdn: false,
})

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
})

interface ArticleMigrationRecord {
  _id: string
  slug?: string
  title?: {
    en?: string
  }
  views?: number
}

function normalizeCount(value: number | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0
  }

  return Math.max(0, Math.floor(value))
}

async function migrateArticleViews() {
  const articles = await sanityClient.fetch<ArticleMigrationRecord[]>(
    `*[_type == "article"]{
      _id,
      "slug": slug.current,
      title,
      "views": coalesce(views, 0)
    } | order(_createdAt asc)`,
  )

  let seeded = 0
  let skipped = 0

  for (const article of articles) {
    const baseline = normalizeCount(article.views)
    const result = await redis.set(getArticleViewCountKey(article._id), baseline, { nx: true })

    if (result === "OK") {
      seeded += 1
      console.log(`Seeded ${article._id} (${article.slug || article.title?.en || "untitled"}) with ${baseline} views`)
      continue
    }

    skipped += 1
    console.log(`Skipped ${article._id} (${article.slug || article.title?.en || "untitled"}), counter already exists`)
  }

  console.log(`Article view migration complete. Seeded: ${seeded}. Skipped: ${skipped}.`)
}

void migrateArticleViews().catch((error) => {
  console.error("Article view migration failed:", error)
  process.exitCode = 1
})
