import type { Metadata } from "next"
import SearchClientPage from "@/components/SearchClientPage"
import { searchArticles } from "@/mock/articles"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; audience: string }>
}): Promise<Metadata> {
    const { lang, audience } = await params

    if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
        return {}
    }

    return buildSeoMetadata({
        lang,
        audience,
        pathname: "/search",
        title: lang === "ru" ? "Поиск по сайту | AffTraff" : "Site Search | AffTraff",
        description:
            lang === "ru"
                ? "Результаты поиска по материалам и рейтингам AffTraff."
                : "Search results across AffTraff articles, rankings, and resources.",
        robots: {
            index: false,
            follow: false,
        },
    })
}

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
