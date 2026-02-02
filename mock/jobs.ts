import { client } from "@/lib/sanity"
import { urlForImage } from "@/lib/sanity"

export interface Job {
    id: string
    slug: string
    title: string
    companyName: string
    companyLogo?: string
    position: string
    level: string
    experience: string
    salary: string
    ctaUrl: string
    ctaText: string
    aboutCompany?: string
    location: "remote" | "office" | "hybrid"
    requirements?: string
    responsibilities?: string
    createdAt: string
    publishedAt: string
}

export async function getJobs(audience: string, language: string): Promise<Job[]> {
    const query = `*[_type == "job" && audience == $audience && language == $language && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    companyName,
    "companyLogo": companyLogo.asset->url,
    position,
    level,
    experience,
    salary,
    ctaUrl,
    ctaText,
    aboutCompany,
    location,
    requirements,
    responsibilities,
    "createdAt": _createdAt,
    publishedAt
  }`

    try {
        return await client.fetch(query, { audience, language }, { next: { revalidate: 60 } })
    } catch (error) {
        console.error("[v0] Failed to fetch jobs:", error)
        return []
    }
}

export async function getJobBySlug(slug: string, language: string): Promise<Job | null> {
    const query = `*[_type == "job" && slug.current == $slug && language == $language][0] {
    "id": _id,
    "slug": slug.current,
    title,
    companyName,
    "companyLogo": companyLogo.asset->url,
    position,
    level,
    experience,
    salary,
    ctaUrl,
    ctaText,
    aboutCompany,
    location,
    requirements,
    responsibilities,
    "createdAt": _createdAt,
    publishedAt
  }`

    try {
        return await client.fetch(query, { slug, language }, { next: { revalidate: 60 } })
    } catch (error) {
        console.error("[v0] Failed to fetch job by slug:", error)
        return null
    }
}
