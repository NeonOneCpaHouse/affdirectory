'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import AdSlot from '@/components/AdSlot';

export default function DisclaimerPage() {
    const { t, language } = useLanguage();

    const content = {
        en: {
            title: "Disclaimer",
            noticeTitle: "Important Notice",
            noticeText: "The information on this website is for educational and informational purposes only.",
            sections: [
                {
                    title: "No Financial Advice",
                    text: "Content on this site does not constitute financial, legal, or professional advice. Always consult qualified professionals."
                },
                {
                    title: "Affiliate Relationships",
                    text: "Some links on this site may be affiliate links. We may earn commissions when you sign up through these links."
                },
                {
                    title: "Accuracy of Information",
                    text: "While we strive for accuracy, network policies and rates change frequently. Always verify information directly with networks."
                },
                {
                    title: "Third-Party Content",
                    text: "We are not responsible for content on third-party websites linked from this site."
                }
            ]
        },
        ru: {
            title: "Отказ от ответственности",
            noticeTitle: "Важное уведомление",
            noticeText: "Информация на данном веб-сайте предоставляется исключительно в образовательных и информационных целях.",
            sections: [
                {
                    title: "Никаких финансовых советов",
                    text: "Контент на этом сайте не является финансовой, юридической или профессиональной консультацией. Всегда консультируйтесь с квалифицированными специалистами."
                },
                {
                    title: "Партнерские отношения",
                    text: "Некоторые ссылки на этом сайте могут быть партнерскими. Мы можем получать комиссионные, когда вы регистрируетесь по этим ссылкам."
                },
                {
                    title: "Точность информации",
                    text: "Хотя мы стремимся к точности, политики и ставки сетей часто меняются. Всегда проверяйте информацию непосредственно в сетях."
                },
                {
                    title: "Сторонний контент",
                    text: "Мы не несем ответственности за контент на сторонних веб-сайтах, ссылки на которые представлены на этом сайте."
                }
            ]
        }
    };

    const active = content[language];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: t('nav.disclaimer') }]} />
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{active.title}</h1>
                    <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
                        <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl p-6 mb-8">
                            <p className="text-yellow-700 dark:text-yellow-400 font-semibold mb-2">{active.noticeTitle}</p>
                            <p>{active.noticeText}</p>
                        </div>
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
