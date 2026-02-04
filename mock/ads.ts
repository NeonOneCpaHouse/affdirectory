import { client } from "@/lib/sanity"

export interface AdCreative {
  id: string
  slotKey: string
  ctaUrl: string
  desktopImage?: string
  mobileImage?: string
  targeting?: { format?: string; category?: string; page?: string }
  language?: string
}

export async function getAdCreatives(audience: string = "affiliate", language: string = "en"): Promise<AdCreative[]> {
  const query = `*[_type == "adCreative" && audience == $audience && language == $language] {
    "id": _id,
    slotKey,
    ctaUrl,
    "desktopImage": desktopImage.asset->url,
    "mobileImage": mobileImage.asset->url,
    targeting
  }`

  try {
    return await client.fetch(query, { audience, language }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("[v0] Failed to fetch ad creatives from Sanity:", error)
    return []
  }
}

export async function getAdForSlot(
  slotKey: string,
  audience: string = "affiliate",
  language: string = "en",
): Promise<AdCreative | undefined> {
  const query = `*[_type == "adCreative" && slotKey == $slotKey && audience == $audience && language == $language] {
    "id": _id,
    slotKey,
    ctaUrl,
    "desktopImage": desktopImage.asset->url,
    "mobileImage": mobileImage.asset->url,
    targeting
  }`

  try {
    const matching = await client.fetch(query, { slotKey, audience, language }, { next: { revalidate: 0 } })
    if (matching.length === 0) return undefined
    if (matching.length === 1) return matching[0]

    // Rotate ads based on day of month
    const dayOfMonth = new Date().getDate()
    return matching[dayOfMonth % matching.length]
  } catch (error) {
    console.error("[v0] Failed to fetch ad for slot from Sanity:", error)
    return undefined
  }
}

export const slotSizes: Record<string, { desktop: { width: number; height: number }; mobile: { width: number; height: number } }> = {
  leaderboard: { desktop: { width: 728, height: 90 }, mobile: { width: 320, height: 50 } },
  inline: { desktop: { width: 800, height: 90 }, mobile: { width: 320, height: 50 } },
  sidebar: { desktop: { width: 300, height: 600 }, mobile: { width: 300, height: 250 } },
}

// Export for backward compatibility
export const ads = getAdCreatives()
