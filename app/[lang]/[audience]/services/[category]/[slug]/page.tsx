import type { Metadata } from "next"
import ServiceProfileClient from "@/components/ServiceProfileClient"
import { getServiceBySlug, getServices, serviceTypeLabels, type ServiceTypeKey } from "@/mock/services"
import { notFound } from "next/navigation"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage, toPlainTextExcerpt } from "@/lib/seo"

const validCategories = Object.keys(serviceTypeLabels) as ServiceTypeKey[]

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; audience: string; category: string; slug: string }>
}): Promise<Metadata> {
    const { lang, audience, category, slug } = await params

    if (
        !isSupportedLanguage(lang) ||
        !isSupportedAudience(audience) ||
        !validCategories.includes(category as ServiceTypeKey)
    ) {
        return {}
    }

    const service = await getServiceBySlug(slug)
    if (!service || service.serviceType !== category) {
        return {}
    }

    const name = service.name[lang] || service.name.en
    return buildSeoMetadata({
        lang,
        audience,
        pathname: `/services/${category}/${slug}`,
        title: `${name} Review | AffTraff`,
        description:
            toPlainTextExcerpt(service.review?.[lang] || service.review?.en) ||
            toPlainTextExcerpt(service.pros?.[lang] || service.pros?.en) ||
            (lang === "ru"
                ? `Обзор сервиса ${name}, функций, тарифов и условий использования.`
                : `Review ${name}, including features, pricing, and service terms.`),
        openGraphType: "article",
    })
}

export default async function ServiceProfilePage({ params }: { params: Promise<{ lang: string; audience: string; category: string; slug: string }> }) {
    const { slug, audience, category } = await params

    if (!validCategories.includes(category as ServiceTypeKey)) notFound()

    const service = await getServiceBySlug(slug)

    if (!service) notFound()

    // Validate that the service actually belongs to this category
    if (service.serviceType !== category) notFound()

    const allServices = await getServices(audience)
    const alternatives = allServices
        .filter((s) => s.slug !== slug && s.serviceType === service.serviceType)
        .slice(0, 3)

    return <ServiceProfileClient service={service} alternatives={alternatives} category={category as ServiceTypeKey} />
}
