import NetworkProfileClient from "@/components/NetworkProfileClient"
import { getNetworkBySlug, getNetworks, adFormatLabels, type AdFormatKey } from "@/mock/networks"
import { notFound } from "next/navigation"

const validCategories = Object.keys(adFormatLabels) as AdFormatKey[]

export default async function NetworkProfilePage({ params }: { params: Promise<{ lang: string; audience: string; category: string; slug: string }> }) {
    const { slug, audience, category } = await params

    if (!validCategories.includes(category as AdFormatKey)) notFound()

    const network = await getNetworkBySlug(slug)

    if (!network) notFound()

    // Validate that the network belongs to this ad format category
    if (!network.adFormat?.includes(category as AdFormatKey)) notFound()

    const allNetworks = await getNetworks(audience)
    const alternatives = allNetworks
        .filter((n) => n.slug !== slug && n.formatsSupported.some((f) => network.formatsSupported.includes(f)))
        .slice(0, 3)

    return <NetworkProfileClient network={network} alternatives={alternatives} category={category as AdFormatKey} />
}
