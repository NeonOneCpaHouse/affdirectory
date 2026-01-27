import NetworksClientPage from "@/components/NetworksClientPage"
import { getNetworks } from "@/mock/networks"



export default async function NetworksPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const networks = await getNetworks(audience)
  return <NetworksClientPage networks={networks} />
}
