import { serviceTypeLabels, type ServiceTypeKey } from "@/mock/services"
import { getServiceTypeRankingHref } from "@/mock/rankings"
import { notFound, redirect } from "next/navigation"

const validCategories = Object.keys(serviceTypeLabels) as ServiceTypeKey[]

export default async function ServicesCategoryPage({ params }: { params: Promise<{ lang: string; audience: string; category: string }> }) {
    const { lang, category, audience } = await params

    if (!validCategories.includes(category as ServiceTypeKey)) notFound()
    redirect(`/${lang}/${audience}${getServiceTypeRankingHref(category as ServiceTypeKey)}`)
}
