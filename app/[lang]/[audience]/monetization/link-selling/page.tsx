import LinkSellingListClient from "@/components/LinkSellingListClient"
import { getLinkSellingEntries } from "@/mock/linkSelling"

export default async function LinkSellingListPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
    const { audience } = await params
    const entries = await getLinkSellingEntries(audience)
    return <LinkSellingListClient entries={entries} />
}
