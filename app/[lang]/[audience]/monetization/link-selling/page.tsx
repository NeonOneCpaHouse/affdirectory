import LinkSellingListClient from "@/components/LinkSellingListClient"
import { getLinkSellingEntries } from "@/mock/linkSelling"
import { redirect } from "next/navigation"

export default async function LinkSellingListPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
    const { lang, audience } = await params

    if (audience === "webmaster") {
        redirect(`/${lang}/${audience}/rankings/link-selling`)
    }

    const entries = await getLinkSellingEntries(audience)
    return <LinkSellingListClient entries={entries} />
}
