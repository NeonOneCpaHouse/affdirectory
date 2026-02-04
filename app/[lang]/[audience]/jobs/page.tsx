import { getJobs } from "@/mock/jobs"
import JobsClientPage from "@/components/JobsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Jobs - AffTraff",
    description: "Find the best jobs in affiliate marketing and ad tech.",
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
