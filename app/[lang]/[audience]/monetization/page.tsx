import MonetizationCategoryClient from "@/components/MonetizationCategoryClient"
import { getDomainParkingEntries } from "@/mock/domainParking"
import { getLinkSellingEntries } from "@/mock/linkSelling"
import { getNetworks } from "@/mock/networks"

export default async function MonetizationPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
    const { audience } = await params

    const [networks, domainParking, linkSelling] = await Promise.all([
        getNetworks(audience),
        getDomainParkingEntries(audience),
        getLinkSellingEntries(audience),
    ])

    const categories = [
        {
            key: "ad-networks",
            label: { en: "Ad Networks", ru: "Рекламные сети" },
            href: "/networks",
            count: networks.length,
        },
        {
            key: "domain-parking",
            label: { en: "Domain Parking", ru: "Парковка доменов" },
            href: "/monetization/domain-parking",
            count: domainParking.length,
        },
        {
            key: "link-selling",
            label: { en: "Link Selling", ru: "Продажа ссылок" },
            href: "/monetization/link-selling",
            count: linkSelling.length,
        },
    ]

    return <MonetizationCategoryClient categories={categories} />
}
