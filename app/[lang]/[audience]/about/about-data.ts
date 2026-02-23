import {
    Target,
    Network,
    Zap,
    BookOpen,
    Calculator,
    Search,
    ShoppingBag,
    Calendar,
    Briefcase
} from "lucide-react";

export const localizedAboutText = {
    hero: {
        title: {
            ru: "Об AffTraff",
            en: "About AffTraff"
        },
        intro: {
            ru: "AffTraff — это уникальная в своем роде медиа-платформа для арбитражников, паблишеров и рекламодателей, основанная в 2026 году.",
            en: "AffTraff is a unique media platform of its kind for affiliates, publishers, and advertisers, founded in 2026."
        },
        description: {
            ru: "Почему уникальная? AffTraff объединяет в себе все аспекты партнерского маркетинга: аналитику, практические знания и инструменты для обеих сторон affiliate marketing. Это не просто информационный сайт. Это экосистема для вебмастеров и арбитражников, работающих с iGaming, betting, nutra, crypto, finance и другими вертикалями.",
            en: "Why is it unique? AffTraff combines all aspects of affiliate marketing: analytics, practical knowledge, and tools for both sides of the industry. It's not just an informational site. It's an ecosystem for webmasters and media buyers working with iGaming, betting, nutra, crypto, finance, and other verticals."
        }
    },
    mission: {
        title: {
            ru: "Наша цель и миссия",
            en: "Our Goal and Mission"
        },
        goal: {
            ru: "Наша цель — создать уникальную платформу, объединяющую в себе:",
            en: "Our goal is to create a unique platform that brings together:"
        },
        list: {
            ru: [
                "экспертные знания по арбитражу трафика",
                "независимые рейтинги сервисов и партнерских программ",
                "практические инструменты для вебмастеров",
                "актуальную аналитику рынка affiliate marketing"
            ],
            en: [
                "expert knowledge on traffic arbitrage",
                "independent rankings of services and affiliate programs",
                "practical tools for webmasters",
                "up-to-date analytics on the affiliate marketing market"
            ]
        },
        ideaTitle: {
            ru: "Идея, которая нас объединяет",
            en: "The Idea That Unites Us"
        },
        ideaText: {
            ru: "Мы стремимся сделать арбитраж трафика прозрачнее, эффективнее и доступнее. AffTraff стремится стать точкой входа и опорой для всех участников affiliate marketing: от первого оффера и уникального посетителя до системного масштабирования и увеличения прибыли. Мы создаем контент и описываем сервисы, опираясь на реальный опыт рынка: от новичков до крупных команд и медиабаеров с большими объемами трафика.",
            en: "We aim to make traffic arbitrage more transparent, efficient, and accessible. AffTraff strives to become the entry point and the foundation for all affiliate marketing participants: from the first offer and unique visitor to systematic scaling and profit growth. We create content and review services based on real market experience: from beginners to large teams and media buyers with massive traffic volumes."
        }
    },
    offerings: {
        title: {
            ru: "Что вы найдете на AffTraff",
            en: "What You Will Find on AffTraff"
        },
        sections: [
            {
                id: "rankings",
                title: { ru: "Рейтинги", en: "Rankings" },
                desc: {
                    ru: "Мы публикуем независимые рейтинги и обзоры ключевых платформ для арбитражников и вебмастеров. Каждый рейтинг формируется с учетом функционала, репутации, отзывов и практического применения.",
                    en: "We publish independent rankings and reviews of key platforms for affiliates and webmasters. Each ranking is built taking into account functionality, reputation, user reviews, and practical application."
                },
                items: {
                    ru: [
                        { label: "Рекламные сети", desc: "платформы для закупки трафика с разных источников." },
                        { label: "CPA-сети", desc: "партнерские программы с офферами под разные вертикали и ГЕО." },
                        { label: "Сервисы", desc: "вспомогательные инструменты для оптимизации работы." },
                        { label: "Антидетект-браузеры", desc: "решения для безопасного мультиаккаунтинга." },
                        { label: "Spy-сервисы", desc: "платформы для поиска креативов, лендингов и связок конкурентов." },
                        { label: "Клоакинг", desc: "инструменты для фильтрации и защиты трафика." },
                        { label: "Прокси", desc: "мобильные и серверные прокси под разные задачи." },
                        { label: "Трекеры", desc: "системы трекинга, аналитики и оптимизации кампаний." },
                        { label: "PWA", desc: "прогрессивные веб-приложения." },
                        { label: "Платежки", desc: "платежные системы и другие решения для приема и вывода средств." }
                    ],
                    en: [
                        { label: "Ad Networks", desc: "platforms for buying traffic across various sources." },
                        { label: "CPA Networks", desc: "affiliate programs with offers for different verticals and GEOs." },
                        { label: "Services", desc: "auxiliary tools for workflow optimization." },
                        { label: "Antidetect Browsers", desc: "solutions for secure multi-accounting." },
                        { label: "Spy Services", desc: "platforms for finding competitors' creatives, landing pages, and funnels." },
                        { label: "Cloaking", desc: "tools for filtering and protecting traffic." },
                        { label: "Proxies", desc: "mobile and residential proxies for various tasks." },
                        { label: "Trackers", desc: "systems for tracking, analytics, and campaign optimization." },
                        { label: "PWA", desc: "progressive web applications." },
                        { label: "Payment Solutions", desc: "payment systems and other solutions for processing and withdrawing funds." }
                    ]
                }
            },
            {
                id: "articles",
                title: { ru: "Статьи", en: "Articles" },
                desc: {
                    ru: "Экспертный контент для практиков affiliate marketing:",
                    en: "Expert content for affiliate marketing practitioners:"
                },
                items: {
                    ru: [
                        { label: "Новости", desc: "ключевые события рынка, арбитража трафика и партнерских программ." },
                        { label: "Кейсы", desc: "реальные примеры запусков, ошибок и масштабирования." },
                        { label: "Обзоры", desc: "детальный разбор сервисов, офферов и инструментов." },
                        { label: "Гайды", desc: "пошаговые инструкции для вебмастеров и арбитражников." }
                    ],
                    en: [
                        { label: "News", desc: "key market events surrounding traffic arbitrage and affiliate programs." },
                        { label: "Case Studies", desc: "real-world examples of product launches, mistakes, and scaling." },
                        { label: "Reviews", desc: "detailed breakdowns of services, offers, and tools." },
                        { label: "Guides", desc: "step-by-step instructions for webmasters and media buyers." }
                    ]
                }
            },
            {
                id: "knowledge_base",
                title: { ru: "База знаний", en: "Knowledge Base" },
                desc: {
                    ru: "Подробный словарь терминов affiliate marketing, разделенный на 2 блока: арбитражники и паблишеры. Здесь мы объясняем сложные понятия простым языком: от базовых метрик до профессионального сленга.",
                    en: "A detailed dictionary of affiliate marketing terms, divided into 2 blocks: affiliates and publishers. Here we explain complex concepts in simple language: from basic metrics to professional slang."
                },
                items: { ru: [], en: [] }
            },
            {
                id: "tools_arbitrage",
                title: { ru: "Инструменты для арбитражников", en: "Tools for Media Buyers" },
                desc: { ru: "", en: "" },
                items: {
                    ru: [
                        { label: "Калькулятор метрик", desc: "онлайн-калькулятор расчета ROI, ROAS, CPA, CPC, CPM и других показателей." },
                        { label: "UTM-метки", desc: "онлайн-генерация и анализ ссылок для трекинга трафика." }
                    ],
                    en: [
                        { label: "Metric Calculator", desc: "online calculator for ROI, ROAS, CPA, CPC, CPM, and other indicators." },
                        { label: "UTM Builder", desc: "online generation and analysis of links for traffic tracking." }
                    ]
                }
            },
            {
                id: "tools_webmaster",
                title: { ru: "Инструменты для владельцев сайтов", en: "Tools for Webmasters" },
                desc: { ru: "", en: "" },
                items: {
                    ru: [
                        { label: "Калькулятор RPM", desc: "расчет дохода с 1000 показов с учетом формата рекламы и объема трафика." },
                        { label: "Подбор рекламного формата", desc: "рекомендации по выбору баннеров, нативной рекламы, push, pop и других форматов под тип сайта." },
                        { label: "Чек-лист перед монетизацией", desc: "пошаговая проверка готовности сайта к подключению рекламных сетей." },
                        { label: "Демо форматов", desc: "предпросмотр популярных рекламных форматов для оценки пользовательского опыта." }
                    ],
                    en: [
                        { label: "RPM Calculator", desc: "revenue calculation per 1000 impressions based on ad format and traffic volume." },
                        { label: "Ad Format Matcher", desc: "recommendations for choosing banners, native ads, push, pop, and other formats for your site type." },
                        { label: "Pre-Monetization Checklist", desc: "step-by-step checklist to ensure your site is ready for ad networks." },
                        { label: "Format Demo", desc: "preview of popular ad formats to evaluate user experience." }
                    ]
                }
            },
            {
                id: "events",
                title: { ru: "Ивенты", en: "Events" },
                desc: {
                    ru: "Информация об арбитражных конференциях и профильных мероприятиях affiliate marketing по всему миру.",
                    en: "Information about affiliate marketing conferences and specialized industry events around the world."
                },
                items: { ru: [], en: [] }
            },
            {
                id: "jobs",
                title: { ru: "Вакансии", en: "Jobs" },
                desc: {
                    ru: "AffTraff соединяет специалистов и компании внутри индустрии. Актуальные вакансии в сфере affiliate marketing: медиабаинг, аккаунт-менеджмент, аналитика, маркетинг и продажи.",
                    en: "AffTraff connects specialists and companies within the industry. Up-to-date vacancies in affiliate marketing: media buying, account management, analytics, marketing, and sales."
                },
                items: { ru: [], en: [] }
            }
        ]
    },
    join: {
        title: {
            ru: "Присоединяйтесь к AffTraff",
            en: "Join AffTraff"
        },
        text: {
            ru: "Подписывайтесь на нашу рассылку, чтобы первыми узнавать о новых статьях и обновлениях платформы. AffTraff — экосистема, которая работает на ваш результат.",
            en: "Subscribe to our newsletter to be the first to know about new articles and platform updates. AffTraff — an ecosystem that works for your results."
        }
    }
};
