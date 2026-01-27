import { defineField, defineType } from "sanity"

export default defineType({
  name: "network",
  title: "Network",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
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
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      description: "Main website URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "signupUrl",
      title: "Signup URL",
      type: "url",
      description: "Publisher signup URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formatsSupported",
      title: "Formats Supported",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Web Push", value: "webPush" },
          { title: "Popunder", value: "popunder" },
          { title: "In-Page Push", value: "inPagePush" },
          { title: "Banner", value: "banner" },
          { title: "Telegram", value: "telegram" },
          { title: "Display", value: "display" },
          { title: "Native", value: "native" },
          { title: "Mobile", value: "mobile" },
          { title: "Video", value: "video" },
          { title: "Domain Redirect", value: "domainRedirect" },
          { title: "Interstitial", value: "interstitial" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "geos",
      title: "GEOs",
      type: "object",
      fields: [
        { name: "en", type: "array", of: [{ type: "string" }], title: "English" },
        { name: "ru", type: "array", of: [{ type: "string" }], title: "Russian" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "payoutFrequency",
      title: "Payout Frequency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "minPayout",
      title: "Minimum Payout",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paymentMethods",
      title: "Payment Methods",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ratingsByFormat",
      title: "Ratings by Format",
      type: "object",
      fields: [
        {
          name: "webPush",
          title: "Web Push",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "popunder",
          title: "Popunder",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "inPagePush",
          title: "In-Page Push",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "banner",
          title: "Banner",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "telegram",
          title: "Telegram",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "display",
          title: "Display",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "native",
          title: "Native",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "mobile",
          title: "Mobile",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "video",
          title: "Video",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "domainRedirect",
          title: "Domain Redirect",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
        {
          name: "interstitial",
          title: "Interstitial",
          type: "object",
          fields: [
            { name: "overall", type: "number" },
            { name: "stability", type: "number" },
            { name: "support", type: "number" },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pros",
      title: "Pros",
      type: "object",
      fields: [
        { name: "en", type: "array", of: [{ type: "string" }], title: "English" },
        { name: "ru", type: "array", of: [{ type: "string" }], title: "Russian" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cons",
      title: "Cons",
      type: "object",
      fields: [
        { name: "en", type: "array", of: [{ type: "string" }], title: "English" },
        { name: "ru", type: "array", of: [{ type: "string" }], title: "Russian" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "editorialNote",
      title: "Editorial Note",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English" },
        { name: "ru", type: "text", title: "Russian" },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
})
