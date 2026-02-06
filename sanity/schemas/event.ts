import { defineField, defineType } from "sanity"

export default defineType({
    name: "event",
    title: "Events",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "object",
            fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ru", title: "Russian", type: "string" },
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
            name: "date",
            title: "Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "object",
            fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ru", title: "Russian", type: "string" },
            ],
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Affiliate", value: "Affiliate" },
                    { title: "Gambling", value: "Gambling" },
                    { title: "Betting", value: "Betting" },
                    { title: "Crypto", value: "Crypto" },
                    { title: "Marketing", value: "Marketing" },
                    { title: "Mobile", value: "Mobile" },
                    { title: "SEO", value: "SEO" },
                    { title: "Digital", value: "Digital" },
                    { title: "Management", value: "Management" },
                    { title: "Analytics", value: "Analytics" },
                    { title: "B2B", value: "B2B" },
                ],
            },
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "region",
            title: "Region",
            type: "string",
            options: {
                list: [
                    { title: "СНГ/CIS", value: "cis" },
                    { title: "Европа/Europe", value: "europe" },
                    { title: "CША/US", value: "us" },
                    { title: "Ближний Восток/Middle East", value: "middle_east" },
                    { title: "Латинская Америка/ Latin America", value: "latin_america" },
                    { title: "Азия/Asia", value: "asia" },
                    { title: "Online/Online", value: "online" },
                ],
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
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "object",
            fields: [
                {
                    name: "en",
                    title: "English",
                    type: "array",
                    of: [
                        {
                            type: "block",
                            styles: [
                                { title: "Normal", value: "normal" },
                                { title: "H2", value: "h2" },
                                { title: "H3", value: "h3" },
                                { title: "H4", value: "h4" },
                                { title: "Quote", value: "blockquote" },
                            ],
                            marks: {
                                decorators: [
                                    { title: "Bold", value: "strong" },
                                    { title: "Italic", value: "em" },
                                    { title: "Underline", value: "underline" },
                                ],
                                annotations: [
                                    {
                                        name: "link",
                                        type: "object",
                                        title: "Link",
                                        fields: [
                                            {
                                                name: "href",
                                                type: "url",
                                                title: "URL",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    name: "ru",
                    title: "Russian",
                    type: "array",
                    of: [
                        {
                            type: "block",
                            styles: [
                                { title: "Normal", value: "normal" },
                                { title: "H2", value: "h2" },
                                { title: "H3", value: "h3" },
                                { title: "H4", value: "h4" },
                                { title: "Quote", value: "blockquote" },
                            ],
                            marks: {
                                decorators: [
                                    { title: "Bold", value: "strong" },
                                    { title: "Italic", value: "em" },
                                    { title: "Underline", value: "underline" },
                                ],
                                annotations: [
                                    {
                                        name: "link",
                                        type: "object",
                                        title: "Link",
                                        fields: [
                                            {
                                                name: "href",
                                                type: "url",
                                                title: "URL",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "ticketUrl",
            title: "Ticket URL",
            type: "url",
            description: "Link to buy tickets for this event",
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "name.en",
            subtitle: "category",
            media: "coverImage",
        },
    },
})
