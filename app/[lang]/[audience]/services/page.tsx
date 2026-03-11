import ServicesCategoryClient from "@/components/ServicesCategoryClient"
import { getServices } from "@/mock/services"
import { serviceTypeLabels, type ServiceTypeKey } from "@/mock/services"

export default async function ServicesPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
    const { audience } = await params
    const allServices = await getServices(audience)

    // Count services per category
    const categoryCounts: Record<string, number> = {}
    for (const s of allServices) {
        categoryCounts[s.serviceType] = (categoryCounts[s.serviceType] || 0) + 1
    }

    const categories = (Object.keys(serviceTypeLabels) as ServiceTypeKey[]).map((key) => ({
        key,
        labels: serviceTypeLabels[key],
        count: categoryCounts[key] || 0,
    }))

    return <ServicesCategoryClient categories={categories} />
}
