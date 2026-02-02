"use server"

import { searchArticles } from "@/mock/articles"

export async function searchArticlesAction(query: string, audience: string, language: string) {
    if (!query || query.length < 2) return []
    return await searchArticles(query, audience, language)
}
