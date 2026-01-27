'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored) {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', theme);
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Provide a default value before mounting to prevent hydration mismatch
    const value = mounted ? { theme, toggleTheme } : { theme: 'light' as Theme, toggleTheme: () => { } };

    return (
        <ThemeContext.Provider value={value}>
            <div className={!mounted ? 'opacity-0' : 'opacity-100 transition-opacity duration-200'}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        // Return a default value for SSR/pre-mount
        return { theme: 'light' as Theme, toggleTheme: () => { } };
    }
    return context;
}
