'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface DropdownItem {
    label: string;
    href: string;
}

interface NavItemProps {
    label: string;
    href: string;
    items?: DropdownItem[];
}

function NavItem({ label, href, items }: NavItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!items || items.length === 0) {
        return (
            <Link href={href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-white transition-colors">
                {label}
            </Link>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link
                href={href}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-white transition-colors flex items-center gap-1"
            >
                {label}
                <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
            </Link>
            {isOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[180px]">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-gray-800 hover:text-sky-600 dark:hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Header() {
    const { t } = useLanguage();

    const navItems: NavItemProps[] = [
        {
            label: t('nav.networks'),
            href: '/networks',
            items: [
                { label: 'All Networks', href: '/networks' },
                { label: 'PushFlow', href: '/networks/pushflow' },
                { label: 'PropellerAds', href: '/networks/propellerads' },
                { label: 'Adcash', href: '/networks/adcash' },
                { label: 'Adsterra', href: '/networks/adsterra' },
            ],
        },
        {
            label: t('nav.rankings'),
            href: '/rankings',
            items: [
                { label: 'All Rankings', href: '/rankings' },
                { label: 'Web Push', href: '/rankings/web-push' },
                { label: 'Popunder', href: '/rankings/popunder' },
                { label: 'In-Page Push', href: '/rankings/in-page-push' },
                { label: 'Banner', href: '/rankings/banner' },
            ],
        },
        {
            label: t('nav.formats'),
            href: '/formats',
            items: [
                { label: 'All Formats', href: '/formats' },
                { label: 'Web Push', href: '/formats/web-push' },
                { label: 'Popunder', href: '/formats/popunder' },
                { label: 'In-Page Push', href: '/formats/in-page-push' },
                { label: 'Banner', href: '/formats/banner' },
            ],
        },
        {
            label: t('nav.news'),
            href: '/news',
        },
        {
            label: t('nav.guides'),
            href: '/guides',
            items: [
                { label: 'All Guides', href: '/guides' },
                { label: 'SEO Guides', href: '/guides?cat=seo' },
                { label: 'Monetization', href: '/guides?cat=monetization' },
                { label: 'Technical', href: '/guides?cat=technical' },
            ],
        },
        {
            label: t('nav.tools'),
            href: '/tools',
            items: [
                { label: 'All Tools', href: '/tools' },
                { label: 'RPM Calculator', href: '/tools/rpm-calculator' },
                { label: 'Ad Format Picker', href: '/tools/ad-format-picker' },
                { label: 'Pre-Monetization Checklist', href: '/tools/pre-monetization-checklist' },
            ],
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-sky-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                            <span className="text-sky-600 dark:text-blue-500">Ad</span>Directory
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <NavItem key={item.href} {...item} />
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block relative">
                            <input
                                type="text"
                                placeholder={t('common.search')}
                                className="w-48 lg:w-64 bg-sky-100 dark:bg-gray-800 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:border-sky-500 dark:focus:border-blue-500"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
