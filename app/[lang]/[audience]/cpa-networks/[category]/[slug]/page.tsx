import CpaNetworkProfileClient from "@/components/CpaNetworkProfileClient"
import { getCpaNetworkBySlug, getCpaNetworks, verticalLabels, type VerticalKey } from "@/mock/cpaNetworks"
import { notFound } from "next/navigation"

const validCategories = Object.keys(verticalLabels) as VerticalKey[]

export default async function CpaNetworkProfilePage({ params }: { params: Promise<{ lang: string; audience: string; category: string; slug: string }> }) {
    const { slug, audience, category } = await params

    if (!validCategories.includes(category as VerticalKey)) notFound()

    const network = await getCpaNetworkBySlug(slug)

    if (!network) notFound()

    // Validate that the network belongs to this category
    if (!network.vertical?.includes(category as VerticalKey)) notFound()

    const allNetworks = await getCpaNetworks(audience)
    const alternatives = allNetworks
        .filter((n) => n.slug !== slug && n.vertical?.some((v) => network.vertical?.includes(v)))
        .slice(0, 3)

    return <CpaNetworkProfileClient network={network} alternatives={alternatives} category={category as VerticalKey} />
}
