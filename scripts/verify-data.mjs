import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

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

async function verify() {
    const affiliateCount = await client.fetch('count(*[_type == "article" && audience == "affiliate"])')
    const webmasterCount = await client.fetch('count(*[_type == "article" && audience == "webmaster"])')

    console.log('Affiliate Articles:', affiliateCount)
    console.log('Webmaster Articles:', webmasterCount)

    const sample = await client.fetch('*[_type == "article" && audience == "webmaster"][0]{title, slug}')
    console.log('Sample Webmaster Article:', sample)
}

verify().catch(console.error)
