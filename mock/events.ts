import { client } from "@/lib/sanity"

export interface Event {
    id: string
    slug: string
    name: string
    date: string
    location: string
    region: string
    category: string | string[]
    audience: string
    description?: string | any[]
    coverImage?: string
    ticketUrl?: string
}

export async function getEvents(audience: string, language: string): Promise<Event[]> {
    const query = `*[_type == "event" && (audience == $audience || audience == "both") && defined(slug.current) && date >= now()] | order(date asc) {
    "id": _id,
    "slug": slug.current,
    "name": name[$language],
    date,
    "location": location[$language],
    region,
    category,
    audience,
    "description": description[$language],
    "coverImage": coverImage.asset->url,
    ticketUrl
  }`

    try {
        const events = await client.fetch(query, { audience, language }, { next: { revalidate: 60 } })
        return events || []
    } catch (error) {
        console.error("[Sanity] Failed to fetch events:", error)
        return []
    }
}

export async function getEventBySlug(slug: string, language: string): Promise<Event | null> {
    const query = `*[_type == "event" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    "name": name[$language],
    date,
    "location": location[$language],
    region,
    category,
    audience,
    "description": description[$language],
    "coverImage": coverImage.asset->url,
    ticketUrl
  }`

    try {
        return await client.fetch(query, { slug, language }, { next: { revalidate: 60 } })
    } catch (error) {
        console.error("[Sanity] Failed to fetch event by slug:", error)
        return null
    }
}
