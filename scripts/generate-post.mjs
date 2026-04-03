#!/usr/bin/env node
/**
 * generate-post.mjs
 * Generates a Romandy CTO blog post using Claude API + DALL-E cover image.
 * Run: node scripts/generate-post.mjs
 * Requires: ANTHROPIC_API_KEY env var
 * Optional: OPENAI_API_KEY env var (enables DALL-E cover image generation)
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const ROOT       = path.join(__dirname, '..')
const BLOG_DIR   = path.join(ROOT, 'content/blog')
const IMG_DIR    = path.join(ROOT, 'public/blog')
const TOPICS_PATH = path.join(__dirname, 'topics.json')

const COVER_IMAGES = ['/agentic10.webp', '/agentic12.png', '/conversations4.gif']

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70)
}

function assignCoverImage(slug) {
  let hash = 0
  for (const c of slug) hash = (hash * 31 + c.charCodeAt(0)) & 0x7fffffff
  return COVER_IMAGES[hash % COVER_IMAGES.length]
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const client = url.startsWith('https') ? https : http
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(dest)
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject)
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

async function generateCoverImage(topic, title, slug) {
  if (!process.env.OPENAI_API_KEY) {
    console.log('No OPENAI_API_KEY — skipping cover image generation')
    return null
  }

  const dallePrompt = `Conceptual collage illustration for a technology leadership article titled "${title}" about ${topic}. Style: minimalist editorial / surreal photomontage. Visual language: symbolic, metaphor-driven composition. Aesthetic: Bauhaus minimalism × contemporary branding × magazine art direction. Color strategy: monochrome base (dark charcoal and white) with a single accent color (warm amber / burnt orange #C8834A). No text or typography in the image. Purpose: thought leadership / intellectual positioning visual. The image should be abstract and conceptual, not literal.`

  console.log('Calling DALL-E 3 for cover image…')
  const body = JSON.stringify({
    model: 'dall-e-3',
    prompt: dallePrompt,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
  })

  const imageUrl = await new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.openai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          if (json.error) return reject(new Error(json.error.message))
          resolve(json.data[0].url)
        } catch (e) { reject(e) }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })

  fs.mkdirSync(IMG_DIR, { recursive: true })
  const imgPath = path.join(IMG_DIR, `${slug}.png`)
  await downloadFile(imageUrl, imgPath)
  console.log(`✓ Cover image saved: public/blog/${slug}.png`)
  return `/blog/${slug}.png`
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set')
    process.exit(1)
  }

  const client = new Anthropic()
  const topics = JSON.parse(fs.readFileSync(TOPICS_PATH, 'utf-8'))

  fs.mkdirSync(BLOG_DIR, { recursive: true })

  const existingPosts = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  const topicIndex   = existingPosts.length % topics.length
  const topic        = topics[topicIndex]
  const today        = new Date().toISOString().slice(0, 10)

  console.log(`Topic [${topicIndex}]: "${topic}"`)
  console.log('Calling Claude API…')

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `You write for the Romandy CTO Meetup blog — a curated community of CTOs and senior technology leaders in Geneva and Romandy, Switzerland.

Write a blog post about: "${topic}"

Voice: direct, concrete, no filler. Think senior engineer who became a CTO and hasn't forgotten what shipping actually feels like. Short paragraphs. Real observations. No corporate language.

Output a single Markdown file. Use this exact frontmatter, then write the body:

---
title: "Your concise, punchy title (max 8 words)"
excerpt: "One or two sentences. Sharp and specific. Used as the card preview."
date: "${today}"
category: "AI & Automation"
---

(category must be one of: AI & Automation | Engineering Leadership | Talent & Teams | Strategy | Security | Swiss Tech)

Body: 680–820 words. Use ## and ### headers to organize. At least one specific, concrete example or observation. End with a clear 2–3 sentence takeaway.

Return ONLY the markdown file. Nothing before or after it.`,
    }],
  })

  const markdown = response.content[0].text.trim()

  // Extract title for slug
  const titleMatch = markdown.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  const title = titleMatch ? titleMatch[1].trim() : topic
  const slug  = `${today}-${slugify(title)}`

  // Generate DALL-E cover image (falls back to static if no API key)
  const generatedImage = await generateCoverImage(topic, title, slug)
  const coverImage = generatedImage || assignCoverImage(slug)

  // Inject coverImage into frontmatter
  const withCover = markdown.replace(
    /^(---\n)/,
    `$1coverImage: "${coverImage}"\n`
  )

  const outPath = path.join(BLOG_DIR, `${slug}.md`)
  fs.writeFileSync(outPath, withCover, 'utf-8')
  console.log(`✓ Written: content/blog/${slug}.md`)
}

main().catch(err => {
  console.error(err.message)
  process.exit(1)
})
