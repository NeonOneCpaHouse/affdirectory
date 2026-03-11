import DomainParkingProfileClient from "@/components/DomainParkingProfileClient"
import { getDomainParkingBySlug, getDomainParkingEntries } from "@/mock/domainParking"
import { notFound } from "next/navigation"

export default async function DomainParkingProfilePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
    const { slug, audience } = await params
    const entry = await getDomainParkingBySlug(slug)
    if (!entry) notFound()

    const allEntries = await getDomainParkingEntries(audience)
    const alternatives = allEntries.filter((e) => e.slug !== slug).slice(0, 3)

    return <DomainParkingProfileClient entry={entry} alternatives={alternatives} />
}
