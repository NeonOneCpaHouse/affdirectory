'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-sky-200 dark:border-gray-800 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Directory</h4>
                        <ul className="space-y-2">
                            <li><Link href="/networks" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">{t('nav.networks')}</Link></li>
                            <li><Link href="/rankings" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">{t('nav.rankings')}</Link></li>
                            <li><Link href="/formats" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">{t('nav.formats')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><Link href="/news" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">{t('nav.news')}</Link></li>
                            <li><Link href="/guides" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">{t('nav.guides')}</Link></li>
                            <li><Link href="/case-studies" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">Case Studies</Link></li>
                            <li><Link href="/tools" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">{t('nav.tools')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">About</Link></li>
                            <li><Link href="/methodology" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">Methodology</Link></li>
                            <li><Link href="/advertise" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">{t('nav.advertise')}</Link></li>
                            <li><Link href="/contact" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">Terms</Link></li>
                            <li><Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">Privacy</Link></li>
                            <li><Link href="/disclaimer" className="text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white text-sm transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-sky-200 dark:border-gray-800 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} AffTraff. For educational purposes only.
                </div>
            </div>
        </footer>
    );
}
