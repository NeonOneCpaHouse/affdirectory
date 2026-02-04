'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import AdSlot from '@/components/AdSlot';

export default function PrivacyPage() {
    const { t, language } = useLanguage();

    const content = {
        en: {
            title: "Privacy Policy",
            updated: "Last updated: December 2024",
            sections: [
                {
                    title: "Information We Collect",
                    text: "We collect standard analytics data including page views, referrer information, and device type."
                },
                {
                    title: "Use of Cookies",
                    text: "We use cookies for analytics and to improve your browsing experience."
                },
                {
                    title: "Third-Party Services",
                    text: "We may use third-party analytics and advertising services that collect data according to their own privacy policies."
                },
                {
                    title: "Your Rights",
                    text: "You may request access to or deletion of your personal data by contacting us."
                }
            ]
        },
        ru: {
            title: "Политика конфиденциальности",
            updated: "Последнее обновление: Декабрь 2024",
            sections: [
                {
                    title: "Информация, которую мы собираем",
                    text: "Мы собираем стандартные аналитические данные, включая просмотры страниц, информацию о реферерах и типах устройств."
                },
                {
                    title: "Использование файлов cookie",
                    text: "Мы используем файлы cookie для аналитики и улучшения вашего опыта просмотра."
                },
                {
                    title: "Сторонние сервисы",
                    text: "Мы можем использовать сторонние аналитические и рекламные сервисы, которые собирают данные в соответствии со своей собственной политикой конфиденциальности."
                },
                {
                    title: "Ваши права",
                    text: "Вы можете запросить доступ к своим персональным данным или их удаление, связавшись с нами."
                }
            ]
        }
    };

    const active = content[language];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: t('nav.privacy') }]} />
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-primary">{active.title}</h1>
                    <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
                        <p className="italic text-sm text-gray-500">{active.updated}</p>
                        <div className="my-8">
                            <AdSlot slotKey="inline" />
                        </div>
                        {active.sections.slice(0, 1).map((section, i) => (
                            <div key={i}>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{section.title}</h2>
                                <p>{section.text}</p>
                            </div>
                        ))}
                        <div className="lg:hidden my-8">
                            <AdSlot slotKey="sidebar" />
                        </div>
                        {active.sections.slice(1).map((section, i) => (
                            <div key={i + 1}>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{section.title}</h2>
                                <p>{section.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <aside className="hidden lg:block w-full lg:w-[300px]">
                    <div className="sticky top-8">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    );
}
