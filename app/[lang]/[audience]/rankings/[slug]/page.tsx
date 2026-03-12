import RankingDetailClient from "@/components/RankingDetailClient"
import { getRankingBySlug, isRankingSlugAllowedForAudience, rankingMethodology } from "@/mock/rankings"
import { notFound, redirect } from "next/navigation"

export default async function RankingPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { lang, slug, audience } = await params

  if (!isRankingSlugAllowedForAudience(slug, audience as "affiliate" | "webmaster")) {
    redirect(`/${lang}/${audience}`)
  }

  const ranking = await getRankingBySlug(slug, audience)

  if (!ranking) notFound()

  return <RankingDetailClient ranking={ranking} methodology={rankingMethodology} />
}
