import type { Metadata } from "next"
import NetworkProfileClient from "@/components/NetworkProfileClient"
import { getNetworkBySlug, getNetworks, adFormatLabels, type AdFormatKey } from "@/mock/networks"
import { notFound } from "next/navigation"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage, toPlainTextExcerpt } from "@/lib/seo"

const validCategories = Object.keys(adFormatLabels) as AdFormatKey[]

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; audience: string; category: string; slug: string }>
}): Promise<Metadata> {
    const { lang, audience, category, slug } = await params

    if (
        !isSupportedLanguage(lang) ||
        !isSupportedAudience(audience) ||
        !validCategories.includes(category as AdFormatKey)
    ) {
        return {}
    }

    const network = await getNetworkBySlug(slug)
    if (!network || !network.adFormat?.includes(category as AdFormatKey)) {
        return {}
    }

    return buildSeoMetadata({
        lang,
        audience,
        pathname: `/networks/${category}/${slug}`,
        title: `${network.name} Review | AffTraff`,
        description:
            network.editorialNote?.[lang] ||
            network.editorialNote?.en ||
            toPlainTextExcerpt(network.pros?.[lang] || network.pros?.en) ||
            (lang === "ru"
                ? `Обзор ${network.name} и рекламных возможностей для вебмастеров и паблишеров.`
                : `Review ${network.name} and its ad network capabilities for publishers and webmasters.`),
        openGraphType: "article",
    })
}

export default async function NetworkProfilePage({ params }: { params: Promise<{ lang: string; audience: string; category: string; slug: string }> }) {
    const { slug, audience, category } = await params

    if (!validCategories.includes(category as AdFormatKey)) notFound()

    const network = await getNetworkBySlug(slug)

    if (!network) notFound()

    // Validate that the network belongs to this ad format category
    if (!network.adFormat?.includes(category as AdFormatKey)) notFound()

    const allNetworks = await getNetworks(audience)
    const alternatives = allNetworks
        .filter((n) => n.slug !== slug && n.formatsSupported.some((f) => network.formatsSupported.includes(f)))
        .slice(0, 3)

    return <NetworkProfileClient network={network} alternatives={alternatives} category={category as AdFormatKey} />
}
