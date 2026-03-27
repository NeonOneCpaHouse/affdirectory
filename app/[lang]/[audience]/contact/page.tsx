import type { Metadata } from "next"
import ContactPageClient from "@/components/ContactPageClient"
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

    const seo = getHubSeoEntry("contact", audience, lang)
    return buildSeoMetadata({
        lang,
        audience,
        pathname: "/contact",
        title: seo.title,
        description: seo.description,
    })
}

export default function ContactPage() {
    return <ContactPageClient />
}
