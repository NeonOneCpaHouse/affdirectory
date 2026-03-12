import DomainParkingListClient from "@/components/DomainParkingListClient"
import { getDomainParkingEntries } from "@/mock/domainParking"
import { redirect } from "next/navigation"

export default async function DomainParkingListPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
    const { lang, audience } = await params

    if (audience === "webmaster") {
        redirect(`/${lang}/${audience}/rankings/domain-parking`)
    }

    const entries = await getDomainParkingEntries(audience)
    return <DomainParkingListClient entries={entries} />
}
