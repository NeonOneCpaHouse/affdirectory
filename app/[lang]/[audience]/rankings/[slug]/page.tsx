import RankingDetailClient from "@/components/RankingDetailClient"
import { getRankingBySlug, rankingMethodology } from "@/mock/rankings"
import { notFound } from "next/navigation"



export default async function RankingPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const ranking = await getRankingBySlug(slug, audience)

  if (!ranking) notFound()

  return <RankingDetailClient ranking={ranking} methodology={rankingMethodology} />
}
