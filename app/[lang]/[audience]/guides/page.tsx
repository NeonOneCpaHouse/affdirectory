import type { Metadata } from "next"
import { redirect } from "next/navigation"
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

  const seo = getHubSeoEntry("guides", audience, lang)
  return buildSeoMetadata({ lang, audience, pathname: "/guides", title: seo.title, description: seo.description })
}

export default async function GuidesPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { lang, audience } = await params
  redirect(`/${lang}/${audience}/blog?cat=guides`)
}
