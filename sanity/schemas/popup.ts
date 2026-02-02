import { defineField, defineType } from "sanity"

export default defineType({
    name: "popup",
    title: "Popup",
    type: "document",
    fields: [
        defineField({
            name: "slug",
            title: "Slug",
            description: "Unique identifier for this popup (used for tracking dismissals)",
            type: "slug",
            options: {
                source: "title.en",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            description: "Enable or disable this popup",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "audience",
            title: "Target Audience",
            description: "Which audience should see this popup",
            type: "string",
            options: {
                list: [
                    { title: "Affiliate", value: "affiliate" },
                    { title: "Webmaster", value: "webmaster" },
                ],
                layout: "radio",
            },
            initialValue: "affiliate",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Logo",
            description: "Logo to display at the top of the popup",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "ru", type: "string", title: "Russian" },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Description Text",
            type: "object",
            fields: [
                { name: "en", type: "text", title: "English", rows: 3 },
                { name: "ru", type: "text", title: "Russian", rows: 3 },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "ctaText",
            title: "CTA Button Text",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "ru", type: "string", title: "Russian" },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "ctaUrl",
            title: "CTA Button URL",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title.en",
            subtitle: "audience",
            media: "logo",
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || "Untitled Popup",
                subtitle: `Audience: ${subtitle || "Not set"}`,
                media,
            }
        },
    },
})
