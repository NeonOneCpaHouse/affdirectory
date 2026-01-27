'use client';

import { slotSizes } from '@/mock/ads';
import { useLanguage } from '@/context/LanguageContext';

interface AdSlotProps {
    slotKey: string;
    className?: string;
}

export default function AdSlot({ slotKey, className = '' }: AdSlotProps) {
    const { language } = useLanguage();
    const size = slotSizes[slotKey] || { width: 336, height: 280 };

    // We maintain the dimensions of each ad slot to ensure the layout remains stable
    const height = size.height;

    const adsLabel = {
        en: 'Advertisement',
        ru: 'Реклама'
    };

    return (
        <div
            className={`ad-slot w-full ${className}`}
            style={{ height: height }}
        >
            <div className="w-full h-full bg-sky-50/50 dark:bg-blue-500/5 border-2 border-dashed border-sky-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center transition-colors hover:bg-sky-100/50 dark:hover:bg-blue-500/10 group cursor-default">
                <span className="text-sm font-medium italic text-sky-400 dark:text-blue-400 tracking-wide select-none group-hover:scale-105 transition-transform duration-300">
                    {adsLabel[language]}
                </span>
            </div>
        </div>
    );
}
