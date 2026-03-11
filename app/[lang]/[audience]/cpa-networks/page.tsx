import CpaNetworksCategoryClient from "@/components/CpaNetworksCategoryClient"
import { getCpaNetworks } from "@/mock/cpaNetworks"
import { verticalLabels, type VerticalKey } from "@/mock/cpaNetworks"

export default async function CpaNetworksPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
    const { audience } = await params
    const allNetworks = await getCpaNetworks(audience)

    // Count networks per vertical
    const categoryCounts: Record<string, number> = {}
    for (const n of allNetworks) {
        if (n.vertical) {
            for (const v of n.vertical) {
                categoryCounts[v] = (categoryCounts[v] || 0) + 1
            }
        }
    }

    const categories = (Object.keys(verticalLabels) as VerticalKey[]).map((key) => ({
        key,
        labels: verticalLabels[key],
        count: categoryCounts[key] || 0,
    }))

    return <CpaNetworksCategoryClient categories={categories} />
}
