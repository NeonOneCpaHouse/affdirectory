import NetworksCategoryClient from "@/components/NetworksCategoryClient"
import { getNetworks } from "@/mock/networks"
import { adFormatLabels, type AdFormatKey } from "@/mock/networks"
import { redirect } from "next/navigation"

export default async function NetworksPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { lang, audience } = await params

  if (audience === "webmaster") {
    redirect(`/${lang}/${audience}/rankings`)
  }

  const allNetworks = await getNetworks(audience)

  // Count networks per ad format
  const categoryCounts: Record<string, number> = {}
  for (const n of allNetworks) {
    if (n.adFormat) {
      for (const f of n.adFormat) {
        categoryCounts[f] = (categoryCounts[f] || 0) + 1
      }
    }
  }

  const categories = (Object.keys(adFormatLabels) as AdFormatKey[]).map((key) => ({
    key,
    labels: adFormatLabels[key],
    count: categoryCounts[key] || 0,
  }))

  return <NetworksCategoryClient categories={categories} />
}
