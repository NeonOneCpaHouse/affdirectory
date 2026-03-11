import DomainParkingListClient from "@/components/DomainParkingListClient"
import { getDomainParkingEntries } from "@/mock/domainParking"

export default async function DomainParkingListPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
    const { audience } = await params
    const entries = await getDomainParkingEntries(audience)
    return <DomainParkingListClient entries={entries} />
}
