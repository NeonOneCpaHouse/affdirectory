import CpaNetworkProfileClient from "@/components/CpaNetworkProfileClient"
import { getCpaNetworkBySlug, getCpaNetworks } from "@/mock/cpaNetworks"
import { notFound } from "next/navigation"

export default async function CpaNetworkProfilePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
    const { slug, audience } = await params
    const network = await getCpaNetworkBySlug(slug)

    if (!network) notFound()

    const allNetworks = await getCpaNetworks(audience)
    const alternatives = allNetworks
        .filter((n) => n.slug !== slug && n.vertical?.some((v) => network.vertical?.includes(v)))
        .slice(0, 3)

    return <CpaNetworkProfileClient network={network} alternatives={alternatives} />
}
