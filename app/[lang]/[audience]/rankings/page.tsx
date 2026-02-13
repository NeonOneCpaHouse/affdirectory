import RankingsClientPage from "@/components/RankingsClientPage"
import { getAllRankingCategories } from "@/mock/rankings"

export default async function RankingsPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const categories = await getAllRankingCategories(audience)
  return <RankingsClientPage categories={categories} />
}
