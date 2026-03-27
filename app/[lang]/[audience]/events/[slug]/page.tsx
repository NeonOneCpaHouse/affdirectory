import { getEventBySlug } from "@/mock/events"
import EventDetailClientPage from "@/components/EventDetailClientPage"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
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

    const event = await getEventBySlug(slug, lang)

    if (!event) {
        return buildSeoMetadata({
            lang,
            audience,
            pathname: `/events/${slug}`,
            title: lang === "ru" ? "Событие не найдено | AffTraff" : "Event Not Found | AffTraff",
            description:
                lang === "ru"
                    ? "Событие не найдено или было удалено."
                    : "This event could not be found or is no longer available.",
        })
    }

    return buildSeoMetadata({
        lang,
        audience,
        pathname: `/events/${slug}`,
        title: `${event.name} | AffTraff Events`,
        description:
            toPlainTextExcerpt(event.description) ||
            (lang === "ru"
                ? "Подробная информация о событии affiliate и ad tech индустрии."
                : "Detailed information about an affiliate and ad tech industry event."),
    })
}

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ lang: string; audience: string; slug: string }>
}) {
    const { lang, slug } = await params
    const event = await getEventBySlug(slug, lang)

    if (!event) {
        notFound()
    }

    return <EventDetailClientPage event={event} />
}
