'use client';

import Link from 'next/link';
import { RankedNetwork } from '@/mock/rankings';
import RatingStars from './RatingStars';
import { useLanguage } from '@/context/LanguageContext';

interface NetworkTableProps {
    networks: RankedNetwork[];
    showRank?: boolean;
    maxRows?: number;
}

export default function NetworkTable({ networks, showRank = true, maxRows }: NetworkTableProps) {
    const { t } = useLanguage();
    const rows = maxRows ? networks.slice(0, maxRows) : networks;

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-sky-200 dark:border-gray-700">
                        {showRank && <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>}
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('nav.networks')}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('network.payout')}</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-sky-100 dark:divide-gray-700/50">
                    {rows.map((item) => (
                        <tr key={item.network.slug} className="hover:bg-sky-50 dark:hover:bg-gray-800/50 transition-colors">
                            {showRank && (
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${item.rank === 1 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                                        item.rank === 2 ? 'bg-gray-200 dark:bg-gray-400/20 text-gray-600 dark:text-gray-300' :
                                            item.rank === 3 ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400' :
                                                'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {item.rank}
                                    </span>
                                </td>
                            )}
                            <td className="px-4 py-4">
                                <Link href={`/networks/${item.network.slug}`} className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-blue-400 font-medium">
                                    {item.network.logo && item.network.logo.trim() !== '' && (
                                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                                            <img
                                                src={item.network.logo}
                                                alt={`${item.network.name} logo`}
                                                className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                                            />
                                        </div>
                                    )}
                                    {item.network.name}
                                </Link>
                            </td>
                            <td className="px-4 py-4"><RatingStars rating={item.score} size="sm" /></td>
                            <td className="px-4 py-4 text-gray-700 dark:text-gray-300">${item.network.minPayout}</td>
                            <td className="px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">{item.network.payoutFrequency}</td>
                            <td className="px-4 py-4">
                                <Link href={`/networks/${item.network.slug}`} className="text-sky-600 dark:text-blue-400 hover:text-sky-700 dark:hover:text-blue-300 text-sm font-medium">
                                    {t('common.more')} →
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
