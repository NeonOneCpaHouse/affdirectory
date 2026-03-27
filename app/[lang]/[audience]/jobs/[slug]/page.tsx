import { getJobBySlug } from "@/mock/jobs"
import JobDetailClientPage from "@/components/JobDetailClientPage"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; audience: string; slug: string }>
}): Promise<Metadata> {
    const { lang, audience, slug } = await params
    if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
        return {}
    }

    const job = await getJobBySlug(slug, lang)

    if (!job) {
        return buildSeoMetadata({
            lang,
            audience,
            pathname: `/jobs/${slug}`,
            title: lang === "ru" ? "Вакансия не найдена | AffTraff" : "Job Not Found | AffTraff",
            description:
                lang === "ru"
                    ? "Эта вакансия недоступна или была удалена."
                    : "This job listing is unavailable or has been removed.",
        })
    }

    return buildSeoMetadata({
        lang,
        audience,
        pathname: `/jobs/${slug}`,
        title: `${job.title} at ${job.companyName} | AffTraff Jobs`,
        description:
            lang === "ru"
                ? `Вакансия ${job.title} в ${job.companyName}. Изучите условия и отправьте отклик.`
                : `Hiring for ${job.title} at ${job.companyName}. Review the role and apply now.`,
    })
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
