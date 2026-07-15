import { defineField, defineType } from "sanity"

function createTextBlock(isRussian: boolean): any {
  return {
    type: "block",
    styles: [
      { title: isRussian ? "Обычный" : "Normal", value: "normal" },
      { title: "H1", value: "h1" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: isRussian ? "Цитата" : "Quote", value: "blockquote" },
    ],
    lists: [
      { title: isRussian ? "Маркер" : "Bullet", value: "bullet" },
      { title: isRussian ? "Номер" : "Number", value: "number" },
    ],
    marks: {
      decorators: [
        { title: isRussian ? "Жирный" : "Strong", value: "strong" },
        { title: isRussian ? "Курсив" : "Emphasis", value: "em" },
        { title: isRussian ? "Код" : "Code", value: "code" },
        { title: isRussian ? "Подчеркнутый" : "Underline", value: "underline" },
        { title: isRussian ? "Зачеркнутый" : "Strike", value: "strike-through" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: isRussian ? "Внешняя ссылка" : "External Link",
          fields: [
            {
              name: "href",
              type: "url",
              title: "URL",
              validation: (Rule: any) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            },
            {
              name: "blank",
              type: "boolean",
              title: isRussian ? "Открыть в новой вкладке" : "Open in new tab",
              initialValue: true,
            },
          ],
        },
      ],
    },
  }
}

function createImageBlock(isRussian: boolean): any {
  return {
    type: "image",
    options: {
      hotspot: true,
    },
    fields: [
      {
        name: "alt",
        type: "string",
        title: isRussian ? "Альтернативный текст" : "Alt Text",
        description: isRussian ? "Важно для SEO и доступности" : "Important for SEO and accessibility",
      },
      {
        name: "caption",
        type: "string",
        title: isRussian ? "Подпись" : "Caption",
      },
      {
        name: "link",
        type: "url",
        title: isRussian ? "URL ссылки" : "Link URL",
        description: isRussian
          ? "Необязательно: Сделать изображение кликабельным"
          : "Optional: Make the image clickable",
      },
    ],
  }
}

function createTableBlock(isRussian: boolean): any {
  return {
    type: "object",
    name: "articleTable",
    title: isRussian ? "Таблица" : "Table",
    fields: [
      defineField({
        name: "caption",
        type: "string",
        title: isRussian ? "Подпись таблицы" : "Table Caption",
      }),
      defineField({
        name: "firstRowIsHeader",
        type: "boolean",
        title: isRussian ? "Первая строка — заголовок" : "Use First Row as Header",
        initialValue: true,
      }),
      defineField({
        name: "rows",
        type: "array",
        title: isRussian ? "Строки" : "Rows",
        of: [
          {
            type: "object",
            name: "articleTableRow",
            title: isRussian ? "Строка" : "Row",
            fields: [
              defineField({
                name: "cells",
                type: "array",
                title: isRussian ? "Ячейки" : "Cells",
                of: [{ type: "string" }],
                validation: (Rule: any) => Rule.required().min(1),
              }),
            ],
            preview: {
              select: {
                cells: "cells",
              },
              prepare({ cells }: { cells?: string[] }) {
                const previewCells = (cells || []).filter(Boolean).slice(0, 3).join(" | ")
                return {
                  title: previewCells || (isRussian ? "Пустая строка" : "Empty row"),
                  subtitle: `${cells?.length || 0} ${isRussian ? "ячеек" : "cells"}`,
                }
              },
            },
          },
        ],
        validation: (Rule: any) => Rule.required().min(1),
      }),
    ],
    preview: {
      select: {
        caption: "caption",
        rows: "rows",
      },
      prepare({ caption, rows }: { caption?: string; rows?: Array<{ cells?: string[] }> }) {
        const rowCount = rows?.length || 0
        const columnCount = rows?.reduce((max, row) => Math.max(max, row?.cells?.length || 0), 0) || 0

        return {
          title: caption || (isRussian ? "Таблица" : "Table"),
          subtitle: `${rowCount} ${isRussian ? "строк" : "rows"} x ${columnCount} ${isRussian ? "столбцов" : "columns"}`,
        }
      },
    },
    validation: (Rule: any) =>
      Rule.custom((value?: { rows?: Array<{ cells?: string[] }> }) => {
        if (!value?.rows || value.rows.length === 0) {
          return true
        }

        const expectedColumns = value.rows[0]?.cells?.length || 0
        const hasMismatchedRow = value.rows.some((row) => (row?.cells?.length || 0) !== expectedColumns)

        if (hasMismatchedRow) {
          return isRussian
            ? "Во всех строках должно быть одинаковое количество ячеек."
            : "Every row must contain the same number of cells."
        }

        return true
      }),
  }
}

function createEditorNoteBlock(isRussian: boolean): any {
  return {
    type: "object",
    name: "editorNote",
    title: isRussian ? "Мнение редакции" : "Editor's Note",
    fields: [
      defineField({
        name: "noteType",
        type: "string",
        title: isRussian ? "Тип заметки" : "Note Type",
        options: {
          list: [
            { title: isRussian ? "Мнение редакции" : "Editor's Note", value: "editors_note" },
            { title: isRussian ? "Мнение AffTraff" : "AffTraff Opinion", value: "afftraff_opinion" },
            { title: isRussian ? "Наш опыт" : "Our Experience", value: "our_experience" },
          ],
          layout: "radio",
        },
        initialValue: "editors_note",
        validation: (Rule: any) => Rule.required(),
      }),
      defineField({
        name: "text",
        type: "text",
        title: isRussian ? "Текст заметки" : "Note Text",
        rows: 4,
        validation: (Rule: any) => Rule.required(),
      }),
    ],
    preview: {
      select: {
        noteType: "noteType",
        text: "text",
      },
      prepare({ noteType, text }: { noteType?: string; text?: string }) {
        const labels: Record<string, string> = {
          editors_note: isRussian ? "Мнение редакции" : "Editor's Note",
          afftraff_opinion: isRussian ? "Мнение AffTraff" : "AffTraff Opinion",
          our_experience: isRussian ? "Наш опыт" : "Our Experience",
        }
        return {
          title: labels[noteType || "editors_note"] || (isRussian ? "Заметка" : "Note"),
          subtitle: text ? (text.length > 80 ? text.slice(0, 80) + "…" : text) : "",
        }
      },
    },
  }
}

function createBodyLocaleField(name: "en" | "ru", title: string, isRussian: boolean) {
  return defineField({
    name,
    type: "array",
    title,
    of: [createTextBlock(isRussian), createImageBlock(isRussian), createTableBlock(isRussian), createEditorNoteBlock(isRussian)],
  })
}

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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "News / Новости", value: "news" },
          { title: "Reviews / Обзоры", value: "reviews" },
          { title: "Case Studies / Кейсы", value: "case-studies" },
          { title: "Guides / Гайды", value: "guides" },
          { title: "Trends / Тренды", value: "trends" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "articleTag" }],
          options: {
            filter: ({ document }: { document?: { audience?: string } }) => {
              const audience = document?.audience
              if (audience) {
                return {
                  filter: "audience == $audience",
                  params: { audience },
                }
              }
              return {}
            },
          },
        },
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
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
        createBodyLocaleField("en", "English", false),
        createBodyLocaleField("ru", "Russian", true),
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
      audience: "audience",
      category: "category",
    },
    prepare({ title, audience, category }) {
      const categoryLabels: Record<string, string> = {
        news: "News",
        reviews: "Reviews",
        "case-studies": "Case Studies",
        guides: "Guides",
        trends: "Trends",
      }
      return {
        title: title || "Untitled",
        subtitle: `${audience || "—"} → ${categoryLabels[category] || category || "—"}`,
      }
    },
  },
})
