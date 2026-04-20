import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ru'] as const
const audiences = ['affiliate', 'webmaster']
const defaultLocale = 'en'
const defaultAudience = 'affiliate'

function getLocaleFromAcceptLanguage(header: string | null): (typeof locales)[number] {
    if (!header) {
        return defaultLocale
    }

    const hasRussianLanguage = header
        .split(',')
        .some((part) => {
            const [rawLocale, ...params] = part.trim().split(';')
            const qValue = params.find((param) => param.trim().startsWith('q='))
            const quality = qValue ? Number.parseFloat(qValue.split('=')[1]) : 1
            const locale = rawLocale.toLowerCase().split('-')[0]

            return locale === 'ru' && Number.isFinite(quality) && quality > 0
        })

    return hasRussianLanguage ? 'ru' : defaultLocale
}

function resolveLocale(request: NextRequest): (typeof locales)[number] {
    return getLocaleFromAcceptLanguage(request.headers.get('accept-language'))
}

export function proxy(request: NextRequest) {
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

    const locale = hasValidLocale ? firstSegment : resolveLocale(request)

    let newPath = ''

    if (hasValidLocale) {
        const rest = pathSegments.slice(1).join('/')
        newPath = `/${locale}/${defaultAudience}${rest ? `/${rest}` : ''}`
    } else {
        const rest = pathSegments.join('/')
        newPath = `/${locale}/${defaultAudience}${rest ? `/${rest}` : ''}`
    }

    const url = request.nextUrl.clone()
    url.pathname = newPath
    return NextResponse.redirect(url)
}

export const config = {
    matcher: [
        '/((?!_next|api|admin|favicon.ico).*)',
    ],
}
