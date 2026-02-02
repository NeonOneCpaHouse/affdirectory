import type { Localized } from "@/types"

export interface Tool {
    slug: string
    name: Localized<string>
    description: Localized<string>
    icon: string
}

export const TOOLS: Record<string, Tool[]> = {
    affiliate: [
        {
            slug: "metric-calculator",
            name: { en: "Metric Calculator", ru: "Калькулятор метрик" },
            description: { en: "Calculate CPA, CPC, ROI and other key metrics.", ru: "Расчет CPA, CPC, ROI и других ключевых метрик." },
            icon: "🧮",
        },
        {
            slug: "utm-parameters",
            name: { en: "UTM Parameters", ru: "UTM-метки" },
            description: { en: "Generate UTM links for your campaigns.", ru: "Генерация UTM-меток для ваших кампаний." },
            icon: "🔗",
        },
    ],
    webmaster: [
        {
            slug: "rpm-calculator",
            name: { en: "RPM Calculator", ru: "Калькулятор RPM" },
            description: { en: "Calculate your potential ad revenue based on traffic and CPM rates.", ru: "Рассчитайте потенциальный доход от рекламы на основе трафика и ставок CPM." },
            icon: "🧮",
        },
        {
            slug: "ad-format-picker",
            name: { en: "Ad Format Picker", ru: "Подбор рекламного формата" },
            description: { en: "Find the best ad formats for your site type and traffic profile.", ru: "Найдите лучшие рекламные форматы для вашего типа сайта и профиля трафика." },
            icon: "🎯",
        },
        {
            slug: "pre-monetization-checklist",
            name: { en: "Pre-Monetization Checklist", ru: "Чек-лист перед монетизацией" },
            description: { en: "Ensure your site is ready before applying to ad networks.", ru: "Убедитесь, что ваш сайт готов перед подачей заявки в рекламные сети." },
            icon: "✅",
        },
        {
            slug: "format-demo",
            name: { en: "Format Demo", ru: "Демо Форматов" },
            description: { en: "Preview how different ad formats will look on your website.", ru: "Предварительный просмотр того, как различные рекламные форматы будут выглядеть на вашем сайте." },
            icon: "👁️",
        },
    ],
}

export function getTools(audience: string): Tool[] {
    return TOOLS[audience] || []
}
