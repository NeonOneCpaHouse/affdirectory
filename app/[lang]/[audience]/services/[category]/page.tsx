import ServicesCategoryListClient from "@/components/ServicesCategoryListClient"
import { getServicesByType, serviceTypeLabels, type ServiceTypeKey } from "@/mock/services"
import { notFound } from "next/navigation"

const validCategories = Object.keys(serviceTypeLabels) as ServiceTypeKey[]

export default async function ServicesCategoryPage({ params }: { params: Promise<{ lang: string; audience: string; category: string }> }) {
    const { category, audience } = await params

    if (!validCategories.includes(category as ServiceTypeKey)) notFound()

    const services = await getServicesByType(category as ServiceTypeKey, audience)
    const categoryLabel = serviceTypeLabels[category as ServiceTypeKey]

    return <ServicesCategoryListClient services={services} categoryKey={category} categoryLabel={categoryLabel} />
}
