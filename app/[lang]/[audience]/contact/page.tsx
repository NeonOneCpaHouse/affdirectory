'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
    const { t, language } = useLanguage();

    const content = {
        en: {
            title: "Contact Us",
            subtitle: "Have questions or feedback? We'd love to hear from you.",
            general: "General Inquiries",
            advertising: "Advertising",
            press: "Press",
            formTitle: "Send a Message",
            nameLabel: "Name",
            namePlaceholder: "Your name",
            emailLabel: "Email",
            emailPlaceholder: "you@example.com",
            messageLabel: "Message",
            messagePlaceholder: "Your message...",
            button: "Send Message"
        },
        ru: {
            title: "Связаться с нами",
            subtitle: "Есть вопросы или отзывы? Мы будем рады вас услышать.",
            general: "Общие вопросы",
            advertising: "Реклама",
            press: "Пресса",
            formTitle: "Отправить сообщение",
            nameLabel: "Имя",
            namePlaceholder: "Ваше имя",
            emailLabel: "Email",
            emailPlaceholder: "you@example.com",
            messageLabel: "Сообщение",
            messagePlaceholder: "Ваше сообщение...",
            button: "Отправить"
        }
    };

    const active = content[language];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: t('nav.about') }]} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{active.title}</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{active.subtitle}</p>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-5 shadow-sm">
                            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{active.general}</h3>
                            <p className="text-gray-500 dark:text-gray-400">hello@addirectory.example</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-5 shadow-sm">
                            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{active.advertising}</h3>
                            <p className="text-gray-500 dark:text-gray-400">ads@addirectory.example</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-5 shadow-sm">
                            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{active.press}</h3>
                            <p className="text-gray-500 dark:text-gray-400">press@addirectory.example</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{active.formTitle}</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{active.nameLabel}</label>
                            <input type="text" className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20" placeholder={active.namePlaceholder} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{active.emailLabel}</label>
                            <input type="email" className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20" placeholder={active.emailPlaceholder} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{active.messageLabel}</label>
                            <textarea rows={4} className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/20" placeholder={active.messagePlaceholder} />
                        </div>
                        <button type="button" className="w-full bg-sky-600 dark:bg-blue-600 hover:bg-sky-700 dark:hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm">
                            {active.button}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
