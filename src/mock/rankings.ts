import { networks, Network, formatLabels } from './networks';
import { Localized } from '@/types';

export type FormatKey = 'webPush' | 'popunder' | 'inPagePush' | 'banner';

export interface RankedNetwork {
    network: Network;
    rank: number;
    score: number;
}

export interface FormatRanking {
    format: FormatKey;
    label: Localized<string>;
    slug: string;
    networks: RankedNetwork[];
    bestFor: {
        title: Localized<string>;
        network: Network;
        reason: Localized<string>;
    }[];
}

const formatSlugs: Record<FormatKey, string> = {
    webPush: 'web-push',
    popunder: 'popunder',
    inPagePush: 'in-page-push',
    banner: 'banner',
};

export function getRankingsByFormat(format: FormatKey): FormatRanking {
    const rankedNetworks = networks
        .filter((n) => n.formatsSupported.includes(format) && n.ratingsByFormat[format].overall > 0)
        .map((network) => ({ network, score: network.ratingsByFormat[format].overall, rank: 0 }))
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, rank: index + 1 }));

    const bestFor: FormatRanking['bestFor'] = [];
    if (rankedNetworks.length > 0) {
        bestFor.push({
            title: { en: 'Best Overall', ru: 'Лучший выбор' },
            network: rankedNetworks[0].network,
            reason: {
                en: `Top-rated for ${formatLabels[format].en}.`,
                ru: `Самый высокий рейтинг в категории ${formatLabels[format].ru}.`
            }
        });
    }
    const beginnerFriendly = [...rankedNetworks].sort((a, b) => a.network.minPayout - b.network.minPayout)[0];
    if (beginnerFriendly) {
        bestFor.push({
            title: { en: 'Best for Beginners', ru: 'Для новичков' },
            network: beginnerFriendly.network,
            reason: {
                en: `Low $${beginnerFriendly.network.minPayout} minimum payment.`,
                ru: `Низкий порог выплаты: всего $${beginnerFriendly.network.minPayout}.`
            }
        });
    }

    return {
        format,
        label: formatLabels[format],
        slug: formatSlugs[format],
        networks: rankedNetworks,
        bestFor
    };
}

export function getAllFormatRankings(): FormatRanking[] {
    return (['webPush', 'popunder', 'inPagePush', 'banner'] as FormatKey[]).map(getRankingsByFormat);
}

export function getRankingBySlug(slug: string): FormatRanking | undefined {
    const map: Record<string, FormatKey> = { 'web-push': 'webPush', popunder: 'popunder', 'in-page-push': 'inPagePush', banner: 'banner' };
    return map[slug] ? getRankingsByFormat(map[slug]) : undefined;
}

export const rankingMethodology: Localized<string> = {
    en: "Our rankings use weighted scoring: Performance (60%), Publisher Experience (25%), Support (15%). Updated quarterly.",
    ru: "Наши рейтинги используют взвешенную оценку: Производительность (60%), Опыт издателя (25%), Поддержка (15%). Обновляется ежеквартально."
};
