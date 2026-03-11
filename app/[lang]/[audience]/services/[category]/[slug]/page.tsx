import ServiceProfileClient from "@/components/ServiceProfileClient"
import { getServiceBySlug, getServices, serviceTypeLabels, type ServiceTypeKey } from "@/mock/services"
import { notFound } from "next/navigation"

const validCategories = Object.keys(serviceTypeLabels) as ServiceTypeKey[]

export default async function ServiceProfilePage({ params }: { params: Promise<{ lang: string; audience: string; category: string; slug: string }> }) {
    const { slug, audience, category } = await params

    if (!validCategories.includes(category as ServiceTypeKey)) notFound()

    const service = await getServiceBySlug(slug)

    if (!service) notFound()

    // Validate that the service actually belongs to this category
    if (service.serviceType !== category) notFound()

    const allServices = await getServices(audience)
    const alternatives = allServices
        .filter((s) => s.slug !== slug && s.serviceType === service.serviceType)
        .slice(0, 3)

    return <ServiceProfileClient service={service} alternatives={alternatives} category={category as ServiceTypeKey} />
}
