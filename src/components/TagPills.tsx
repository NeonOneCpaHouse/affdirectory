'use client';

import { formatLabels } from '@/mock/networks';
import { useLanguage } from '@/context/LanguageContext';

interface TagPillsProps {
    tags: string[];
    variant?: 'format' | 'category' | 'default';
    size?: 'sm' | 'md';
}

const formatColors: Record<string, string> = {
    webPush: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    popunder: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    inPagePush: 'bg-green-500/20 text-green-400 border-green-500/30',
    banner: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const categoryLabels: Record<string, Record<string, string>> = {
    en: {
        google: 'Google',
        ads: 'Ads',
        industry: 'Industry',
        seo: 'SEO',
        reddit: 'Reddit',
        monetization: 'Monetization',
        technical: 'Technical',
    },
    ru: {
        google: 'Google',
        ads: 'Реклама',
        industry: 'Индустрия',
        seo: 'SEO',
        reddit: 'Reddit',
        monetization: 'Монетизация',
        technical: 'Техническое',
    }
};

const categoryColors: Record<string, string> = {
    google: 'bg-red-500/20 text-red-400 border-red-500/30',
    ads: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    industry: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    seo: 'bg-green-500/20 text-green-400 border-green-500/30',
    reddit: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    monetization: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    technical: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export default function TagPills({ tags, variant = 'default', size = 'md' }: TagPillsProps) {
    const { language } = useLanguage();
    const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
                let colorClass = 'bg-gray-700/50 text-gray-300 border-gray-600';
                let label = tag;

                if (variant === 'format') {
                    colorClass = formatColors[tag] || colorClass;
                    label = formatLabels[tag] ? formatLabels[tag][language] : tag;
                } else if (variant === 'category') {
                    colorClass = categoryColors[tag] || colorClass;
                    label = categoryLabels[language][tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
                }

                return (
                    <span key={tag} className={`${sizeClass} ${colorClass} rounded-full border font-medium`}>
                        {label}
                    </span>
                );
            })}
        </div>
    );
}
