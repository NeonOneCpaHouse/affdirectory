"use client"

import type { ArticleAuthor } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"
import { Twitter, Linkedin, Instagram, Send, Globe } from "lucide-react"

interface ArticleAuthorBioProps {
  author: ArticleAuthor
}

export default function ArticleAuthorBio({ author }: ArticleAuthorBioProps) {
  const { language, t } = useLanguage()

  const name = author.name[language] || author.name.en
  const bio = author.bio?.[language] || author.bio?.en
  const role = author.role?.[language] || author.role?.en
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const hasSocials = author.social?.twitter || author.social?.linkedin || author.social?.instagram || author.social?.telegram || author.social?.website

  return (
    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
        {language === "ru" ? "Об авторе" : "About the Author"}
      </p>
      <div className="flex items-start gap-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 p-6">
        {/* Avatar */}
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 shadow-sm flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white text-lg font-bold ring-2 ring-white dark:ring-gray-700 shadow-sm flex-shrink-0">
            {initials}
          </div>
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              {name}
            </h3>
            {role && (
              <span className="text-sm font-medium text-accent-600 dark:text-accent-400">
                {role}
              </span>
            )}
          </div>

          {bio && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
              {bio}
            </p>
          )}

          {hasSocials && (
            <div className="mt-3 flex items-center gap-3">
              {author.social?.twitter && (
                <a
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  aria-label={`${name} on Twitter`}
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {author.social?.linkedin && (
                <a
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  aria-label={`${name} on LinkedIn`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {author.social?.instagram && (
                <a
                  href={author.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  aria-label={`${name} on Instagram`}
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {author.social?.telegram && (
                <a
                  href={author.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  aria-label={`${name} on Telegram`}
                >
                  <Send className="h-4 w-4" />
                </a>
              )}
              {author.social?.website && (
                <a
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  aria-label={`${name}'s website`}
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
