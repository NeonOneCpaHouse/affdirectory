import { getEvents } from "@/mock/events"
import EventsClientPage from "@/components/EventsClientPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Industry Events | AffTraff",
    description: "Worldwide conferences and events for affiliate marketing and ad tech industry.",
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
