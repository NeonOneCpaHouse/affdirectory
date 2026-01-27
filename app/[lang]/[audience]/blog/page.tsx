import { Suspense } from "react"
import { getBlogArticles } from "@/mock/articles"
import BlogClientPage from "@/components/BlogClientPage"



export default async function BlogPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const articles = await getBlogArticles(audience)
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>}>
      <BlogClientPage articles={articles} />
    </Suspense>
  )
}
