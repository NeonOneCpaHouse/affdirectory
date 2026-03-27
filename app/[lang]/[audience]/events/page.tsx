import { getEvents } from "@/mock/events"
import EventsClientPage from "@/components/EventsClientPage"
import type { Metadata } from "next"
import { buildSeoMetadata, getHubSeoEntry, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; audience: string }>
}): Promise<Metadata> {
    const { lang, audience } = await params

    if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
        return {}
    }

    const seo = getHubSeoEntry("events", audience, lang)
    return buildSeoMetadata({
        lang,
        audience,
        pathname: "/events",
        title: seo.title,
        description: seo.description,
    })
}

export default async function EventsPage({
    params,
}: {
    params: Promise<{ lang: string; audience: string }>
}) {
    const { lang, audience } = await params
    const events = await getEvents(audience, lang)

    return <EventsClientPage events={events} />
}
