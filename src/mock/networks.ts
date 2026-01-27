import { Localized } from "@/types";

export interface NetworkRating {
  overall: number;
  stability: number;
  support: number;
}

export interface Network {
  slug: string;
  name: string; // Names usually don't need translation, but we'll keep it as string
  logo?: string;
  formatsSupported: ('webPush' | 'popunder' | 'inPagePush' | 'banner')[];
  geos: Localized<string[]>;
  payoutFrequency: string; // Net-7, Net-30 etc are universal but we could translate if needed
  minPayout: number;
  paymentMethods: string[];
  ratingsByFormat: {
    webPush: NetworkRating;
    popunder: NetworkRating;
    inPagePush: NetworkRating;
    banner: NetworkRating;
  };
  pros: Localized<string[]>;
  cons: Localized<string[]>;
  editorialNote: Localized<string>;
}

export const networks: Network[] = [
  {
    slug: 'pushflow',
    name: 'PushFlow',
    formatsSupported: ['webPush', 'inPagePush'],
    geos: {
      en: ['Worldwide', 'Tier 1', 'Tier 2', 'Tier 3'],
      ru: ['Весь мир', 'Тир 1', 'Тир 2', 'Тир 3']
    },
    payoutFrequency: 'Net-7',
    minPayout: 50,
    paymentMethods: ['PayPal', 'Wire Transfer', 'Bitcoin', 'USDT'],
    ratingsByFormat: {
      webPush: { overall: 4.8, stability: 4.9, support: 4.7 },
      popunder: { overall: 0, stability: 0, support: 0 },
      inPagePush: { overall: 4.5, stability: 4.6, support: 4.4 },
      banner: { overall: 0, stability: 0, support: 0 },
    },
    pros: {
      en: ['Excellent fill rates', 'Fast payments', 'Clean dashboard', 'Great for push specialists'],
      ru: ['Отличный филлрейт', 'Быстрые выплаты', 'Чистый дашборд', 'Отлично для пуш-специалистов']
    },
    cons: {
      en: ['Limited ad formats', 'No native support'],
      ru: ['Ограниченный выбор форматов', 'Нет поддержки нативных объявлений']
    },
    editorialNote: {
      en: 'PushFlow remains one of the top choices for publishers focused on push notification monetization. Their tech stack is solid and payments are reliably on time.',
      ru: 'PushFlow остается одним из лучших выборов для паблишеров, сфокусированных на монетизации через пуш-уведомления. Их стек технологий надежен, а выплаты всегда приходят вовремя.'
    },
  },
  {
    slug: 'propellerads',
    name: 'PropellerAds',
    logo: '/logos/propellerads.png',
    formatsSupported: ['webPush', 'popunder', 'inPagePush', 'banner'],
    geos: {
      en: ['Worldwide', 'CIS', 'LATAM', 'SEA'],
      ru: ['Весь мир', 'СНГ', 'Латам', 'ЮВА']
    },
    payoutFrequency: 'Net-7',
    minPayout: 5,
    paymentMethods: ['PayPal', 'Skrill', 'WebMoney', 'Payoneer', 'Bitcoin'],
    ratingsByFormat: {
      webPush: { overall: 4.5, stability: 4.6, support: 4.4 },
      popunder: { overall: 4.8, stability: 4.9, support: 4.7 },
      inPagePush: { overall: 4.3, stability: 4.4, support: 4.2 },
      banner: { overall: 4.1, stability: 4.2, support: 4.0 },
    },
    pros: {
      en: ['Very low minimum payout', 'Fast approvals', 'Good CPM rates', 'Multiple formats'],
      ru: ['Очень низкий порог выплаты', 'Быстрый апрув', 'Хорошие ставки CPM', 'Множество форматов']
    },
    cons: {
      en: ['Some verticals restricted', 'Aggressive ad styles'],
      ru: ['Ограничения в некоторых вертикалях', 'Агрессивные рекламные стили']
    },
    editorialNote: {
      en: 'PropellerAds excels at popunder monetization and offers competitive rates across emerging markets.',
      ru: 'PropellerAds лидирует в монетизации попандера и предлагает конкурентные ставки на развивающихся рынках.'
    },
  },
  {
    slug: 'adsterra',
    name: 'Adsterra',
    logo: '/logos/adsterra.png',
    formatsSupported: ['webPush', 'popunder', 'inPagePush', 'banner'],
    geos: {
      en: ['Worldwide'],
      ru: ['Весь мир']
    },
    payoutFrequency: 'Net-15',
    minPayout: 5,
    paymentMethods: ['PayPal', 'Wire', 'Bitcoin', 'WebMoney', 'Paxum'],
    ratingsByFormat: {
      webPush: { overall: 4.0, stability: 4.1, support: 3.9 },
      popunder: { overall: 4.7, stability: 4.8, support: 4.6 },
      inPagePush: { overall: 4.1, stability: 4.2, support: 4.0 },
      banner: { overall: 4.2, stability: 4.3, support: 4.1 },
    },
    pros: {
      en: ['Full format suite', 'Low minimums', 'Social bar unique format'],
      ru: ['Полный набор форматов', 'Низкие лимиты', 'Уникальный формат Social Bar']
    },
    cons: {
      en: ['Some advertiser quality issues', 'Complex dashboard'],
      ru: ['Вопросы к качеству рекламодателей', 'Сложный дашборд']
    },
    editorialNote: {
      en: 'Adsterra offers comprehensive monetization options and their Social Bar format is a unique differentiator.',
      ru: 'Adsterra предлагает широкие возможности для монетизации, а их формат Social Bar является уникальным преимуществом.'
    },
  },
];

// Fallback for other networks until fully translated
const fallbackNetwork = (network: any): Network => ({
  ...network,
  geos: { en: network.geos, ru: network.geos },
  pros: { en: network.pros, ru: network.pros || [] },
  cons: { en: network.cons, ru: network.cons || [] },
  editorialNote: { en: network.editorialNote, ru: network.editorialNote }
});

export const formatLabels: Record<string, Localized<string>> = {
  webPush: { en: 'Web Push', ru: 'Веб-пуши' },
  popunder: { en: 'Popunder', ru: 'Попандер' },
  inPagePush: { en: 'In-Page Push', ru: 'In-Page Пуши' },
  banner: { en: 'Banner', ru: 'Баннеры' },
};

export function getNetworkBySlug(slug: string): Network | undefined {
  return networks.find((n) => n.slug === slug);
}

export function getNetworksByFormat(format: 'webPush' | 'popunder' | 'inPagePush' | 'banner'): Network[] {
  return networks
    .filter((n) => n.formatsSupported.includes(format) && n.ratingsByFormat[format].overall > 0)
    .sort((a, b) => b.ratingsByFormat[format].overall - a.ratingsByFormat[format].overall);
}
