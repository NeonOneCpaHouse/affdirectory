import { defineField, defineType } from "sanity"

export default defineType({
    name: "service",
    title: "Service",
    type: "document",
    fields: [
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: (doc) => (doc.name as any)?.en || "",
                maxLength: 96,
            },
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
            name: "name",
            title: "Name",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "ru", type: "string", title: "Russian" },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "signupUrl",
            title: "Go to Site URL",
            type: "url",
            description: "URL for the 'Go to site' button",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Avatar / Logo",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "serviceType",
            title: "Service Type",
            type: "string",
            options: {
                list: [
                    { title: "Antidetect Browsers", value: "antidetect" },
                    { title: "Spy Tools", value: "spyTools" },
                    { title: "Proxy", value: "proxy" },
                    { title: "Trackers", value: "trackers" },
                    { title: "Payments", value: "payments" },
                    { title: "PWA Tools", value: "pwa" },
                ],
            },
            description: "Select which ranking page this service should appear on",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "trialPeriod",
            title: "Trial Period",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "ru", type: "string", title: "Russian" },
            ],
        }),
        defineField({
            name: "pricing",
            title: "Pricing",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "ru", type: "string", title: "Russian" },
            ],
        }),
        defineField({
            name: "referralProgram",
            title: "Referral Program",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "ru", type: "string", title: "Russian" },
            ],
        }),
        defineField({
            name: "websiteUrl",
            title: "Website",
            type: "url",
            description: "Displayed with a globe icon on the frontend",
        }),
        defineField({
            name: "socials",
            title: "Socials",
            type: "object",
            fields: [
                { name: "telegram", type: "url", title: "Telegram" },
                { name: "facebook", type: "url", title: "Facebook" },
                { name: "instagram", type: "url", title: "Instagram" },
                { name: "youtube", type: "url", title: "YouTube" },
                { name: "linkedin", type: "url", title: "LinkedIn" },
            ],
        }),
        defineField({
            name: "support",
            title: "Support Contacts",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "avatar",
                            title: "Manager Avatar",
                            type: "image",
                            options: { hotspot: true },
                        },
                        {
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Telegram", value: "telegram" },
                                    { title: "WhatsApp", value: "whatsapp" },
                                    { title: "Teams", value: "teams" },
                                ],
                            },
                        },
                        {
                            name: "url",
                            title: "Contact URL",
                            type: "url",
                        },
                    ],
                    preview: {
                        select: {
                            title: "platform",
                            media: "avatar",
                        },
                    },
                },
            ],
        }),
        defineField({
            name: "ratings",
            title: "Ratings",
            type: "object",
            fields: [
                {
                    name: "support",
                    title: "Support",
                    type: "number",
                    description: "How fast, reliable and friendly their support managers are",
                    validation: (Rule) => Rule.min(1).max(5),
                },
                {
                    name: "technology",
                    title: "Technology",
                    type: "number",
                    description: "How good the used technologies are",
                    validation: (Rule) => Rule.min(1).max(5),
                },
                {
                    name: "security",
                    title: "Security",
                    type: "number",
                    description: "The level of security provided",
                    validation: (Rule) => Rule.min(1).max(5),
                },
                {
                    name: "effectiveness",
                    title: "Effectiveness",
                    type: "number",
                    description: "Overall effectiveness of the service",
                    validation: (Rule) => Rule.min(1).max(5),
                },
            ],
        }),
        defineField({
            name: "pros",
            title: "Pros",
            type: "object",
            fields: [
                { name: "en", type: "array", of: [{ type: "string" }], title: "English" },
                { name: "ru", type: "array", of: [{ type: "string" }], title: "Russian" },
            ],
        }),
        defineField({
            name: "cons",
            title: "Cons",
            type: "object",
            fields: [
                { name: "en", type: "array", of: [{ type: "string" }], title: "English" },
                { name: "ru", type: "array", of: [{ type: "string" }], title: "Russian" },
            ],
        }),
        defineField({
            name: "review",
            title: "Review",
            type: "object",
            fields: [
                {
                    name: "en",
                    title: "English",
                    type: "array",
                    of: [{ type: "block" }],
                },
                {
                    name: "ru",
                    title: "Russian",
                    type: "array",
                    of: [{ type: "block" }],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "name.en",
            subtitle: "serviceType",
            media: "logo",
        },
    },
})
