import CpaNetworksCategoryListClient from "@/components/CpaNetworksCategoryListClient"
import { getCpaNetworksByVertical, verticalLabels, type VerticalKey } from "@/mock/cpaNetworks"
import { getVerticalRankingHref } from "@/mock/rankings"
import { notFound, redirect } from "next/navigation"

const validCategories = Object.keys(verticalLabels) as VerticalKey[]

export default async function CpaNetworksCategoryPage({ params }: { params: Promise<{ lang: string; audience: string; category: string }> }) {
    const { lang, category, audience } = await params

    if (!validCategories.includes(category as VerticalKey)) notFound()

    if (audience === "affiliate") {
        redirect(`/${lang}/${audience}${getVerticalRankingHref(category as VerticalKey)}`)
    }

    const networks = await getCpaNetworksByVertical(category as VerticalKey, audience)
    const categoryLabel = verticalLabels[category as VerticalKey]

    return <CpaNetworksCategoryListClient networks={networks} categoryKey={category} categoryLabel={categoryLabel} />
}
