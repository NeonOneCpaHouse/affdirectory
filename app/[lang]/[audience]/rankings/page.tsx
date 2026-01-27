import RankingsClientPage from "@/components/RankingsClientPage"
import { getAllFormatRankings } from "@/mock/rankings"



export default async function RankingsPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const rankings = await getAllFormatRankings(audience)
  return <RankingsClientPage rankings={rankings} />
}
