import type { Metadata } from "next"
import ToolsPageClient from "@/components/ToolsPageClient"
import { buildSeoMetadata, getHubSeoEntry, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; audience: string }>
}): Promise<Metadata> {
  const { lang, audience } = await params

  if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
    return {}
  }

  const seo = getHubSeoEntry("tools", audience, lang)
  return buildSeoMetadata({ lang, audience, pathname: "/tools", title: seo.title, description: seo.description })
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
