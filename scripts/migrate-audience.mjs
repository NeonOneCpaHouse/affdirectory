import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const TYPES_TO_MIGRATE = ['article', 'network', 'adCreative', 'knowledge']

async function migrate() {
    console.log('Starting migration...')

    for (const type of TYPES_TO_MIGRATE) {
        console.log(`Processing type: ${type}`)
        const documents = await client.fetch(`*[_type == "${type}"]`)

        for (const doc of documents) {
            // 1. Update existing document to be 'affiliate'
            // Only update if not already set to avoid re-running issues
            if (doc.audience !== 'affiliate') {
                await client.patch(doc._id).set({ audience: 'affiliate' }).commit()
                console.log(`Updated ${doc._id} to affiliate`)
            }

            // 2. Create webmaster copy
            // Check if copy already exists to avoid duplicates
            const webmasterSlug = doc.slug?.current ? `${doc.slug.current}-webmaster` : undefined

            // Skip if it's already a webmaster copy (safety check)
            if (doc.slug?.current?.endsWith('-webmaster')) {
                continue
            }

            const existingCopyQuery = webmasterSlug
                ? `*[_type == "${type}" && slug.current == "${webmasterSlug}"][0]`
                : `*[_type == "${type}" && audience == "webmaster" && title.en == "${doc.title?.en}"][0]` // Fallback for docs without slug if any

            const existingCopy = await client.fetch(existingCopyQuery)

            if (!existingCopy) {
                const newDoc = {
                    ...doc,
                    _id: `drafts.${doc._id}-webmaster`, // Create as draft first or direct? Let's do direct but unique ID
                    _id: undefined, // Let Sanity generate ID or use deterministic? Let's let Sanity generate to be safe, or use deterministic
                    audience: 'webmaster',
                    slug: webmasterSlug ? { current: webmasterSlug, _type: 'slug' } : undefined
                }

                // Remove system fields
                delete newDoc._createdAt
                delete newDoc._updatedAt
                delete newDoc._rev

                await client.create(newDoc)
                console.log(`Created webmaster copy for ${doc._id}`)
            } else {
                console.log(`Webmaster copy already exists for ${doc._id}`)
            }
        }
    }

    console.log('Migration complete!')
}

migrate().catch(console.error)
