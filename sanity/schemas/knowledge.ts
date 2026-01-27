import { defineField, defineType } from "sanity"

export const knowledge = defineType({
  name: "knowledge",
  title: "Knowledge Base",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ru", title: "Russian", type: "string" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Traffic & Audience", value: "traffic" },
          { title: "Monetization Models", value: "monetization-models" },
          { title: "Ad Formats", value: "ad-formats" },
          { title: "Metrics", value: "metrics" },
          { title: "Ad Networks", value: "ad-networks" },
          { title: "Technical Terms", value: "technical" },
          { title: "Webmaster Terms", value: "webmaster" },
          { title: "Financial Terms", value: "financial" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Thumbnail",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "ru",
          title: "Russian Thumbnail",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Content",
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
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                  { title: "Code", value: "code" },
                  { title: "Underline", value: "underline" },
                  { title: "Strike", value: "strike-through" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    title: "Link",
                    fields: [{ name: "href", type: "url", title: "URL" }],
                  },
                ],
              },
            },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                },
                {
                  name: "caption",
                  type: "string",
                  title: "Caption",
                },
              ],
            },
          ],
        },
        {
          name: "ru",
          title: "Russian Content",
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
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                  { title: "Code", value: "code" },
                  { title: "Underline", value: "underline" },
                  { title: "Strike", value: "strike-through" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    title: "Link",
                    fields: [{ name: "href", type: "url", title: "URL" }],
                  },
                ],
              },
            },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                },
                {
                  name: "caption",
                  type: "string",
                  title: "Caption",
                },
              ],
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      category: "category",
    },
    prepare({ title, category }) {
      return {
        title: title || "Untitled",
        subtitle: category ? `Knowledge: ${category}` : "Knowledge Base",
      }
    },
  },
})
