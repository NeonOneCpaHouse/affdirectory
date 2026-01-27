import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LanguageProvider } from "@/context/LanguageContext"
import { AudienceProvider } from "@/context/AudienceContext"

export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { lang: string; audience: string }
}) {
    return (
        // We should probably init the providers with the params if we want to be strict,
        // but the providers currently read from localStorage/cookies.
        // For now, let's keep using the providers as is, but we might need to update them 
        // to accept initial values from params to avoid hydration mismatch.

        // Actually, LanguageProvider and AudienceContext read from localStorage/cookies on mount (useEffect).
        // The server doesn't know about localStorage.
        // Ideally, we pass the params to the providers.
        // Let's stick with the current provider implementation for now and see if it works, 
        // as updating providers is a separate task.
        // Wait, the root layout previously had HTML lang="en". We moved that to the root layout 
        // but without the lang prop. We should probably set it dynamically here?
        // No, layout.tsx is nested, it can't change the <html> tag easily without hacks.
        // We can leave logical lang in the HTML tag as a default or use a client component to update it.

        <AudienceProvider initialAudience={params.audience}>
            <LanguageProvider initialLanguage={params.lang}>
                <Header />
                <main>{children}</main>
                <Footer />
            </LanguageProvider>
        </AudienceProvider>
    )
}
