import { defineField, defineType } from "sanity"

export default defineType({
    name: "articleTag",
    title: "Article Tag",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Tag Name",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "ru", type: "string", title: "Russian" },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name.en",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "audience",
            title: "Audience",
            type: "string",
            options: {
                list: [
                    { title: "Affiliate", value: "affiliate" },
                    { title: "Webmaster", value: "webmaster" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "News / Новости", value: "news" },
                    { title: "Reviews / Обзоры", value: "reviews" },
                    { title: "Case Studies / Кейсы", value: "case-studies" },
                    { title: "Guides / Гайды", value: "guides" },
                    { title: "Trends / Тренды", value: "trends" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            nameEn: "name.en",
            nameRu: "name.ru",
            audience: "audience",
            category: "category",
        },
        prepare({ nameEn, nameRu, audience, category }) {
            return {
                title: `${nameEn || "Untitled"}${nameRu ? ` / ${nameRu}` : ""}`,
                subtitle: `${audience || "—"} → ${category || "—"}`,
            }
        },
    },
})
