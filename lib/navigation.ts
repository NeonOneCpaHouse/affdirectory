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
            { label: { en: "Ad Networks", ru: "Рекламные сети" }, href: "/rankings/ad-networks" },
            { label: { en: "CPA Networks", ru: "CPA-сети" }, href: "/rankings/cpa-networks" },
            { label: { en: "Services", ru: "Сервисы" }, href: "/rankings/services" },
            { label: { en: "Antidetect Browsers", ru: "Антидетект-браузеры" }, href: "/rankings/antidetect" },
            { label: { en: "Spy Tools", ru: "Spy сервисы" }, href: "/rankings/spy-tools" },
            { label: { en: "Cloaking", ru: "Клоакинг" }, href: "/rankings/cloaking" },
            { label: { en: "Proxy", ru: "Прокси" }, href: "/rankings/proxy" },
            { label: { en: "Trackers", ru: "Трекеры" }, href: "/rankings/trackers" },
            { label: { en: "PWA", ru: "PWA" }, href: "/rankings/pwa" },
            { label: { en: "Payment", ru: "Платежки" }, href: "/rankings/payment" },
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
            { label: { en: "Traffic Monetization", ru: "Монетизация трафика" }, href: "/rankings/traffic-monetization" },
            { label: { en: "Services", ru: "Сервисы" }, href: "/rankings/services" },
            { label: { en: "SEO", ru: "SEO" }, href: "/rankings/seo" },
            { label: { en: "DDoS Protection", ru: "Защита от DDos-атак" }, href: "/rankings/ddos-protection" },
            { label: { en: "CMS", ru: "Системы управления контентом" }, href: "/rankings/cms" },
            { label: { en: "Testing", ru: "Тест сайтов и приложений" }, href: "/rankings/testing" },
            { label: { en: "Hostings", ru: "Хостинги" }, href: "/rankings/hostings" },
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
