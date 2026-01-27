import { Localized } from "@/types";

export type ArticleType = 'news' | 'guide' | 'case';
export type NewsCategory = 'google' | 'ads' | 'industry';
export type GuideCategory = 'seo' | 'reddit' | 'monetization' | 'technical';

export interface Article {
    slug: string;
    title: Localized<string>;
    type: ArticleType;
    category: NewsCategory | GuideCategory;
    date: string;
    excerpt: Localized<string>;
    body: Localized<string>;
    thumbnail?: string;
    readingTime?: number;
    checklist?: Localized<string[]>;
    caseStudySections?: Localized<{
        setup: string;
        traffic: string;
        placements: string;
        results: string;
        lessons: string;
    }>;
}

export const articles: Article[] = [
    // NEWS ARTICLES
    {
        slug: 'google-safe-browsing-2024-update',
        title: {
            en: 'Google Safe Browsing Updates: What Publishers Need to Know in 2024',
            ru: 'Обновления Google Safe Browsing: что нужно знать паблишерам в 2024 году'
        },
        type: 'news',
        category: 'google',
        date: '2024-12-20',
        thumbnail: '/thumbnails/news_default.png',
        excerpt: {
            en: 'Google has rolled out stricter Safe Browsing policies affecting push notification prompts and interstitial ads.',
            ru: 'Google внедрил более строгие правила Safe Browsing, влияющие на запросы пуш-уведомлений и межстраничную рекламу.'
        },
        body: {
            en: `Google's latest Safe Browsing update has significant implications for publishers using push notification monetization.
            
## Key Changes

The new policies specifically address:
- Permission prompt timing and frequency
- Interstitial ad placement on mobile`,
            ru: `Последнее обновление Google Safe Browsing имеет серьезные последствия для издателей, использующих монетизацию через пуш-уведомления.

## Ключевые изменения

Новая политика касается:
- Тайминга и частоты запросов на подписку
- Размещения межстраничной рекламы на мобильных устройствах`
        },
    },
    {
        slug: 'programmatic-ad-spend-q4-2024',
        title: {
            en: 'Programmatic Ad Spend Hits Record High in Q4 2024',
            ru: 'Программные расходы на рекламу достигли рекордного уровня в 4 квартале 2024 года'
        },
        type: 'news',
        category: 'ads',
        date: '2024-12-22',
        thumbnail: '/thumbnails/news_default.png',
        excerpt: {
            en: 'Holiday season drives unprecedented programmatic spending, benefiting publishers across all formats.',
            ru: 'Праздничный сезон стимулирует беспрецедентные расходы на рекламу, что выгодно паблишерам всех форматов.'
        },
        body: {
            en: `Q4 2024 is shaping up to be a record-breaking quarter for programmatic advertising, with early data showing 23% YoY growth.`,
            ru: `Четвертый квартал 2024 года обещает стать рекордным для программной рекламы: предварительные данные показывают рост на 23% в годовом исчислении.`
        },
    },
    // GUIDES
    {
        slug: 'ad-stack-optimization-guide',
        title: {
            en: 'Optimizing Your Ad Stack for Maximum RPM',
            ru: 'Оптимизация рекламного стека для максимального RPM'
        },
        type: 'guide',
        category: 'monetization',
        date: '2024-12-01',
        thumbnail: '/thumbnails/guide_default.png',
        excerpt: {
            en: 'Strategic guide to combining multiple ad formats and networks for optimal revenue.',
            ru: 'Стратегическое руководство по комбинированию форматов и сетей для оптимального дохода.'
        },
        body: {
            en: `The right ad stack can dramatically increase revenue without proportionally impacting user experience.`,
            ru: `Правильный рекламный стек может значительно увеличить доход без пропорционального ущерба для пользовательского опыта.`
        },
        readingTime: 15,
        checklist: {
            en: ['Audit current ad placements', 'Map revenue by format and network'],
            ru: ['Аудит текущих рекламных мест', 'Анализ доходов по форматам и сетям']
        },
    },
];

export function getArticlesByType(type: ArticleType): Article[] {
    return articles.filter((a) => a.type === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((a) => a.slug === slug);
}

export function getLatestNews(count: number = 6): Article[] {
    return getArticlesByType('news').slice(0, count);
}

export function getLatestGuides(count: number = 6): Article[] {
    return getArticlesByType('guide').slice(0, count);
}

export function getCaseStudies(count: number = 6): Article[] {
    return getArticlesByType('case').slice(0, count);
}

export function getRelatedArticles(currentSlug: string, count: number = 3): Article[] {
    const current = getArticleBySlug(currentSlug);
    if (!current) return [];

    return articles
        .filter((a) => a.slug !== currentSlug && (a.type === current.type || a.category === current.category))
        .slice(0, count);
}
