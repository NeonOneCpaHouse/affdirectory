import type { Metadata } from "next"
import RankingDetailClient from "@/components/RankingDetailClient"
import { getRankingBySlug, getRankingPageOverride, isRankingSlugAllowedForAudience, rankingMethodology } from "@/mock/rankings"
import type { Audience } from "@/context/AudienceContext"
import { notFound, redirect } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; audience: string; slug: string }>
}): Promise<Metadata> {
  const { lang, audience, slug } = await params
  const pageOverride = getRankingPageOverride(slug, audience as Audience)
  const currentLanguage = lang === "ru" ? "ru" : "en"

  if (!pageOverride?.seo) {
    return {}
  }

  return {
    title: pageOverride.seo.title[currentLanguage],
    description: pageOverride.seo.description[currentLanguage],
  }
}

export default async function RankingPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { lang, slug, audience } = await params

  if (!isRankingSlugAllowedForAudience(slug, audience as "affiliate" | "webmaster")) {
    redirect(`/${lang}/${audience}`)
  }

  const ranking = await getRankingBySlug(slug, audience)

  if (!ranking) notFound()

  const pageOverride = getRankingPageOverride(slug, audience as Audience)

  return (
    <RankingDetailClient
      ranking={ranking}
      methodology={rankingMethodology}
      customH1={pageOverride?.h1}
      contentOverride={pageOverride?.content}
    />
  )
}
