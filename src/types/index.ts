import { Language } from "@/context/LanguageContext";

export type Localized<T> = Record<Language, T>;

// Helper to extract localized string
export function getLocalized<T>(item: Localized<T>, lang: Language): T {
    return item[lang];
}
