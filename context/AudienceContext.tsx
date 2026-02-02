"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export type Audience = "affiliate" | "webmaster"

interface AudienceContextType {
    audience: Audience
    setAudience: (aud: Audience) => void
}

const AudienceContext = createContext<AudienceContextType | undefined>(undefined)

export function AudienceProvider({
    children,
    initialAudience = "affiliate",
}: {
    children: React.ReactNode
    initialAudience?: Audience
}) {
    const [audience, setAudienceState] = useState<Audience>(initialAudience)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        setAudienceState(initialAudience)
    }, [initialAudience])

    // Update document class for theme switching
    useEffect(() => {
        document.documentElement.classList.remove('audience-affiliate', 'audience-webmaster')
        document.documentElement.classList.add(`audience-${audience}`)
    }, [audience])

    useEffect(() => {
        if (initialAudience) {
            localStorage.setItem("preferred_audience", initialAudience)
            document.cookie = `audience=${initialAudience}; path=/; max-age=31536000`
        }
    }, [initialAudience])

    const setAudience = (aud: Audience) => {
        setAudienceState(aud)
        localStorage.setItem("preferred_audience", aud)
        document.cookie = `audience=${aud}; path=/; max-age=31536000`

        // Update URL
        // Assumption: Path is /[lang]/[audience]/...
        const segments = pathname.split("/").filter(Boolean)
        if (segments.length >= 2) {
            segments[1] = aud
            const newPath = `/${segments.join("/")}`
            router.push(newPath)
        }
    }

    return (
        <AudienceContext.Provider value={{ audience, setAudience }}>
            {children}
        </AudienceContext.Provider>
    )
}

export function useAudience() {
    const context = useContext(AudienceContext)
    if (context === undefined) {
        throw new Error("useAudience must be used within a AudienceProvider")
    }
    return context
}
