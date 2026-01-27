import { Suspense } from "react"
import GuidesClientPage from "@/components/GuidesClientPage"
import { getArticlesByType } from "@/mock/articles"



export default async function GuidesPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const guides = await getArticlesByType("guide", audience)
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>}>
      <GuidesClientPage guides={guides} />
    </Suspense>
  )
}
