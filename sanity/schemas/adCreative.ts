import { defineField, defineType } from "sanity"

export default defineType({
  name: "adCreative",
  title: "Ad Creative",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Name",
      description: "Name for identifying this banner in the Studio (not visible on the site).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slotKey",
      title: "Slot Key",
      type: "string",
      options: {
        list: [
          { title: "Leaderboard (728x90 / 320x50)", value: "leaderboard" },
          { title: "Inline (800x90 / 320x50)", value: "inline" },
          { title: "Sidebar (300x600 / 300x250)", value: "sidebar" },
        ],
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
      name: "ctaUrl",
      title: "Destination URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "targeting",
      title: "Targeting",
      type: "object",
      fields: [
        { name: "format", type: "string", title: "Format" },
        { name: "category", type: "string", title: "Category" },
        { name: "page", type: "string", title: "Page" },
      ],
    }),
    defineField({
      name: "desktopImage",
      title: "Desktop Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slotKey",
      media: "desktopImage",
    },
  },
})
