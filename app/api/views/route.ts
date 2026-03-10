import { NextRequest, NextResponse } from "next/server"
import { writeClient } from "@/lib/sanityWrite"

export async function POST(req: NextRequest) {
    try {
        const { slug } = await req.json()
        if (!slug) {
            return NextResponse.json({ error: "Missing slug" }, { status: 400 })
        }

        // Find the article document ID by slug
        const doc = await writeClient.fetch<{ _id: string } | null>(
            `*[_type == "article" && slug.current == $slug][0]{ _id }`,
            { slug },
        )

        if (!doc) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 })
        }

        // Increment the views field by 1
        await writeClient.patch(doc._id).inc({ views: 1 }).commit()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to increment views:", error)
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
