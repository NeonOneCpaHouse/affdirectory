import { SITE_URL, getAbsoluteUrl, type SupportedLanguage, type SupportedAudience } from "@/lib/seo"

// ─── Types ──────────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string
  href?: string
}

interface ArticleJsonLdInput {
  lang: SupportedLanguage
  audience: SupportedAudience
  title: string
  description: string
  datePublished: string
  dateModified?: string
  slug: string
  thumbnailUrl?: string
  section?: string
  authorName?: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildUrl(lang: SupportedLanguage, audience: SupportedAudience, pathname = "") {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `${SITE_URL}/${lang}/${audience}${normalized}`
}

const PUBLISHER = {
  "@type": "Organization" as const,
  name: "AffTraff",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject" as const,
    url: getAbsoluteUrl("/logobrand.webp"),
  },
}

// ─── Generators ─────────────────────────────────────────────────────────────

/**
 * Article / NewsArticle structured data for blog posts, guides, case studies, etc.
 */
export function articleJsonLd({
  lang,
  audience,
  title,
  description,
  datePublished,
  dateModified,
  slug,
  thumbnailUrl,
  section,
  authorName,
}: ArticleJsonLdInput) {
  const url = buildUrl(lang, audience, `/blog/${slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorName
      ? { "@type": "Person" as const, name: authorName }
      : PUBLISHER,
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(thumbnailUrl ? { image: thumbnailUrl } : {}),
    ...(section ? { articleSection: section } : {}),
  }
}

/**
 * BreadcrumbList structured data.
 * Items should be in order from root to current page.
 * The last item should NOT have an href (it's the current page).
 */
export function breadcrumbJsonLd(
  lang: SupportedLanguage,
  audience: SupportedAudience,
  items: BreadcrumbItem[],
) {
  const homeItem = {
    "@type": "ListItem" as const,
    position: 1,
    name: lang === "ru" ? "Главная" : "Home",
    item: buildUrl(lang, audience),
  }

  const listItems = items.map((item, index) => {
    const entry: Record<string, unknown> = {
      "@type": "ListItem",
      position: index + 2,
      name: item.name,
    }
    if (item.href) {
      // If href already starts with /, build full URL, otherwise use as-is
      entry.item = item.href.startsWith("http")
        ? item.href
        : buildUrl(lang, audience, item.href)
    }
    return entry
  })

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [homeItem, ...listItems],
  }
}

/**
 * Organization structured data for the home/about page.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AffTraff",
    url: SITE_URL,
    logo: getAbsoluteUrl("/logobrand.webp"),
    description:
      "Affiliate marketing directory with network rankings, guides, tools, and industry news for media buyers and webmasters.",
  }
}

/**
 * WebSite structured data for the home page.
 */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AffTraff",
    url: SITE_URL,
  }
}

// ─── Render helper ──────────────────────────────────────────────────────────

/**
 * Renders one or more JSON-LD objects as `<script type="application/ld+json">` tags.
 * Use in Server Components: `<JsonLd data={[articleJsonLd(...), breadcrumbJsonLd(...)]} />`
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data]

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
