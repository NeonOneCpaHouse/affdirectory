import { createClient } from "next-sanity"
import { createImageUrlBuilder } from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // Disable CDN for instant updates
  perspective: "published", // Only fetch published documents
  token: process.env.SANITY_API_TOKEN, // Optional: for draft previews
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export const urlForImage = urlFor
