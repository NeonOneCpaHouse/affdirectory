import { defineField, defineType } from "sanity"

export default defineType({
    name: "job",
    title: "Job Vacancy",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Job Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "companyName",
            title: "Company Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "companyLogo",
            title: "Company Logo",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "position",
            title: "Position",
            type: "string",
            options: {
                list: [
                    { title: "HR", value: "hr" },
                    { title: "SMM", value: "smm" },
                    { title: "Copywriter", value: "copywriter" },
                    { title: "SEO Specialist", value: "seo" },
                    { title: "Designer", value: "designer" },
                    { title: "Marketing", value: "marketing" },
                    { title: "PR", value: "pr" },
                    { title: "Affiliate Manager", value: "affiliate_manager" },
                    { title: "Sales Manager", value: "sales_manager" },
                    { title: "Project Manager", value: "project_manager" },
                    { title: "Account Manager", value: "account_manager" },
                    { title: "Farmer", value: "farmer" },
                    { title: "Technical Specialist", value: "tech_specialist" },
                    { title: "Media Buyer", value: "media_buyer" },
                    { title: "Business Developer", value: "bizdev" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "level",
            title: "Level",
            type: "string",
            options: {
                list: [
                    { title: "Junior", value: "junior" },
                    { title: "Middle", value: "middle" },
                    { title: "Senior", value: "senior" },
                    { title: "Team-Lead", value: "team_lead" },
                    { title: "+ C-Level", value: "c_level" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "experience",
            title: "Experience",
            type: "string",
            options: {
                list: [
                    { title: "No experience", value: "no_experience" },
                    { title: "1 year", value: "1_year" },
                    { title: "2 years", value: "2_years" },
                    { title: "3 years", value: "3_years" },
                    { title: "3+ years", value: "3_plus_years" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "salary",
            title: "Salary",
            type: "string",
            options: {
                list: [
                    { title: "After Interview", value: "after_interview" },
                    { title: "500-1000$", value: "500-1000" },
                    { title: "1000-2500$", value: "1000-2500" },
                    { title: "3500-4500$", value: "3500-4500" },
                    { title: "4500-5000$", value: "4500-5000" },
                    { title: "5000$+", value: "5000_plus" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "ctaUrl",
            title: "CTA URL",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "ctaText",
            title: "CTA Text",
            type: "string",
            initialValue: "Apply Now",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "aboutCompany",
            title: "About Company",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            options: {
                list: [
                    { title: "Remote", value: "remote" },
                    { title: "Office", value: "office" },
                    { title: "Hybrid", value: "hybrid" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "requirements",
            title: "Requirements",
            type: "text",
            rows: 6,
        }),
        defineField({
            name: "responsibilities",
            title: "Responsibilities",
            type: "text",
            rows: 6,
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
            name: "language",
            title: "Language",
            type: "string",
            options: {
                list: [
                    { title: "English", value: "en" },
                    { title: "Russian", value: "ru" },
                ],
                layout: "radio",
            },
            initialValue: "en",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "companyName",
            media: "companyLogo",
        },
    },
})
