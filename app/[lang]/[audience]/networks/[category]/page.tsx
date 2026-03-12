import { adFormatLabels, type AdFormatKey } from "@/mock/networks"
import { getAdFormatRankingHref } from "@/mock/rankings"
import { notFound, redirect } from "next/navigation"

const validCategories = Object.keys(adFormatLabels) as AdFormatKey[]

export default async function NetworksCategoryPage({ params }: { params: Promise<{ lang: string; audience: string; category: string }> }) {
    const { lang, category, audience } = await params

    if (!validCategories.includes(category as AdFormatKey)) notFound()

    redirect(`/${lang}/${audience}${getAdFormatRankingHref(category as AdFormatKey)}`)
}
