import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ru'] as const
const audiences = ['affiliate', 'webmaster']
const defaultLocale = 'en'
const defaultAudience = 'affiliate'

function isSupportedLocale(value?: string): value is (typeof locales)[number] {
    return Boolean(value && locales.includes(value as (typeof locales)[number]))
}

function getLocaleFromAcceptLanguage(header: string | null): (typeof locales)[number] {
    if (!header) {
        return defaultLocale
    }

    const preferredLocale = header
        .split(',')
        .map((part, index) => {
            const [rawLocale, ...params] = part.trim().split(';')
            const qValue = params.find((param) => param.trim().startsWith('q='))
            const quality = qValue ? Number.parseFloat(qValue.split('=')[1]) : 1
            const locale = rawLocale.toLowerCase().split('-')[0]

            return {
                locale,
                quality: Number.isFinite(quality) ? quality : 0,
                index,
            }
        })
        .filter((entry) => isSupportedLocale(entry.locale))
        .sort((left, right) => right.quality - left.quality || left.index - right.index)[0]?.locale

    return preferredLocale && isSupportedLocale(preferredLocale) ? preferredLocale : defaultLocale
}

function resolveLocale(request: NextRequest): (typeof locales)[number] {
    return getLocaleFromAcceptLanguage(request.headers.get('accept-language'))
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Skip internal paths and assets
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // file extensions (favicon.ico, etc)
    ) {
        return NextResponse.next()
    }

    // Check if path already starts with /lang/audience
    const pathSegments = pathname.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    const secondSegment = pathSegments[1]

    const hasValidLocale = locales.includes(firstSegment)
    const hasValidAudience = audiences.includes(secondSegment)

    if (hasValidLocale && hasValidAudience) {
        return NextResponse.next()
    }

    // Construct new URL
    const locale = hasValidLocale ? firstSegment : resolveLocale(request)

    // If we had a valid locale but invalid audience in second slot, we need to be careful.
    // E.g. /en/blog -> /en/affiliate/blog
    // E.g. /blog -> /en/affiliate/blog

    let newPath = ''

    if (hasValidLocale) {
        // /en/... -> /en/affiliate/...
        // But what if the second segment was just 'blog'?
        // We insert default audience after locale
        const rest = pathSegments.slice(1).join('/')
        newPath = `/${locale}/${defaultAudience}${rest ? `/${rest}` : ''}`
    } else {
        // /... -> /{browser locale}/affiliate/...
        const rest = pathSegments.join('/')
        newPath = `/${locale}/${defaultAudience}${rest ? `/${rest}` : ''}`
    }

    const url = request.nextUrl.clone()
    url.pathname = newPath
    return NextResponse.redirect(url)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|admin|favicon.ico).*)',
    ],
}
