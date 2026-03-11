import LinkSellingProfileClient from "@/components/LinkSellingProfileClient"
import { getLinkSellingBySlug, getLinkSellingEntries } from "@/mock/linkSelling"
import { notFound } from "next/navigation"

export default async function LinkSellingProfilePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
    const { slug, audience } = await params
    const entry = await getLinkSellingBySlug(slug)
    if (!entry) notFound()

    const allEntries = await getLinkSellingEntries(audience)
    const alternatives = allEntries.filter((e) => e.slug !== slug).slice(0, 3)

    return <LinkSellingProfileClient entry={entry} alternatives={alternatives} />
}
