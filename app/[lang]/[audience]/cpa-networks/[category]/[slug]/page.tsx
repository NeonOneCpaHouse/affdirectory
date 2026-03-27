import type { Metadata } from "next"
import CpaNetworkProfileClient from "@/components/CpaNetworkProfileClient"
import { getCpaNetworkBySlug, getCpaNetworks, verticalLabels, type VerticalKey } from "@/mock/cpaNetworks"
import { notFound } from "next/navigation"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage, toPlainTextExcerpt } from "@/lib/seo"

const validCategories = Object.keys(verticalLabels) as VerticalKey[]

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; audience: string; category: string; slug: string }>
}): Promise<Metadata> {
    const { lang, audience, category, slug } = await params

    if (
        !isSupportedLanguage(lang) ||
        !isSupportedAudience(audience) ||
        !validCategories.includes(category as VerticalKey)
    ) {
        return {}
    }

    const network = await getCpaNetworkBySlug(slug)
    if (!network || !network.vertical?.includes(category as VerticalKey)) {
        return {}
    }

    const name = network.name[lang] || network.name.en
    return buildSeoMetadata({
        lang,
        audience,
        pathname: `/cpa-networks/${category}/${slug}`,
        title: `${name} CPA Network Review | AffTraff`,
        description:
            toPlainTextExcerpt(network.review?.[lang] || network.review?.en) ||
            toPlainTextExcerpt(network.pros?.[lang] || network.pros?.en) ||
            (lang === "ru"
                ? `Обзор ${name}, условий работы, офферов и вертикалей CPA-сети.`
                : `Review ${name}, its offers, terms, and vertical coverage as a CPA network.`),
        openGraphType: "article",
    })
}

export default async function CpaNetworkProfilePage({ params }: { params: Promise<{ lang: string; audience: string; category: string; slug: string }> }) {
    const { slug, audience, category } = await params

    if (!validCategories.includes(category as VerticalKey)) notFound()

    const network = await getCpaNetworkBySlug(slug)

    if (!network) notFound()

    // Validate that the network belongs to this category
    if (!network.vertical?.includes(category as VerticalKey)) notFound()

    const allNetworks = await getCpaNetworks(audience)
    const alternatives = allNetworks
        .filter((n) => n.slug !== slug && n.vertical?.some((v) => network.vertical?.includes(v)))
        .slice(0, 3)

    return <CpaNetworkProfileClient network={network} alternatives={alternatives} category={category as VerticalKey} />
}
