import { getJobs } from "@/mock/jobs"
import JobsClientPage from "@/components/JobsClientPage"
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

    const seo = getHubSeoEntry("jobs", audience, lang)
    return buildSeoMetadata({
        lang,
        audience,
        pathname: "/jobs",
        title: seo.title,
        description: seo.description,
    })
}

export default async function JobsPage({
    params,
}: {
    params: Promise<{ lang: string; audience: string }>
}) {
    const { lang, audience } = await params
    const jobs = await getJobs(audience, lang)

    return <JobsClientPage jobs={jobs} />
}
