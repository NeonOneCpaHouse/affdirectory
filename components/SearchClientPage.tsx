"use client"

import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import ArticleCard from "@/components/ArticleCard"
import type { Article } from "@/mock/articles"
import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import { Search } from "lucide-react"

interface SearchClientPageProps {
    articles: Article[]
    query: string
}

export default function SearchClientPage({ articles, query }: SearchClientPageProps) {
    const { t, language } = useLanguage()
    const { audience } = useAudience()

    const getPath = (path: string) => `/${language}/${audience}${path}`

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === "ru" ? "Результаты поиска" : "Search Results"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {language === "ru"
                        ? `По запросу "${query}" найдено ${articles.length} материалов`
                        : `Found ${articles.length} results for "${query}"`}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    {articles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <ArticleCard key={article.slug} article={article} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {language === "ru" ? "Ничего не найдено" : "No results found"}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                {language === "ru"
                                    ? "Попробуйте изменить поисковый запрос или проверьте написание."
                                    : "Try distinct search terms or check for spelling errors."}
                            </p>
                            <Link
                                href={getPath("/")}
                                className="inline-flex items-center justify-center px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-xl transition-colors"
                            >
                                {language === "ru" ? "Вернуться на главную" : "Back to Home"}
                            </Link>
                        </div>
                    )}
                </div>

                <aside className="w-full lg:w-[300px]">
                    <div className="sticky top-24 space-y-8">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    )
}
