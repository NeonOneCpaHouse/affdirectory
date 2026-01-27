'use client';

import { useState } from 'react';
import { formatLabels } from '@/mock/networks';
import { useLanguage } from '@/context/LanguageContext';

type FormatKey = 'webPush' | 'popunder' | 'inPagePush' | 'banner';

interface FormatTabsProps {
    onTabChange?: (format: FormatKey) => void;
    defaultFormat?: FormatKey;
}

const formats: FormatKey[] = ['webPush', 'popunder', 'inPagePush', 'banner'];

export default function FormatTabs({ onTabChange, defaultFormat = 'webPush' }: FormatTabsProps) {
    const { language } = useLanguage();
    const [activeFormat, setActiveFormat] = useState<FormatKey>(defaultFormat);

    const handleTabClick = (format: FormatKey) => {
        setActiveFormat(format);
        onTabChange?.(format);
    };

    return (
        <div className="flex flex-wrap gap-1 p-1 bg-sky-100 dark:bg-gray-800/50 rounded-lg">
            {formats.map((format) => (
                <button
                    key={format}
                    onClick={() => handleTabClick(format)}
                    className={`flex-1 min-w-[100px] px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeFormat === format
                        ? 'bg-sky-600 dark:bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-sky-200 dark:hover:bg-gray-700/50'
                        }`}
                >
                    {formatLabels[format][language]}
                </button>
            ))}
        </div>
    );
}
