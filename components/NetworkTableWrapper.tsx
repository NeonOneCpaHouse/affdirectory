"use client"

import { useState, useEffect } from "react"
import FormatTabs from "@/components/FormatTabs"
import NetworkTable from "@/components/NetworkTable"
import { getAdNetworkRanking, type RankedAdNetwork } from "@/mock/rankings"
import type { FormatKey } from "@/mock/networks"

// Map FormatKey (used by FormatTabs) to AdFormatKey (used by rankings)
const formatToAdFormat: Record<string, string> = {
  webPush: "push",
  popunder: "popunder",
  inPagePush: "inPage",
  banner: "banner",
  telegram: "telegram",
  display: "display",
  native: "native",
  mobile: "mobile",
  video: "video",
}

export default function NetworkTableWrapper() {
  const [activeFormat, setActiveFormat] = useState<FormatKey>("webPush")
  const [networks, setNetworks] = useState<RankedAdNetwork[] | null>(null)

  useEffect(() => {
    const adFormat = formatToAdFormat[activeFormat]
    if (adFormat) {
      getAdNetworkRanking(adFormat as any).then(setNetworks)
    }
  }, [activeFormat])

  if (!networks) return null

  return (
    <>
      <FormatTabs onTabChange={setActiveFormat} />
      <div className="mt-4 bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
        <NetworkTable networks={networks} maxRows={5} />
      </div>
    </>
  )
}
