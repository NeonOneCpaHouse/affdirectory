'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const saved = localStorage.getItem('preferred_lang') as Language;
        if (saved && (saved === 'en' || saved === 'ru')) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('preferred_lang', lang);
        document.documentElement.lang = lang;
    };

    const t = (key: string) => {
        return uiTranslations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

const uiTranslations: Record<Language, Record<string, string>> = {
    en: {
        'nav.networks': 'Networks',
        'nav.rankings': 'Rankings',
        'nav.formats': 'Formats',
        'nav.news': 'News',
        'nav.guides': 'Guides',
        'nav.tools': 'Tools',
        'nav.advertise': 'Advertise',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.methodology': 'Methodology',
        'nav.terms': 'Terms',
        'nav.privacy': 'Privacy',
        'nav.disclaimer': 'Disclaimer',
        'home.industryUpdates': 'Industry Updates',
        'home.topNetworks': 'Top Networks by Format',
        'home.trendingGuides': 'Trending Guides',
        'home.caseStudies': 'Case Studies',
        'common.viewAll': 'View all',
        'common.viewRankings': 'View rankings',
        'common.search': 'Search...',
        'common.more': 'View more',
        'network.payout': 'Min Payout',
        'network.frequency': 'Payout Frequency',
        'network.methods': 'Methods',
        'network.geos': 'GEOs',
        'network.visit': 'Visit Site',
        'network.similar': 'Similar Networks',
        'article.related': 'Related Articles',
    },
    ru: {
        'nav.networks': 'Сети',
        'nav.rankings': 'Рейтинги',
        'nav.formats': 'Форматы',
        'nav.news': 'Новости',
        'nav.guides': 'Гайды',
        'nav.tools': 'Инструменты',
        'nav.advertise': 'Реклама',
        'nav.home': 'Главная',
        'nav.about': 'О нас',
        'nav.contact': 'Контакты',
        'nav.methodology': 'Методология',
        'nav.terms': 'Условия',
        'nav.privacy': 'Конфиденциальность',
        'nav.disclaimer': 'Отказ от ответственности',
        'home.industryUpdates': 'Обновления индустрии',
        'home.topNetworks': 'Лучшие сети по форматам',
        'home.trendingGuides': 'Популярные гайды',
        'home.caseStudies': 'Кейсы',
        'common.viewAll': 'Смотреть все',
        'common.viewRankings': 'Рейтинги',
        'common.search': 'Поиск...',
        'common.more': 'Подробнее',
        'network.payout': 'Мин. выплата',
        'network.frequency': 'Частота выплат',
        'network.methods': 'Методы',
        'network.geos': 'Гео',
        'network.visit': 'Перейти на сайт',
        'network.similar': 'Похожие сети',
        'article.related': 'Похожие статьи',
    }
};
