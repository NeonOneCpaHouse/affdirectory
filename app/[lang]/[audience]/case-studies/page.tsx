import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import { getCaseStudies } from "@/mock/articles"


export default async function CaseStudiesPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const cases = await getCaseStudies(6, audience)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Case Studies" }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Case Studies</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
        Real-world examples of publisher monetization strategies and their results.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((study) => (
          <ArticleCard key={study.slug} article={study} />
        ))}
      </div>
    </div>
  )
}
