'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';

export default function MethodologyPage() {
    const { t, language } = useLanguage();

    const content = {
        en: {
            title: "Our Ranking Methodology",
            intro: "Our network rankings are designed to help publishers make informed decisions. We use a weighted scoring system that evaluates networks across multiple dimensions.",
            scoringTitle: "Scoring Breakdown",
            metrics: [
                {
                    title: "Performance Metrics (60%)",
                    description: "Fill rates, CPM consistency, geographic coverage, and traffic acceptance rates."
                },
                {
                    title: "Publisher Experience (25%)",
                    description: "Payment reliability, dashboard usability, integration ease, and reporting quality."
                },
                {
                    title: "Support Quality (15%)",
                    description: "Response time, issue resolution, and dedicated account management availability."
                }
            ],
            dataSourcesTitle: "Data Sources",
            dataSources: [
                "Publisher surveys and feedback",
                "Direct testing with controlled traffic",
                "Public information and reviews",
                "Industry partnerships and data sharing"
            ],
            updateTitle: "Update Frequency",
            updateText: "Rankings are updated quarterly, with interim updates for significant changes such as payment issues or policy changes.",
            disclaimerTitle: "Disclaimer",
            disclaimerText: "Rankings are provided for informational purposes only. Publishers should conduct their own due diligence before partnering with any network."
        },
        ru: {
            title: "Наша методология рейтинга",
            intro: "Наши рейтинги сетей призваны помочь издателям принимать обоснованные решения. Мы используем систему взвешенных оценок, которая оценивает сети по нескольким измерениям.",
            scoringTitle: "Разбор баллов",
            metrics: [
                {
                    title: "Показатели производительности (60%)",
                    description: "Коэффициенты заполнения (fill rate), стабильность CPM, географический охват и уровень приема трафика."
                },
                {
                    title: "Опыт издателя (25%)",
                    description: "Надежность платежей, удобство использования панели управления, простота интеграции и качество отчетности."
                },
                {
                    title: "Качество поддержки (15%)",
                    description: "Время ответа, разрешение проблем и наличие персонального менеджера."
                }
            ],
            dataSourcesTitle: "Источники данных",
            dataSources: [
                "Опросы и отзывы издателей",
                "Прямое тестирование с использованием контролируемого трафика",
                "Публичная информация и обзоры",
                "Отраслевые партнерства и обмен данными"
            ],
            updateTitle: "Частота обновлений",
            updateText: "Рейтинги обновляются ежеквартально, с промежуточными обновлениями в случае значительных изменений, таких как проблемы с выплатами или изменения в политике.",
            disclaimerTitle: "Отказ от ответственности",
            disclaimerText: "Рейтинги предоставляются исключительно в информационных целях. Издатели должны провести собственную проверку перед началом сотрудничества с любой сетью."
        }
    };

    const active = content[language];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: t('nav.methodology') }]} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-primary">{active.title}</h1>
            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {active.intro}
                </p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{active.scoringTitle}</h2>
                <div className="space-y-4 mb-8">
                    {active.metrics.map((metric, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{metric.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{metric.description}</p>
                        </div>
                    ))}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{active.dataSourcesTitle}</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                    {active.dataSources.map((source, i) => (
                        <li key={i}>{source}</li>
                    ))}
                </ul>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{active.updateTitle}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    {active.updateText}
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl p-5 mt-8">
                    <h3 className="text-yellow-700 dark:text-yellow-400 font-semibold mb-2">{active.disclaimerTitle}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {active.disclaimerText}
                    </p>
                </div>
            </div>
        </div>
    );
}
