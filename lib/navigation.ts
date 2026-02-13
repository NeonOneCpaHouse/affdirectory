import type { Localized } from "@/types"

export interface NavItem {
    label: Localized<string>
    href: string
    items?: NavItem[]
}

export type NavigationConfig = NavItem[]

export const AFFILIATE_NAVIGATION: NavigationConfig = [
    {
        label: { en: "Articles", ru: "Статьи" },
        href: "/blog",
        items: [
            { label: { en: "News", ru: "Новости" }, href: "/blog?cat=news" },
            { label: { en: "Cases", ru: "Кейсы" }, href: "/blog?cat=case-studies" },
            { label: { en: "Reviews", ru: "Обзоры" }, href: "/blog?cat=reviews" },
            { label: { en: "Guides", ru: "Гайды" }, href: "/guides" },
        ],
    },
    {
        label: { en: "Rankings", ru: "Рейтинги" },
        href: "/rankings",
        items: [
            // ── Ad Networks ──
            { label: { en: "Push Ad Networks", ru: "Push рекламные сети" }, href: "/rankings/push-ad-networks" },
            { label: { en: "Popunder Ad Networks", ru: "Попандер рекламные сети" }, href: "/rankings/popunder-ad-networks" },
            { label: { en: "In-Page Ad Networks", ru: "In-Page рекламные сети" }, href: "/rankings/in-page-ad-networks" },
            { label: { en: "Banner Ad Networks", ru: "Баннерные рекламные сети" }, href: "/rankings/banner-ad-networks" },
            { label: { en: "Telegram Ad Networks", ru: "Telegram рекламные сети" }, href: "/rankings/telegram-ad-networks" },
            { label: { en: "Display Ad Networks", ru: "Display рекламные сети" }, href: "/rankings/display-ad-networks" },
            { label: { en: "Native Ad Networks", ru: "Нативные рекламные сети" }, href: "/rankings/native-ad-networks" },
            { label: { en: "Mobile Ad Networks", ru: "Мобильные рекламные сети" }, href: "/rankings/mobile-ad-networks" },
            { label: { en: "Video Ad Networks", ru: "Видео рекламные сети" }, href: "/rankings/video-ad-networks" },
            // ── CPA Networks ──
            { label: { en: "Gambling CPA Networks", ru: "Gambling CPA-сети" }, href: "/rankings/gambling-cpa-networks" },
            { label: { en: "Betting CPA Networks", ru: "Betting CPA-сети" }, href: "/rankings/betting-cpa-networks" },
            { label: { en: "Dating CPA Networks", ru: "Dating CPA-сети" }, href: "/rankings/dating-cpa-networks" },
            { label: { en: "Crypto CPA Networks", ru: "Crypto CPA-сети" }, href: "/rankings/crypto-cpa-networks" },
            { label: { en: "Finance CPA Networks", ru: "Finance CPA-сети" }, href: "/rankings/finance-cpa-networks" },
            { label: { en: "Sweeps CPA Networks", ru: "Sweeps CPA-сети" }, href: "/rankings/sweeps-cpa-networks" },
            { label: { en: "Installs CPA Networks", ru: "Installs CPA-сети" }, href: "/rankings/installs-cpa-networks" },
            { label: { en: "Nutra CPA Networks", ru: "Nutra CPA-сети" }, href: "/rankings/nutra-cpa-networks" },
            { label: { en: "Adult CPA Networks", ru: "Adult CPA-сети" }, href: "/rankings/adult-cpa-networks" },
            { label: { en: "Multivertical CPA Networks", ru: "Мультивертикальные CPA-сети" }, href: "/rankings/multivertical-cpa-networks" },
            { label: { en: "Other CPA Networks", ru: "Другие CPA-сети" }, href: "/rankings/other-cpa-networks" },
            // ── Services ──
            { label: { en: "Antidetect Browsers", ru: "Антидетект-браузеры" }, href: "/rankings/antidetect-browsers" },
            { label: { en: "Spy Tools", ru: "Spy сервисы" }, href: "/rankings/spy-tools" },
            { label: { en: "Proxy", ru: "Прокси" }, href: "/rankings/proxy" },
            { label: { en: "Trackers", ru: "Трекеры" }, href: "/rankings/trackers" },
            { label: { en: "PWA Tools", ru: "PWA-сервисы" }, href: "/rankings/pwa-tools" },
            { label: { en: "Payments", ru: "Платежные системы" }, href: "/rankings/payments" },
        ],
    },
    {
        label: { en: "Knowledge Base", ru: "База Знаний" },
        href: "/knowledge-base",
    },
    {
        label: { en: "Tools", ru: "Инструменты" },
        href: "/tools",
        items: [
            { label: { en: "Metric Calculator", ru: "Калькулятор метрик" }, href: "/tools/metric-calculator" },
            { label: { en: "UTM Parameters", ru: "UTM-метки" }, href: "/tools/utm-parameters" },
        ],
    },
    {
        label: { en: "Events", ru: "Ивенты" },
        href: "/events",
    },
    {
        label: { en: "Jobs", ru: "Вакансии" },
        href: "/jobs",
    },
]

export const WEBMASTER_NAVIGATION: NavigationConfig = [
    {
        label: { en: "Articles", ru: "Статьи" },
        href: "/blog",
        items: [
            { label: { en: "News", ru: "Новости" }, href: "/blog?cat=news" },
            { label: { en: "Cases", ru: "Кейсы" }, href: "/blog?cat=case-studies" },
            { label: { en: "Reviews", ru: "Обзоры" }, href: "/blog?cat=reviews" },
            { label: { en: "Guides", ru: "Гайды" }, href: "/guides" },
        ],
    },
    {
        label: { en: "Rankings", ru: "Рейтинги" },
        href: "/rankings",
        items: [
            // ── Ad Networks ──
            { label: { en: "Push Ad Networks", ru: "Push рекламные сети" }, href: "/rankings/push-ad-networks" },
            { label: { en: "Popunder Ad Networks", ru: "Попандер рекламные сети" }, href: "/rankings/popunder-ad-networks" },
            { label: { en: "Display Ad Networks", ru: "Display рекламные сети" }, href: "/rankings/display-ad-networks" },
            { label: { en: "Native Ad Networks", ru: "Нативные рекламные сети" }, href: "/rankings/native-ad-networks" },
            // ── Services ──
            { label: { en: "Antidetect Browsers", ru: "Антидетект-браузеры" }, href: "/rankings/antidetect-browsers" },
            { label: { en: "Spy Tools", ru: "Spy сервисы" }, href: "/rankings/spy-tools" },
            { label: { en: "Proxy", ru: "Прокси" }, href: "/rankings/proxy" },
            { label: { en: "Trackers", ru: "Трекеры" }, href: "/rankings/trackers" },
        ],
    },
    {
        label: { en: "Knowledge Base", ru: "База Знаний" },
        href: "/knowledge-base",
    },
    {
        label: { en: "Tools", ru: "Инструменты" },
        href: "/tools",
        items: [
            { label: { en: "RPM Calculator", ru: "Калькулятор RPM" }, href: "/tools/rpm-calculator" },
            { label: { en: "Ad Format Picker", ru: "Подбор рекламного формата" }, href: "/tools/ad-format-picker" },
            { label: { en: "Pre-Monetization Checklist", ru: "Чек-лист перед монетизацией" }, href: "/tools/pre-monetization-checklist" },
            { label: { en: "Ad Format Demo", ru: "Демо Форматов" }, href: "/tools/format-demo" },
        ],
    },
    {
        label: { en: "Events", ru: "Ивенты" },
        href: "/events",
    },
    {
        label: { en: "Jobs", ru: "Вакансии" },
        href: "/jobs",
    },
]

export function getNavigation(audience: string): NavigationConfig {
    return audience === "webmaster" ? WEBMASTER_NAVIGATION : AFFILIATE_NAVIGATION
}
