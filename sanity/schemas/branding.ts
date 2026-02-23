import { defineField, defineType } from "sanity"

export default defineType({
    name: "branding",
    title: "Branding Logo",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title (Internal)",
            type: "string",
            description: "Internal name for this branding config (e.g. Winline - Affiliate)",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "audience",
            title: "Target Audience",
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
            title: "Partner Logo",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "url",
            title: "Destination URL",
            type: "url",
            description: "Where the user should be taken when clicking the logo",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "audience",
            media: "logo",
        },
    },
})
