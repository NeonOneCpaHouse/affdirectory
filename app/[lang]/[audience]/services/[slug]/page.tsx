import ServiceProfileClient from "@/components/ServiceProfileClient"
import { getServiceBySlug, getServices } from "@/mock/services"
import { notFound } from "next/navigation"

export default async function ServiceProfilePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
    const { slug, audience } = await params
    const service = await getServiceBySlug(slug)

    if (!service) notFound()

    const allServices = await getServices(audience)
    const alternatives = allServices
        .filter((s) => s.slug !== slug && s.serviceType === service.serviceType)
        .slice(0, 3)

    return <ServiceProfileClient service={service} alternatives={alternatives} />
}
