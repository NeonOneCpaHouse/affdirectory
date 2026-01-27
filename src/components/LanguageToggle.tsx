'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center bg-sky-100 dark:bg-gray-800 rounded-lg p-1 shadow-inner border border-sky-200 dark:border-gray-700">
            <button
                onClick={() => setLanguage('en')}
                className={cn(
                    "px-3 py-1 text-xs font-bold rounded-md transition-all",
                    language === 'en'
                        ? "bg-white dark:bg-gray-700 text-sky-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 hover:text-sky-600 dark:hover:text-blue-400"
                )}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('ru')}
                className={cn(
                    "px-3 py-1 text-xs font-bold rounded-md transition-all",
                    language === 'ru'
                        ? "bg-white dark:bg-gray-700 text-sky-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 hover:text-sky-600 dark:hover:text-blue-400"
                )}
            >
                RU
            </button>
        </div>
    );
}
