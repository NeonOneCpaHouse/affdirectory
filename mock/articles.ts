import { client } from "@/lib/sanity"
import type { Localized } from "@/types"
import type { PortableTextBlock } from "@portabletext/types"

export type ArticleType = "blog" | "guide" | "case" | "news"
export type BlogCategory = "news" | "case-studies" | "google" | "monetization" | "seo" | "tools" | "ai"
export type GuideCategory = "monetization-formats" | "optimization" | "technical" | "scaling"

export interface Article {
  slug: string
  title: Localized<string>
  type: ArticleType
  category: BlogCategory | GuideCategory
  date: string
  excerpt: Localized<string>
  body: Localized<PortableTextBlock[]>
  thumbnail?: Localized<string>
  readingTime?: number
  checklist?: Localized<string[]>
  caseStudySections?: Localized<{
    setup: string
    traffic: string
    placements: string
    results: string
    lessons: string
  }>
}

export async function getArticles(audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience] | order(date desc) {
    "slug": slug.current,
    title,
    type,
    category,
    date,
    excerpt,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    readingTime,
    checklist,
    caseStudySections
  }`

  try {
    return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch articles from Sanity:", error)
    return []
  }
}

export async function getArticlesByType(type: ArticleType, audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && type == $type && audience == $audience] | order(date desc) {
    "slug": slug.current,
    title,
    type,
    category,
    date,
    excerpt,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    readingTime,
    checklist,
    caseStudySections
  }`

  try {
    return await client.fetch(query, { type, audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch articles by type from Sanity:", error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    type,
    category,
    date,
    excerpt,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    readingTime,
    checklist,
    caseStudySections
  }`

  try {
    return await client.fetch(query, { slug }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch article by slug from Sanity:", error)
    return undefined
  }
}

export async function getBlogArticles(audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && (type == "blog" || type == "news" || type == "case") && audience == $audience] | order(date desc) {
    "slug": slug.current,
    title,
    type,
    category,
    date,
    excerpt,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    readingTime,
    checklist,
    caseStudySections
  }`

  try {
    return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch blog articles from Sanity:", error)
    return []
  }
}

export async function getBlogArticlesByCategory(category: BlogCategory, audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && (type == "blog" || type == "news" || type == "case") && category == $category && audience == $audience] | order(date desc) {
    "slug": slug.current,
    title,
    type,
    category,
    date,
    excerpt,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    readingTime,
    checklist,
    caseStudySections
  }`

  try {
    return await client.fetch(query, { category, audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch blog articles by category from Sanity:", error)
    return []
  }
}

export async function getLatestNews(count = 6, audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && (type == "blog" || type == "news") && audience == $audience] | order(date desc) [0...$count] {
    "slug": slug.current,
    title,
    type,
    category,
    date,
    excerpt,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    readingTime
  }`

  try {
    return await client.fetch(query, { count, audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch latest news from Sanity:", error)
    return []
  }
}

export async function getLatestGuides(count = 6, audience: string = "affiliate"): Promise<Article[]> {
  const articles = await getArticlesByType("guide", audience)
  return articles.slice(0, count)
}

export async function getCaseStudies(count = 6, audience: string = "affiliate"): Promise<Article[]> {
  const articles = await getArticlesByType("case", audience)
  return articles.slice(0, count)
}

export async function getRelatedArticles(
  currentSlug: string,
  count = 3,
  audience: string = "affiliate",
): Promise<Article[]> {
  const current = await getArticleBySlug(currentSlug)
  if (!current) return []

  const query = `*[_type == "article" && slug.current != $slug && (type == $type || category == $category) && audience == $audience] | order(date desc) [0...$count] {
    "slug": slug.current,
    title,
    type,
    category,
    date,
    excerpt,
    body,
    "thumbnail": {
      "en": thumbnail.en.asset->url,
      "ru": thumbnail.ru.asset->url
    },
    readingTime
  }`

  try {
    return await client.fetch(
      query,
      {
        slug: currentSlug,
        type: current.type,
        category: current.category,
        count,
        audience,
      },
      { next: { revalidate: 0 } },
    )
  } catch (error) {
    console.error("[v0] Failed to fetch related articles from Sanity:", error)
    return []
  }
}

// Export for backward compatibility
export const articles = getArticles()
