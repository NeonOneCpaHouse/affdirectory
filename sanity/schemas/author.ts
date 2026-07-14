import { defineField, defineType } from "sanity"

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
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
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English" },
        { name: "ru", type: "text", title: "Russian" },
      ],
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "ru", type: "string", title: "Russian" },
      ],
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        {
          name: "twitter",
          type: "url",
          title: "Twitter / X",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }),
        },
        {
          name: "linkedin",
          type: "url",
          title: "LinkedIn",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }),
        },
        {
          name: "website",
          type: "url",
          title: "Website",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "role.en",
      media: "avatar",
    },
  },
})
