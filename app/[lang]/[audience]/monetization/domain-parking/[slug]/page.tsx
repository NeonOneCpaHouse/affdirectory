import type { Metadata } from "next"
import DomainParkingProfileClient from "@/components/DomainParkingProfileClient"
import { getDomainParkingBySlug, getDomainParkingEntries } from "@/mock/domainParking"
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

    const entry = await getDomainParkingBySlug(slug)
    if (!entry) {
        return {}
    }

    const name = entry.name[lang] || entry.name.en
    return buildSeoMetadata({
        lang,
        audience,
        pathname: `/monetization/domain-parking/${slug}`,
        title: `${name} Domain Parking Review | AffTraff`,
        description:
            toPlainTextExcerpt(entry.review?.[lang] || entry.review?.en) ||
            toPlainTextExcerpt(entry.pros?.[lang] || entry.pros?.en) ||
            (lang === "ru"
                ? `Обзор ${name} для парковки доменов, выплат и способов монетизации.`
                : `Review ${name} for domain parking, payouts, and monetization options.`),
        openGraphType: "article",
    })
}

export default async function DomainParkingProfilePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
    const { slug, audience } = await params
    const entry = await getDomainParkingBySlug(slug)
    if (!entry) notFound()

    const allEntries = await getDomainParkingEntries(audience)
    const alternatives = allEntries.filter((e) => e.slug !== slug).slice(0, 3)

    return <DomainParkingProfileClient entry={entry} alternatives={alternatives} />
}
