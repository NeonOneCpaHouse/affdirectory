import { defineField, defineType } from "sanity"

type ArticleTagValidationContext = {
    document?: {
        _id?: string
        audience?: string
    }
    getClient: (options: { apiVersion: string }) => {
        fetch: (query: string, params: Record<string, string>) => Promise<number>
    }
}

async function isUniquePerAudience(
    slug: { current?: string } | undefined,
    context: ArticleTagValidationContext,
) {
    const audience = context.document?.audience
    const currentSlug = slug?.current

    if (!audience || !currentSlug) {
        return true
    }

    const client = context.getClient({ apiVersion: "2024-01-01" })
    const documentId = context.document?._id?.replace(/^drafts\./, "")

    if (!documentId) {
        return true
    }

    const params = {
        audience,
        slug: currentSlug,
        draftId: `drafts.${documentId}`,
        publishedId: documentId,
    }

    const duplicateCount = await client.fetch(
        `count(*[
            _type == "articleTag" &&
            audience == $audience &&
            slug.current == $slug &&
            !(_id in [$draftId, $publishedId])
        ])`,
        params,
    )

    return duplicateCount === 0 || "A tag with this slug already exists for the selected audience."
}

export default defineType({
    name: "articleTag",
    title: "Article Tag",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Tag Name",
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
            validation: (Rule) => Rule.required().custom(isUniquePerAudience),
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
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            nameEn: "name.en",
            nameRu: "name.ru",
            audience: "audience",
        },
        prepare({ nameEn, nameRu, audience }) {
            return {
                title: `${nameEn || "Untitled"}${nameRu ? ` / ${nameRu}` : ""}`,
                subtitle: audience || "—",
            }
        },
    },
})
