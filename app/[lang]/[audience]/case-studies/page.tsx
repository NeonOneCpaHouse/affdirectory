import { redirect } from "next/navigation"

export default async function CaseStudiesPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { lang, audience } = await params
  redirect(`/${lang}/${audience}/blog?cat=case-studies`)
}
