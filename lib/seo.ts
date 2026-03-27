import type { Metadata } from "next"

export const supportedLanguages = ["en", "ru"] as const
export const supportedAudiences = ["affiliate", "webmaster"] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]
export type SupportedAudience = (typeof supportedAudiences)[number]

export interface LocalizedSeoEntry {
  title: Record<SupportedLanguage, string>
  description: Record<SupportedLanguage, string>
}

export type AudienceSeoEntry = Record<SupportedAudience, LocalizedSeoEntry>

export type HubSeoKey =
  | "home"
  | "blog"
  | "guides"
  | "caseStudies"
  | "rankings"
  | "tools"
  | "knowledgeBase"
  | "events"
  | "jobs"
  | "about"
  | "contact"

const DEFAULT_SITE_URL = "https://afftraff.io"
const DEFAULT_OG_IMAGE_PATH = "/og-default.svg"

function resolveSiteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL)
  } catch {
    return new URL(DEFAULT_SITE_URL)
  }
}

export const siteUrl = resolveSiteUrl()
export const SITE_URL = siteUrl.toString().replace(/\/$/, "")

export const HOME_SEO: AudienceSeoEntry = {
  affiliate: {
    title: {
      en: "Affiliate Marketing Rankings, Guides & Tools | AffTraff",
      ru: "Рейтинги, гайды и инструменты для арбитражников | AffTraff",
    },
    description: {
      en: "Discover ad network and CPA network rankings, affiliate marketing guides, case studies, events, jobs, and tools built for media buyers.",
      ru: "Изучайте рейтинги рекламных и CPA-сетей, гайды, кейсы, ивенты, вакансии и инструменты для арбитражников.",
    },
  },
  webmaster: {
    title: {
      en: "Webmaster Monetization Rankings, Guides & Tools | AffTraff",
      ru: "Монетизация, рейтинги и инструменты для вебмастеров | AffTraff",
    },
    description: {
      en: "Compare ad networks, monetization methods, SEO and webmaster services, guides, events, jobs, and tools for publishers and site owners.",
      ru: "Сравнивайте рекламные сети, способы монетизации, SEO и webmaster-сервисы, читайте гайды, кейсы, ивенты и вакансии для вебмастеров.",
    },
  },
}

export const HUB_SEO: Record<Exclude<HubSeoKey, "home">, AudienceSeoEntry> = {
  blog: {
    affiliate: {
      title: {
        en: "Affiliate Marketing Blog, News & Reviews | AffTraff",
        ru: "Блог, новости и обзоры для арбитражников | AffTraff",
      },
      description: {
        en: "Read affiliate marketing news, reviews, guides, trends, and case studies for media buyers and performance teams.",
        ru: "Читайте новости, обзоры, гайды, тренды и кейсы по affiliate marketing для арбитражников и медиабаинга.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster Monetization Blog, News & Reviews | AffTraff",
        ru: "Блог, новости и обзоры для вебмастеров | AffTraff",
      },
      description: {
        en: "Read webmaster monetization news, reviews, guides, trends, and case studies for publishers and site owners.",
        ru: "Читайте новости, обзоры, гайды, тренды и кейсы по монетизации сайтов для вебмастеров и паблишеров.",
      },
    },
  },
  guides: {
    affiliate: {
      title: {
        en: "Affiliate Marketing Guides | AffTraff",
        ru: "Гайды по affiliate marketing | AffTraff",
      },
      description: {
        en: "Browse practical affiliate marketing guides on traffic sources, testing, optimization, and scaling campaigns.",
        ru: "Изучайте практические гайды по affiliate marketing, источникам трафика, тестам, оптимизации и масштабированию.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster Monetization Guides | AffTraff",
        ru: "Гайды по монетизации сайтов | AffTraff",
      },
      description: {
        en: "Browse practical guides on publisher monetization, ad layouts, site growth, and revenue optimization.",
        ru: "Изучайте гайды по монетизации сайтов, размещению рекламы, росту трафика и оптимизации дохода.",
      },
    },
  },
  caseStudies: {
    affiliate: {
      title: {
        en: "Affiliate Marketing Case Studies | AffTraff",
        ru: "Кейсы по affiliate marketing | AffTraff",
      },
      description: {
        en: "Review affiliate case studies with traffic sources, funnels, creatives, and performance breakdowns.",
        ru: "Изучайте кейсы по affiliate marketing с разбором источников трафика, воронок, креативов и результатов.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster Monetization Case Studies | AffTraff",
        ru: "Кейсы по монетизации для вебмастеров | AffTraff",
      },
      description: {
        en: "Review webmaster case studies on ad monetization, revenue experiments, and site growth tactics.",
        ru: "Изучайте кейсы по монетизации сайтов, рекламным экспериментам и стратегиям роста для вебмастеров.",
      },
    },
  },
  rankings: {
    affiliate: {
      title: {
        en: "Affiliate Marketing Rankings | AffTraff",
        ru: "Рейтинги для арбитражников | AffTraff",
      },
      description: {
        en: "Compare ad networks, CPA networks, and affiliate tools with AffTraff rankings for media buyers.",
        ru: "Сравнивайте рекламные сети, CPA-сети и сервисы для арбитражников в рейтингах AffTraff.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster Monetization Rankings | AffTraff",
        ru: "Рейтинги монетизации для вебмастеров | AffTraff",
      },
      description: {
        en: "Compare ad networks, domain parking, link selling, SEO, and webmaster services in AffTraff rankings.",
        ru: "Сравнивайте рекламные сети, парковку доменов, продажу ссылок, SEO и сервисы для вебмастеров в рейтингах AffTraff.",
      },
    },
  },
  tools: {
    affiliate: {
      title: {
        en: "Affiliate Marketing Tools | AffTraff",
        ru: "Инструменты для арбитражников | AffTraff",
      },
      description: {
        en: "Use free affiliate marketing tools for metrics, UTM setup, and campaign workflow optimization.",
        ru: "Используйте бесплатные инструменты для арбитража: метрики, UTM-метки и оптимизация рабочих процессов.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster Tools | AffTraff",
        ru: "Инструменты для вебмастеров | AffTraff",
      },
      description: {
        en: "Use free webmaster tools for RPM analysis, ad format selection, and monetization planning.",
        ru: "Используйте бесплатные инструменты для вебмастеров: RPM, подбор форматов рекламы и планирование монетизации.",
      },
    },
  },
  knowledgeBase: {
    affiliate: {
      title: {
        en: "Affiliate Marketing Knowledge Base | AffTraff",
        ru: "База знаний для арбитражников | AffTraff",
      },
      description: {
        en: "Learn key affiliate marketing terms, models, metrics, and concepts in the AffTraff knowledge base.",
        ru: "Изучайте ключевые термины, модели, метрики и понятия affiliate marketing в базе знаний AffTraff.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster Knowledge Base | AffTraff",
        ru: "База знаний для вебмастеров | AffTraff",
      },
      description: {
        en: "Learn publisher monetization, ad formats, traffic, webmaster tools, and revenue concepts in the AffTraff knowledge base.",
        ru: "Изучайте монетизацию сайтов, рекламные форматы, трафик, webmaster-инструменты и метрики дохода в базе знаний AffTraff.",
      },
    },
  },
  events: {
    affiliate: {
      title: {
        en: "Affiliate Industry Events | AffTraff",
        ru: "Ивенты affiliate-индустрии | AffTraff",
      },
      description: {
        en: "Find affiliate marketing conferences, expos, and industry events around the world.",
        ru: "Находите конференции, выставки и ивенты по affiliate marketing по всему миру.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster & Ad Tech Events | AffTraff",
        ru: "Ивенты для вебмастеров и ad tech | AffTraff",
      },
      description: {
        en: "Find publisher monetization, ad tech, and webmaster events around the world.",
        ru: "Находите ивенты по монетизации сайтов, ad tech и вебмастерингу по всему миру.",
      },
    },
  },
  jobs: {
    affiliate: {
      title: {
        en: "Affiliate Marketing Jobs | AffTraff",
        ru: "Вакансии в affiliate marketing | AffTraff",
      },
      description: {
        en: "Browse affiliate marketing jobs for media buyers, affiliate managers, analysts, and growth teams.",
        ru: "Изучайте вакансии в affiliate marketing для медиабаеров, affiliate-менеджеров, аналитиков и growth-команд.",
      },
    },
    webmaster: {
      title: {
        en: "Webmaster & Monetization Jobs | AffTraff",
        ru: "Вакансии для вебмастеров и monetization | AffTraff",
      },
      description: {
        en: "Browse jobs in publisher monetization, ad operations, SEO, analytics, and webmaster growth.",
        ru: "Изучайте вакансии по монетизации сайтов, ad ops, SEO, аналитике и развитию проектов вебмастеров.",
      },
    },
  },
  about: {
    affiliate: {
      title: {
        en: "About AffTraff for Affiliates | AffTraff",
        ru: "Об AffTraff для арбитражников | AffTraff",
      },
      description: {
        en: "Learn how AffTraff helps affiliates with rankings, guides, tools, events, and industry content.",
        ru: "Узнайте, как AffTraff помогает арбитражникам рейтингами, гайдами, инструментами, ивентами и отраслевым контентом.",
      },
    },
    webmaster: {
      title: {
        en: "About AffTraff for Webmasters | AffTraff",
        ru: "Об AffTraff для вебмастеров | AffTraff",
      },
      description: {
        en: "Learn how AffTraff helps webmasters with monetization rankings, guides, tools, events, and industry content.",
        ru: "Узнайте, как AffTraff помогает вебмастерам рейтингами монетизации, гайдами, инструментами, ивентами и отраслевым контентом.",
      },
    },
  },
  contact: {
    affiliate: {
      title: {
        en: "Contact AffTraff | Affiliate Marketing Support",
        ru: "Контакты AffTraff | Поддержка для арбитражников",
      },
      description: {
        en: "Contact AffTraff about affiliate marketing content, partnerships, advertising, and editorial inquiries.",
        ru: "Свяжитесь с AffTraff по вопросам affiliate marketing, партнерств, рекламы и редакционных материалов.",
      },
    },
    webmaster: {
      title: {
        en: "Contact AffTraff | Webmaster Support",
        ru: "Контакты AffTraff | Поддержка для вебмастеров",
      },
      description: {
        en: "Contact AffTraff about webmaster monetization content, partnerships, advertising, and editorial inquiries.",
        ru: "Свяжитесь с AffTraff по вопросам монетизации сайтов, партнерств, рекламы и редакционных материалов.",
      },
    },
  },
}

const ogLocaleByLanguage: Record<SupportedLanguage, string> = {
  en: "en_US",
  ru: "ru_RU",
}

function normalizePathname(pathname = "") {
  if (!pathname || pathname === "/") {
    return ""
  }

  const trimmed = pathname.trim()
  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`
  return normalized.replace(/\/+$/, "")
}

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage)
}

export function isSupportedAudience(value: string): value is SupportedAudience {
  return supportedAudiences.includes(value as SupportedAudience)
}

export function buildLocalizedPath(
  lang: SupportedLanguage,
  audience: SupportedAudience,
  pathname = "",
) {
  return `/${lang}/${audience}${normalizePathname(pathname)}`
}

export function buildLocalizedUrl(
  lang: SupportedLanguage,
  audience: SupportedAudience,
  pathname = "",
) {
  return new URL(buildLocalizedPath(lang, audience, pathname), siteUrl).toString()
}

export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString()
}

export function buildLanguageAlternates(audience: SupportedAudience, pathname = "") {
  const normalizedPathname = normalizePathname(pathname)

  return {
    en: buildLocalizedUrl("en", audience, normalizedPathname),
    ru: buildLocalizedUrl("ru", audience, normalizedPathname),
    "x-default": buildLocalizedUrl("en", audience, normalizedPathname),
  }
}

export interface BuildSeoMetadataInput {
  lang: SupportedLanguage
  audience: SupportedAudience
  pathname?: string
  title: string
  description: string
  openGraphType?: "website" | "article"
  imagePath?: string
  robots?: Metadata["robots"]
}

export function buildSeoMetadata({
  lang,
  audience,
  pathname = "",
  title,
  description,
  openGraphType = "website",
  imagePath = DEFAULT_OG_IMAGE_PATH,
  robots,
}: BuildSeoMetadataInput): Metadata {
  const url = buildLocalizedUrl(lang, audience, pathname)
  const imageUrl = getAbsoluteUrl(imagePath)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(audience, pathname),
    },
    openGraph: {
      type: openGraphType,
      title,
      description,
      url,
      siteName: "AffTraff",
      locale: ogLocaleByLanguage[lang],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "AffTraff",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots,
  }
}

export function getHomeSeoEntry(audience: SupportedAudience, lang: SupportedLanguage) {
  return {
    title: HOME_SEO[audience].title[lang],
    description: HOME_SEO[audience].description[lang],
  }
}

export function getHubSeoEntry(
  key: Exclude<HubSeoKey, "home">,
  audience: SupportedAudience,
  lang: SupportedLanguage,
) {
  return {
    title: HUB_SEO[key][audience].title[lang],
    description: HUB_SEO[key][audience].description[lang],
  }
}

function collectText(value: unknown): string[] {
  if (!value) {
    return []
  }

  if (typeof value === "string") {
    return [value]
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectText(item))
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap((item) => collectText(item))
  }

  return []
}

export function toPlainTextExcerpt(value: unknown, maxLength = 160) {
  const text = collectText(value)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

  if (!text) {
    return undefined
  }

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`
}
