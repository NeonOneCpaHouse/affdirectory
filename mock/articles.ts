import { client } from "@/lib/sanity"
import { getArticleViewCount } from "@/lib/articleViews"
import type { Localized } from "@/types"
import type { PortableTextBlock } from "@portabletext/types"

export type ArticleCategory = "news" | "reviews" | "case-studies" | "guides" | "trends"

export interface ArticleTag {
  name: { en: string; ru: string }
  slug: string
}

export interface ArticleTagIndex {
  allTags: ArticleTag[]
  byCategory: Record<ArticleCategory, ArticleTag[]>
}

export interface Article {
  _id: string
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
  views: number
}

const articleCategories: ArticleCategory[] = ["news", "reviews", "case-studies", "guides", "trends"]

function createEmptyTagIndex(): ArticleTagIndex {
  return {
    allTags: [],
    byCategory: {
      news: [],
      reviews: [],
      "case-studies": [],
      guides: [],
      trends: [],
    },
  }
}

function sortTags(tags: ArticleTag[]): ArticleTag[] {
  return [...tags].sort((left, right) =>
    (left.name.en || left.name.ru || left.slug).localeCompare(
      right.name.en || right.name.ru || right.slug,
      "en",
      { sensitivity: "base" },
    ),
  )
}

export function buildArticleTagIndex(articles: Article[]): ArticleTagIndex {
  const emptyIndex = createEmptyTagIndex()
  const allTags = new Map<string, ArticleTag>()
  const byCategoryMaps = articleCategories.reduce(
    (acc, category) => {
      acc[category] = new Map<string, ArticleTag>()
      return acc
    },
    {} as Record<ArticleCategory, Map<string, ArticleTag>>,
  )

  for (const article of articles) {
    for (const tag of article.tags || []) {
      if (!tag?.slug) continue

      if (!allTags.has(tag.slug)) {
        allTags.set(tag.slug, tag)
      }

      if (!byCategoryMaps[article.category].has(tag.slug)) {
        byCategoryMaps[article.category].set(tag.slug, tag)
      }
    }
  }

  return {
    allTags: sortTags(Array.from(allTags.values())),
    byCategory: articleCategories.reduce(
      (acc, category) => {
        acc[category] = sortTags(Array.from(byCategoryMaps[category].values()))
        return acc
      },
      emptyIndex.byCategory,
    ),
  }
}

// Common GROQ projection for articles
const articleProjection = `{
  _id,
  "slug": slug.current,
  title,
  category,
  "tags": array::compact(tags[]->{ name, "slug": slug.current }),
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

async function attachLiveViews(articles: Article[]): Promise<Article[]> {
  if (articles.length === 0) {
    return articles
  }

  const liveViews = await Promise.all(
    articles.map(async (article) => {
      const liveCount = await getArticleViewCount(article._id)
      return liveCount ?? article.views
    }),
  )

  return articles.map((article, index) => ({
    ...article,
    views: liveViews[index] ?? article.views,
  }))
}

async function attachLiveView(article: Article | undefined): Promise<Article | undefined> {
  if (!article) {
    return undefined
  }

  const liveCount = await getArticleViewCount(article._id)
  return {
    ...article,
    views: liveCount ?? article.views,
  }
}

export async function getArticles(audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience] | order(date desc) ${articleProjection}`

  try {
    const articles = await client.fetch<Article[]>(query, { audience }, { next: { revalidate: 0 } })
    return await attachLiveViews(articles)
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
    const articles = await client.fetch<Article[]>(query, { category, audience }, { next: { revalidate: 0 } })
    return await attachLiveViews(articles)
  } catch (error) {
    console.error("Failed to fetch articles by category from Sanity:", error)
    return []
  }
}

export async function getArticleBySlug(
  slug: string,
  audience: string = "affiliate",
): Promise<Article | undefined> {
  const query = `*[_type == "article" && slug.current == $slug && audience == $audience][0] ${articleProjection}`

  try {
    const article = await client.fetch<Article | undefined>(query, { slug, audience }, { next: { revalidate: 0 } })
    return await attachLiveView(article)
  } catch (error) {
    console.error("Failed to fetch article by slug from Sanity:", error)
    return undefined
  }
}

export async function getBlogArticles(audience: string = "affiliate"): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience] | order(date desc) ${articleProjection}`

  try {
    const articles = await client.fetch<Article[]>(query, { audience }, { next: { revalidate: 0 } })
    return await attachLiveViews(articles)
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
    const articles = await client.fetch<Article[]>(query, { tagSlug, audience }, { next: { revalidate: 0 } })
    return await attachLiveViews(articles)
  } catch (error) {
    console.error("Failed to fetch articles by tag from Sanity:", error)
    return []
  }
}

export async function getLatestArticles(
  count = 6,
  audience: string = "affiliate",
): Promise<Article[]> {
  const query = `*[_type == "article" && audience == $audience] | order(date desc) [0...$count] ${articleProjection}`

  try {
    const articles = await client.fetch<Article[]>(query, { count, audience }, { next: { revalidate: 0 } })
    return await attachLiveViews(articles)
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
  const current = await getArticleBySlug(currentSlug, audience)
  if (!current) return []

  const query = `*[_type == "article" && slug.current != $slug && category == $category && audience == $audience] | order(date desc) [0...$count] ${articleProjection}`

  try {
    const articles = await client.fetch<Article[]>(
      query,
      {
        slug: currentSlug,
        category: current.category,
        count,
        audience,
      },
      { next: { revalidate: 0 } },
    )
    return await attachLiveViews(articles)
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
    const results = await client.fetch<Article[]>(
      sanityQuery,
      { term: query, audience, language },
      { next: { revalidate: 0 } },
    )
    return await attachLiveViews(results)
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
