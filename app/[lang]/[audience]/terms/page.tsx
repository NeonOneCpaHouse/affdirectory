'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
    const { t, language } = useLanguage();

    const content = {
        en: {
            title: "Terms of Service",
            updated: "Last updated: December 2024",
            sections: [
                {
                    title: "1. Acceptance of Terms",
                    text: "By accessing this website, you agree to be bound by these Terms of Service."
                },
                {
                    title: "2. Use of Content",
                    text: "Content on this site is provided for informational purposes only. You may not reproduce or distribute content without permission."
                },
                {
                    title: "3. Disclaimer",
                    text: "Information provided does not constitute financial or legal advice. Conduct your own research before making decisions."
                },
                {
                    title: "4. Limitation of Liability",
                    text: "We are not liable for any damages arising from your use of this website or reliance on its content."
                }
            ]
        },
        ru: {
            title: "Условия предоставления услуг",
            updated: "Последнее обновление: Декабрь 2024",
            sections: [
                {
                    title: "1. Принятие условий",
                    text: "Заходя на этот сайт, вы соглашаетесь соблюдать настоящие Условия предоставления услуг."
                },
                {
                    title: "2. Использование контента",
                    text: "Контент на этом сайте предоставляется исключительно в информационных целях. Вы не имеете права воспроизводить или распространять контент без предварительного разрешения."
                },
                {
                    title: "3. Отказ от ответственности",
                    text: "Предоставленная информация не является финансовой или юридической консультацией. Проведите собственное исследование, прежде чем принимать какие-либо решения."
                },
                {
                    title: "4. Ограничение ответственности",
                    text: "Мы не несем ответственности за любые убытки, возникшие в результате использования вами данного веб-сайта или доверия к его содержимому."
                }
            ]
        }
    };

    const active = content[language];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: t('nav.terms') }]} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-primary">{active.title}</h1>
            <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
                <p className="italic text-sm text-gray-500">{active.updated}</p>
                {active.sections.map((section, i) => (
                    <div key={i}>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{section.title}</h2>
                        <p>{section.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
