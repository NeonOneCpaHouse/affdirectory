import { client } from "@/lib/sanity"
import type { Localized } from "@/types"
import type { PortableTextBlock } from "@portabletext/types"

export type ArticleCategory = "news" | "reviews" | "case-studies" | "guides" | "trends"

export interface ArticleTag {
  name: { en: string; ru: string }
  slug: string
}

export interface Article {
  slug: string
  title: Localized<string>
  category: ArticleCategory
  tags: ArticleTag[]
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
  views?: number
}

// Common GROQ projection for articles
const articleProjection = `{
  "slug": slug.current,
  title,
  category,
  "tags": tags[]->{ name, "slug": slug.current },
  date,
  excerpt,
  body,
  "thumbnail": {
    "en": thumbnail.en.asset->url,
    "ru": thumbnail.ru.asset->url
  },
  readingTime,
  checklist,
  caseStudySections,
  "views": coalesce(views, 0)
}`

export async function getArticles(audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience] | order(date desc) ${articleProjection}`

  try {
    return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch articles from Sanity:", error)
    return []
  }
}

export async function getArticlesByCategory(
  category: ArticleCategory,
  audience: string = "affiliate",
): Promise<Article[]> {
  const query = `*[_type == "article" && category == $category && audience == $audience] | order(date desc) ${articleProjection}`

  try {
    return await client.fetch(query, { category, audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch articles by category from Sanity:", error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const query = `*[_type == "article" && slug.current == $slug][0] ${articleProjection}`

  try {
    return await client.fetch(query, { slug }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch article by slug from Sanity:", error)
    return undefined
  }
}

export async function getBlogArticles(audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience] | order(date desc) ${articleProjection}`

  try {
    return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch blog articles from Sanity:", error)
    return []
  }
}

export async function getArticlesByTag(
  tagSlug: string,
  audience: string = "affiliate",
): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience && $tagSlug in tags[]->slug.current] | order(date desc) ${articleProjection}`

  try {
    return await client.fetch(query, { tagSlug, audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch articles by tag from Sanity:", error)
    return []
  }
}

export async function getTagsByCategory(
  audience: string,
  category: ArticleCategory,
): Promise<ArticleTag[]> {
  const query = `*[_type == "articleTag" && audience == $audience && category == $category] | order(name.en asc) {
    name,
    "slug": slug.current
  }`

  try {
    return await client.fetch(query, { audience, category }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch tags from Sanity:", error)
    return []
  }
}

export async function getAllTagsForAudience(
  audience: string,
): Promise<Record<ArticleCategory, ArticleTag[]>> {
  const query = `*[_type == "articleTag" && audience == $audience] | order(name.en asc) {
    name,
    "slug": slug.current,
    category
  }`

  try {
    const tags = await client.fetch(query, { audience }, { next: { revalidate: 0 } })
    const grouped: Record<string, ArticleTag[]> = {
      news: [],
      reviews: [],
      "case-studies": [],
      guides: [],
      trends: [],
    }
    for (const tag of tags) {
      if (grouped[tag.category]) {
        grouped[tag.category].push({ name: tag.name, slug: tag.slug })
      }
    }
    return grouped as Record<ArticleCategory, ArticleTag[]>
  } catch (error) {
    console.error("Failed to fetch all tags from Sanity:", error)
    return {
      news: [],
      reviews: [],
      "case-studies": [],
      guides: [],
      trends: [],
    }
  }
}

export async function getLatestArticles(
  count = 6,
  audience: string = "affiliate",
): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience] | order(date desc) [0...$count] ${articleProjection}`

  try {
    return await client.fetch(query, { count, audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch latest articles from Sanity:", error)
    return []
  }
}

export async function getRelatedArticles(
  currentSlug: string,
  count = 3,
  audience: string = "affiliate",
): Promise<Article[]> {
  const current = await getArticleBySlug(currentSlug)
  if (!current) return []

  const query = `*[_type == "article" && slug.current != $slug && category == $category && audience == $audience] | order(date desc) [0...$count] ${articleProjection}`

  try {
    return await client.fetch(
      query,
      {
        slug: currentSlug,
        category: current.category,
        count,
        audience,
      },
      { next: { revalidate: 0 } },
    )
  } catch (error) {
    console.error("Failed to fetch related articles from Sanity:", error)
    return []
  }
}

export async function searchArticles(
  query: string,
  audience: string = "affiliate",
  language: string = "en",
): Promise<Article[]> {
  if (!query || query.length < 2) return []

  const sanityQuery = `*[_type == "article" && audience == $audience && (
    title[$language] match $term + "*" || 
    body[$language][].children[].text match $term + "*" ||
    excerpt[$language] match $term + "*"
  )] | order(date desc) ${articleProjection}`

  try {
    const results = await client.fetch(
      sanityQuery,
      { term: query, audience, language },
      { next: { revalidate: 0 } },
    )
    return results
  } catch (error) {
    console.error("Failed to search articles from Sanity:", error)
    return []
  }
}

// Legacy backward compat aliases
export const getLatestNews = getLatestArticles
export const getLatestGuides = getLatestArticles
export const getCaseStudies = getLatestArticles
export const articles = getArticles()
