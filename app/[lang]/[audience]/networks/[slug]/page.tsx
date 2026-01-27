import NetworkProfileClient from "@/components/NetworkProfileClient"
import { getNetworkBySlug, getNetworks } from "@/mock/networks"
import { notFound } from "next/navigation"



export default async function NetworkProfilePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const network = await getNetworkBySlug(slug)

  if (!network) notFound()

  const allNetworks = await getNetworks(audience)
  const alternatives = allNetworks
    .filter((n) => n.slug !== slug && n.formatsSupported.some((f) => network.formatsSupported.includes(f)))
    .slice(0, 3)

  return <NetworkProfileClient network={network} alternatives={alternatives} />
}
