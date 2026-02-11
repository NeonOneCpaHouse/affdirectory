import { defineField, defineType } from "sanity"

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "Guide", value: "guide" },
          { title: "Case Study", value: "case" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          // Blog categories
          { title: "News", value: "news" },
          { title: "Case Studies", value: "case-studies" },
          { title: "Google", value: "google" },
          { title: "Monetization", value: "monetization" },
          { title: "SEO", value: "seo" },
          { title: "Tools", value: "tools" },
          { title: "AI", value: "ai" },
          // Guide categories
          { title: "Monetization Formats", value: "monetization-formats" },
          { title: "Optimization", value: "optimization" },
          { title: "Technical", value: "technical" },
          { title: "Scaling", value: "scaling" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "object",
      fields: [
        {
          name: "en",
          type: "image",
          title: "English Thumbnail",
          options: {
            hotspot: true,
          },
        },
        {
          name: "ru",
          type: "image",
          title: "Russian Thumbnail",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English" },
        { name: "ru", type: "text", title: "Russian" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        {
          name: "en",
          type: "array",
          title: "English",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H1", value: "h1" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Number", value: "number" },
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
                    title: "External Link",
                    fields: [
                      {
                        name: "href",
                        type: "url",
                        title: "URL",
                        validation: (Rule) =>
                          Rule.uri({
                            scheme: ["http", "https", "mailto", "tel"],
                          }),
                      },
                      {
                        name: "blank",
                        type: "boolean",
                        title: "Open in new tab",
                        initialValue: true,
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alt Text",
                  description: "Important for SEO and accessibility",
                },
                {
                  name: "caption",
                  type: "string",
                  title: "Caption",
                },
                {
                  name: "link",
                  type: "url",
                  title: "Link URL",
                  description: "Optional: Make the image clickable",
                },
              ],
            },
          ],
        },
        {
          name: "ru",
          type: "array",
          title: "Russian",
          of: [
            {
              type: "block",
              styles: [
                { title: "Обычный", value: "normal" },
                { title: "H1", value: "h1" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Цитата", value: "blockquote" },
              ],
              lists: [
                { title: "Маркер", value: "bullet" },
                { title: "Номер", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Жирный", value: "strong" },
                  { title: "Курсив", value: "em" },
                  { title: "Код", value: "code" },
                  { title: "Подчеркнутый", value: "underline" },
                  { title: "Зачеркнутый", value: "strike-through" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    title: "Внешняя ссылка",
                    fields: [
                      {
                        name: "href",
                        type: "url",
                        title: "URL",
                        validation: (Rule) =>
                          Rule.uri({
                            scheme: ["http", "https", "mailto", "tel"],
                          }),
                      },
                      {
                        name: "blank",
                        type: "boolean",
                        title: "Открыть в новой вкладке",
                        initialValue: true,
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Альтернативный текст",
                  description: "Важно для SEO и доступности",
                },
                {
                  name: "caption",
                  type: "string",
                  title: "Подпись",
                },
                {
                  name: "link",
                  type: "url",
                  title: "URL ссылки",
                  description: "Необязательно: Сделать изображение кликабельным",
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "checklist",
      title: "Checklist",
      type: "object",
      fields: [
        { name: "en", type: "array", of: [{ type: "string" }], title: "English" },
        { name: "ru", type: "array", of: [{ type: "string" }], title: "Russian" },
      ],
    }),
    defineField({
      name: "caseStudySections",
      title: "Case Study Sections",
      type: "object",
      fields: [
        {
          name: "en",
          type: "object",
          title: "English",
          fields: [
            { name: "setup", type: "text", title: "Setup" },
            { name: "traffic", type: "text", title: "Traffic" },
            { name: "placements", type: "text", title: "Placements" },
            { name: "results", type: "text", title: "Results" },
            { name: "lessons", type: "text", title: "Lessons" },
          ],
        },
        {
          name: "ru",
          type: "object",
          title: "Russian",
          fields: [
            { name: "setup", type: "text", title: "Настройка" },
            { name: "traffic", type: "text", title: "Трафик" },
            { name: "placements", type: "text", title: "Размещения" },
            { name: "results", type: "text", title: "Результаты" },
            { name: "lessons", type: "text", title: "Уроки" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "type",
    },
  },
})
