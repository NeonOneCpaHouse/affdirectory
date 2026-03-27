import type { Metadata } from "next"
import AboutPageClient from "@/components/AboutPageClient"
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

    const seo = getHubSeoEntry("about", audience, lang)
    return buildSeoMetadata({ lang, audience, pathname: "/about", title: seo.title, description: seo.description })
}

export default function AboutPage() {
    return <AboutPageClient />
}
