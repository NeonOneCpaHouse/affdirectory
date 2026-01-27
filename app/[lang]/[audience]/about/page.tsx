'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t, language } = useLanguage();

    const content = {
        en: {
            title: "About AdDirectory",
            description: "AdDirectory is a resource for webmasters and publishers looking to monetize their websites effectively. We provide comprehensive network reviews, industry news, and educational guides.",
            missionTitle: "Our Mission",
            missionText: "To help publishers make informed decisions about their monetization strategies by providing transparent, unbiased information about ad networks and formats.",
            coverageTitle: "What We Cover",
            coverageItems: [
                "Ad network reviews and rankings",
                "Format guides (push, popunder, banner, etc.)",
                "Industry news and updates",
                "Monetization case studies",
                "SEO and traffic optimization"
            ]
        },
        ru: {
            title: "Об AdDirectory",
            description: "AdDirectory — это ресурс для вебмастеров и издателей, стремящихся эффективно монетизировать свои сайты. Мы предоставляем комплексные обзоры сетей, новости индустрии и образовательные руководства.",
            missionTitle: "Наша миссия",
            missionText: "Помочь издателям принимать обоснованные решения о своих стратегиях монетизации, предоставляя прозрачную и непредвзятую информацию о рекламных сетях и форматах.",
            coverageTitle: "Что мы освещаем",
            coverageItems: [
                "Обзоры и рейтинги рекламных сетей",
                "Гайды по форматам (пуши, попандеры, баннеры и т. д.)",
                "Новости и обновления индустрии",
                "Кейсы по монетизации",
                "SEO и оптимизация трафика"
            ]
        }
    };

    const active = content[language];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: t('nav.about') }]} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{active.title}</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {active.description}
                </p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{active.missionTitle}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-primary">
                    {active.missionText}
                </p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{active.coverageTitle}</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                    {active.coverageItems.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
