import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ru']
const audiences = ['affiliate', 'webmaster']
const defaultLocale = 'en'
const defaultAudience = 'affiliate'

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
    const locale = hasValidLocale ? firstSegment : defaultLocale
    const audience = hasValidAudience ? secondSegment : defaultAudience

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
        // /... -> /en/affiliate/...
        const rest = pathSegments.join('/')
        newPath = `/${defaultLocale}/${defaultAudience}${rest ? `/${rest}` : ''}`
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
