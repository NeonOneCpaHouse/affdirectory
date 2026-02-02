import { client } from "@/lib/sanity"

export interface Popup {
    id: string
    slug: string
    audience: "affiliate" | "webmaster"
    isActive: boolean
    logo?: string
    title: { en: string; ru: string }
    text: { en: string; ru: string }
    ctaText: { en: string; ru: string }
    ctaUrl: string
}

export async function getActivePopup(audience: string = "affiliate"): Promise<Popup | null> {
    const query = `*[_type == "popup" && audience == $audience && isActive == true][0] {
    "id": _id,
    "slug": slug.current,
    audience,
    isActive,
    "logo": logo.asset->url,
    title,
    text,
    ctaText,
    ctaUrl
  }`

    try {
        const popup = await client.fetch(query, { audience }, { next: { revalidate: 0 } })
        return popup || null
    } catch (error) {
        console.error("[Popup] Failed to fetch popup from Sanity:", error)
        return null
    }
}
