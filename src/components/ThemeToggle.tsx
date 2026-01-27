'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-sky-100 dark:bg-gray-800 hover:bg-sky-200 dark:hover:bg-gray-700 transition-colors shadow-inner border border-sky-200 dark:border-gray-700"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon className="w-4 h-4 text-sky-700" />
            ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
            )}
        </button>
    );
}
