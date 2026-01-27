"use client"

import { useState } from "react"
import FormatTabs from "@/components/FormatTabs"
import NetworkTable from "@/components/NetworkTable"
import { getRankingsByFormat, type FormatKey } from "@/mock/rankings"
import { useEffect } from "react"

export default function NetworkTableWrapper() {
  const [activeFormat, setActiveFormat] = useState<FormatKey>("webPush")
  const [rankings, setRankings] = useState<any>(null)

  useEffect(() => {
    getRankingsByFormat(activeFormat).then(setRankings)
  }, [activeFormat])

  if (!rankings) return null

  return (
    <>
      <FormatTabs onTabChange={setActiveFormat} />
      <div className="mt-4 bg-white dark:bg-gray-800/30 border border-sky-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
        <NetworkTable networks={rankings.networks} maxRows={5} />
      </div>
    </>
  )
}
