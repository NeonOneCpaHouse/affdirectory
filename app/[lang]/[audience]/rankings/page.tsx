import type { Metadata } from "next"
import RankingsClientPage from "@/components/RankingsClientPage"
import { getAllRankingCategories } from "@/mock/rankings"
import { buildSeoMetadata, getHubSeoEntry, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; audience: string }>
}): Promise<Metadata> {
  const { lang, audience } = await params

  if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
    return {}
  }

  const seo = getHubSeoEntry("rankings", audience, lang)
  return buildSeoMetadata({
    lang,
    audience,
    pathname: "/rankings",
    title: seo.title,
    description: seo.description,
  })
}

export default async function RankingsPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const categories = await getAllRankingCategories(audience)
  return <RankingsClientPage categories={categories} />
}
