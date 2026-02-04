import AdSlot from '@/components/AdSlot';

const inventory = [
    { key: 'leaderboard', location: 'Top of all pages', size: '728x90' },
    { key: 'inline', location: 'Middle of content area on all pages', size: '336x280 / 800x90' },
    { key: 'sidebar', location: 'Sidebar on all pages', size: '300x600' },
];

export default function AdvertisePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <section className="mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Advertise with AffTraff</h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">Reach thousands of webmasters, publishers, and digital marketers who trust our directory for monetization insights.</p>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Advertise With Us?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                                <div className="text-3xl mb-4">🎯</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Targeted Audience</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Our readers are actively searching for monetization solutions and comparing ad networks.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                                <div className="text-3xl mb-4">📈</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">High Intent Traffic</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Visitors are decision-makers looking to partner with new networks and implement new formats.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                                <div className="text-3xl mb-4">🏆</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Industry Authority</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Position your brand alongside trusted rankings and educational content.</p>
                            </div>
                        </div>
                    </section>

                    <div className="mb-16">
                        <AdSlot slotKey="inline" />
                    </div>

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

                    <section className="text-center bg-sky-600 dark:bg-blue-600 rounded-2xl p-12 shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
                        <p className="text-sky-100 dark:text-blue-100 mb-6">Contact us to discuss custom sponsorship packages and pricing.</p>
                        <button className="bg-white text-sky-600 dark:text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-sky-50 dark:hover:bg-blue-50 transition-colors">Contact Us →</button>
                    </section>
                </div>

                <aside className="w-full lg:w-[300px]">
                    <div className="sticky top-8 space-y-8">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    );
}
