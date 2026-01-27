import AdSlot from '@/components/AdSlot';

const inventory = [
    { key: 'home_leaderboard', location: 'Homepage top', size: '728x90' },
    { key: 'home_inline', location: 'Homepage mid-content', size: '336x280' },
    { key: 'home_sidebar', location: 'Homepage sidebar', size: '300x600' },
    { key: 'format_top', location: 'Format pages', size: '728x90' },
    { key: 'format_inline', location: 'Format pages', size: '336x280' },
    { key: 'networks_top', location: 'Networks directory', size: '728x90' },
    { key: 'networks_sidebar', location: 'Networks directory sidebar', size: '300x600' },
    { key: 'network_top', location: 'Network profiles', size: '728x90' },
    { key: 'network_inline', location: 'Network profiles', size: '336x280' },
    { key: 'rankings_top', location: 'Rankings pages', size: '728x90' },
    { key: 'rankings_inline', location: 'Rankings pages', size: '336x280' },
    { key: 'news_top', location: 'News listing', size: '728x90' },
    { key: 'news_sidebar', location: 'News sidebar', size: '300x600' },
    { key: 'guides_top', location: 'Guides listing', size: '728x90' },
    { key: 'guides_sidebar', location: 'Guides sidebar', size: '300x600' },
    { key: 'article_top', location: 'Article/Guide pages', size: '728x90' },
    { key: 'article_inline', location: 'Article/Guide pages', size: '336x280' },
    { key: 'case_top', location: 'Case studies', size: '728x90' },
    { key: 'tools_top', location: 'Tools hub', size: '728x90' },
];

export default function AdvertisePage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <section className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Advertise with AdDirectory</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Reach thousands of webmasters, publishers, and digital marketers who trust our directory for monetization insights.</p>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Advertise With Us?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                        <div className="text-3xl mb-4">🎯</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Targeted Audience</h3>
                        <p className="text-gray-500 dark:text-gray-400">Our readers are actively searching for monetization solutions and comparing ad networks.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                        <div className="text-3xl mb-4">📈</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">High Intent Traffic</h3>
                        <p className="text-gray-500 dark:text-gray-400">Visitors are decision-makers looking to partner with new networks and implement new formats.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                        <div className="text-3xl mb-4">🏆</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Industry Authority</h3>
                        <p className="text-gray-500 dark:text-gray-400">Position your brand alongside trusted rankings and educational content.</p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ad Inventory</h2>
                <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-sky-200 dark:border-gray-700">
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Slot</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Location</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Size</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-100 dark:divide-gray-700/50">
                            {inventory.map((slot) => (
                                <tr key={slot.key} className="hover:bg-sky-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4 text-gray-900 dark:text-white font-mono text-sm">{slot.key}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{slot.location}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{slot.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Example Placements</h2>
                <div className="space-y-8">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">Leaderboard (728x90)</p>
                        <AdSlot slotKey="leaderboard" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-3">Inline Rectangle (336x280)</p>
                            <AdSlot slotKey="inline" />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-3">Sidebar (300x600)</p>
                            <AdSlot slotKey="sidebar" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-center bg-sky-600 dark:bg-blue-600 rounded-2xl p-12 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-sky-100 dark:text-blue-100 mb-6">Contact us to discuss custom sponsorship packages and pricing.</p>
                <button className="bg-white text-sky-600 dark:text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-sky-50 dark:hover:bg-blue-50 transition-colors">Contact Us →</button>
            </section>
        </div>
    );
}
