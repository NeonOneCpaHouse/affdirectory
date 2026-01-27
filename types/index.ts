import type { Language } from "@/context/LanguageContext"

export type Localized<T> = Record<Language, T>

export function getLocalized<T>(item: Localized<T>, lang: Language): T {
  return item[lang] || item["en"]
}
