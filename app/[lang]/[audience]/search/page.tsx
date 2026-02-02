import SearchClientPage from "@/components/SearchClientPage"
import { searchArticles } from "@/mock/articles"

export default async function SearchPage({
    params,
    searchParams,
}: {
    params: Promise<{ lang: string; audience: string }>
    searchParams: Promise<{ q: string }>
}) {
    const { lang, audience } = await params
    const { q } = await searchParams

    console.log(`[SearchPage] Params: lang=${lang}, audience=${audience}, q=${q}`)

    const articles = await searchArticles(q || "", audience, lang)

    return <SearchClientPage articles={articles} query={q || ""} />
}
