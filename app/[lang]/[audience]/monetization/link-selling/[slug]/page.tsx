import type { Metadata } from "next"
import LinkSellingProfileClient from "@/components/LinkSellingProfileClient"
import { getLinkSellingBySlug, getLinkSellingEntries } from "@/mock/linkSelling"
import { notFound } from "next/navigation"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage, toPlainTextExcerpt } from "@/lib/seo"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; audience: string; slug: string }>
}): Promise<Metadata> {
    const { lang, audience, slug } = await params

    if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
        return {}
    }

    const entry = await getLinkSellingBySlug(slug)
    if (!entry) {
        return {}
    }

    const name = entry.name[lang] || entry.name.en
    return buildSeoMetadata({
        lang,
        audience,
        pathname: `/monetization/link-selling/${slug}`,
        title: `${name} Link Selling Review | AffTraff`,
        description:
            toPlainTextExcerpt(entry.review?.[lang] || entry.review?.en) ||
            toPlainTextExcerpt(entry.pros?.[lang] || entry.pros?.en) ||
            (lang === "ru"
                ? `Обзор ${name} для продажи ссылок, выплат и возможностей монетизации.`
                : `Review ${name} for link selling, payouts, and monetization opportunities.`),
        openGraphType: "article",
    })
}

export default async function LinkSellingProfilePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
    const { slug, audience } = await params
    const entry = await getLinkSellingBySlug(slug)
    if (!entry) notFound()

    const allEntries = await getLinkSellingEntries(audience)
    const alternatives = allEntries.filter((e) => e.slug !== slug).slice(0, 3)

    return <LinkSellingProfileClient entry={entry} alternatives={alternatives} />
}
