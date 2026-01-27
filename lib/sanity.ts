import { createClient } from "next-sanity"
import { createImageUrlBuilder } from "@sanity/image-url"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  console.error("Missing Sanity configuration: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is not set.")
}

export const client = createClient({
  projectId: projectId || "dummy-project-id", // Fallback to avoid immediate crash
  dataset: dataset || "dummy-dataset",
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
