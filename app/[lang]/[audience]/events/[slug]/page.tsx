import { getEventBySlug } from "@/mock/events"
import EventDetailClientPage from "@/components/EventDetailClientPage"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
    const { lang, slug } = await params
    const event = await getEventBySlug(slug, lang)

    if (!event) return { title: "Event Not Found" }

    return {
        title: `${event.name} | AffDirectory Events`,
        description: event.description,
    }
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
