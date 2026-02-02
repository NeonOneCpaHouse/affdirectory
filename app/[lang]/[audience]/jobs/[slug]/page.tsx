import { getJobBySlug } from "@/mock/jobs"
import JobDetailClientPage from "@/components/JobDetailClientPage"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
    const { lang, slug } = await params
    const job = await getJobBySlug(slug, lang)

    if (!job) {
        return {
            title: "Job Not Found - TraffDirector",
        }
    }

    return {
        title: `${job.title} at ${job.companyName} - TraffDirector`,
        description: `Hiring: ${job.title}. Apply now!`,
    }
}

export default async function JobPage({
    params,
}: {
    params: Promise<{ lang: string; audience: string; slug: string }>
}) {
    const { lang, slug } = await params
    const job = await getJobBySlug(slug, lang)

    if (!job) {
        notFound()
    }

    return <JobDetailClientPage job={job} />
}
