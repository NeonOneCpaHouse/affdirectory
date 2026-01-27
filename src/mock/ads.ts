export interface AdCreative {
    id: string;
    slotKey: string;
    headline: string;
    description: string;
    ctaText: string;
    ctaUrl: string;
    backgroundColor: string;
    targeting?: { format?: string; category?: string; page?: string };
}

export const ads: AdCreative[] = [
    // HOME LEADERBOARD - 2 creatives
    { id: 'hl1', slotKey: 'home_leaderboard', headline: 'Push Notification Network', description: 'Premium CPMs for quality traffic. Join 10,000+ publishers.', ctaText: 'Start Earning', ctaUrl: '#', backgroundColor: '#1e40af' },
    { id: 'hl2', slotKey: 'home_leaderboard', headline: 'Monetize Your Traffic Today', description: 'Multi-format ads. Fast payments. Global coverage.', ctaText: 'Get Started', ctaUrl: '#', backgroundColor: '#7c3aed' },
    // HOME INLINE
    { id: 'hi1', slotKey: 'home_inline', headline: 'Ad Revenue Calculator', description: 'See how much you could earn with our free tool.', ctaText: 'Calculate Now', ctaUrl: '/tools/rpm-calculator', backgroundColor: '#047857' },
    // HOME SIDEBAR
    { id: 'hs1', slotKey: 'home_sidebar', headline: 'Premium Publisher Program', description: 'Exclusive rates for high-quality sites. Apply now.', ctaText: 'Apply', ctaUrl: '#', backgroundColor: '#b91c1c' },
    // FORMAT
    { id: 'ft1', slotKey: 'format_top', headline: 'Format Specialists Wanted', description: 'Networks seeking publishers with format expertise.', ctaText: 'See Networks', ctaUrl: '/networks', backgroundColor: '#0369a1' },
    { id: 'fi1', slotKey: 'format_inline', headline: 'Optimize Your Format Mix', description: 'Learn which formats perform best for your niche.', ctaText: 'Read Guide', ctaUrl: '/guides/ad-stack-optimization-guide', backgroundColor: '#4338ca' },
    // NETWORKS
    { id: 'nt1', slotKey: 'networks_top', headline: 'Featured: PropellerAds', description: 'Multi-format network with fast approvals.', ctaText: 'Learn More', ctaUrl: '/networks/propellerads', backgroundColor: '#0891b2' },
    { id: 'ns1', slotKey: 'networks_sidebar', headline: 'Compare Networks', description: 'Side-by-side comparison of top networks.', ctaText: 'Compare', ctaUrl: '/rankings', backgroundColor: '#6d28d9' },
    // NETWORK PROFILE
    { id: 'npt1', slotKey: 'network_top', headline: 'Looking for Alternatives?', description: 'Compare this network with similar options.', ctaText: 'See Alternatives', ctaUrl: '/rankings', backgroundColor: '#9333ea' },
    { id: 'npi1', slotKey: 'network_inline', headline: 'Monetization Consultation', description: 'Get expert advice on your ad stack.', ctaText: 'Book Call', ctaUrl: '/contact', backgroundColor: '#dc2626' },
    // RANKINGS
    { id: 'rt1', slotKey: 'rankings_top', headline: 'Our Methodology', description: 'Learn how we rank and evaluate networks.', ctaText: 'Read More', ctaUrl: '/methodology', backgroundColor: '#059669' },
    { id: 'ri1', slotKey: 'rankings_inline', headline: 'Suggest a Network', description: 'Know a network we should review?', ctaText: 'Submit', ctaUrl: '/contact', backgroundColor: '#7c2d12' },
    // NEWS
    { id: 'newst1', slotKey: 'news_top', headline: 'Newsletter Signup', description: 'Weekly updates on industry news.', ctaText: 'Subscribe', ctaUrl: '#', backgroundColor: '#1d4ed8' },
    { id: 'newss1', slotKey: 'news_sidebar', headline: 'Advertise Here', description: 'Reach webmasters and publishers.', ctaText: 'Learn More', ctaUrl: '/advertise', backgroundColor: '#be123c' },
    // GUIDES
    { id: 'gt1', slotKey: 'guides_top', headline: 'Expert Guides', description: 'Deep dives into monetization strategies.', ctaText: 'Browse All', ctaUrl: '/guides', backgroundColor: '#0d9488' },
    { id: 'gs1', slotKey: 'guides_sidebar', headline: 'Free Checklist', description: 'Pre-monetization checklist for new sites.', ctaText: 'Download', ctaUrl: '/tools/pre-monetization-checklist', backgroundColor: '#a21caf' },
    // ARTICLE
    { id: 'at1', slotKey: 'article_top', headline: 'Related Networks', description: 'Networks mentioned in this article.', ctaText: 'View Networks', ctaUrl: '/networks', backgroundColor: '#0284c7' },
    { id: 'ai1', slotKey: 'article_inline', headline: 'Join Our Community', description: 'Connect with other publishers.', ctaText: 'Join', ctaUrl: '#', backgroundColor: '#4f46e5' },
    // CASE STUDIES
    { id: 'ct1', slotKey: 'case_top', headline: 'Share Your Story', description: 'Have a success story? We want to hear it.', ctaText: 'Submit', ctaUrl: '/contact', backgroundColor: '#ca8a04' },
    // TOOLS
    { id: 'tt1', slotKey: 'tools_top', headline: 'More Tools Coming', description: 'Request a tool for our next release.', ctaText: 'Request', ctaUrl: '/contact', backgroundColor: '#15803d' },
];

export function getAdForSlot(slotKey: string): AdCreative | undefined {
    const matching = ads.filter((a) => a.slotKey === slotKey);
    if (matching.length === 0) return undefined;
    if (matching.length === 1) return matching[0];
    const dayOfMonth = new Date().getDate();
    return matching[dayOfMonth % matching.length];
}

export const slotSizes: Record<string, { width: number; height: number }> = {
    home_leaderboard: { width: 728, height: 90 },
    home_inline: { width: 728, height: 90 },
    home_sidebar: { width: 300, height: 600 },
    format_top: { width: 728, height: 90 },
    format_inline: { width: 728, height: 90 },
    networks_top: { width: 728, height: 90 },
    networks_sidebar: { width: 300, height: 600 },
    network_top: { width: 728, height: 90 },
    network_inline: { width: 728, height: 90 },
    rankings_top: { width: 728, height: 90 },
    rankings_inline: { width: 728, height: 90 },
    news_top: { width: 728, height: 90 },
    news_sidebar: { width: 300, height: 600 },
    guides_top: { width: 728, height: 90 },
    guides_sidebar: { width: 300, height: 600 },
    article_top: { width: 728, height: 90 },
    article_inline: { width: 728, height: 90 },
    case_top: { width: 728, height: 90 },
    tools_top: { width: 728, height: 90 },
};
