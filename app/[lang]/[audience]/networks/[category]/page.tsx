import NetworksCategoryListClient from "@/components/NetworksCategoryListClient"
import { getNetworksByAdFormat, adFormatLabels, type AdFormatKey } from "@/mock/networks"
import { notFound } from "next/navigation"

const validCategories = Object.keys(adFormatLabels) as AdFormatKey[]

export default async function NetworksCategoryPage({ params }: { params: Promise<{ lang: string; audience: string; category: string }> }) {
    const { category, audience } = await params

    if (!validCategories.includes(category as AdFormatKey)) notFound()

    const networks = await getNetworksByAdFormat(category as AdFormatKey, audience)
    const categoryLabel = adFormatLabels[category as AdFormatKey]

    return <NetworksCategoryListClient networks={networks} categoryKey={category} categoryLabel={categoryLabel} />
}
