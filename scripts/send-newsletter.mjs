#!/usr/bin/env node
/**
 * send-newsletter.mjs
 * 1. Fetches AI/tech news from RSS feeds
 * 2. Uses Claude to transform into a Romandy CTO weekly digest
 * 3. Uses DALL-E to generate a header image (optional — needs OPENAI_API_KEY)
 * 4. Sends via Resend to all active newsletter_subscribers
 *
 * Required env: RESEND_API_KEY, RESEND_FROM, NEXT_PUBLIC_SUPABASE_URL,
 *               NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY, ANTHROPIC_API_KEY
 * Optional env: OPENAI_API_KEY (enables AI-generated header image)
 *
 * Run: node scripts/send-newsletter.mjs
 */

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const SITE = 'https://www.ctoromandy.ch'
const ORANGE = '#C8834A'
const FROM = process.env.RESEND_FROM ?? 'Romandy CTO <hello@ctoromandy.ch>'

const resend   = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── 1. Fetch RSS feeds ────────────────────────────────────────────────────────
const RSS_FEEDS = [
  'https://techcrunch.com/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/rss.xml',
  'https://venturebeat.com/category/ai/feed/',
  'https://hnrss.org/frontpage?points=100',
]

async function fetchRSS(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'RomandyCTO-Newsletter/1.0' },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    const items = []
    const itemMatches = xml.matchAll(/<item[\s>]([\s\S]*?)<\/item>/gi)
    for (const [, body] of itemMatches) {
      const title   = body.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1]
                   ?? body.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] ?? ''
      const desc    = body.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>/s)?.[1]
                   ?? body.match(/<description[^>]*>(.*?)<\/description>/s)?.[1] ?? ''
      const link    = body.match(/<link[^>]*>(.*?)<\/link>/s)?.[1]
                   ?? body.match(/<link\s+href="([^"]+)"/)?.[1] ?? ''
      const pubDate = body.match(/<pubDate[^>]*>(.*?)<\/pubDate>/s)?.[1] ?? ''
      const cleanDesc = desc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300)
      if (title.trim()) items.push({ title: title.trim(), description: cleanDesc, link: link.trim(), pubDate })
    }
    return items.slice(0, 8)
  } catch (e) {
    console.warn(`RSS fetch failed for ${url}:`, e.message)
    return []
  }
}

async function fetchAllNews() {
  const results = await Promise.allSettled(RSS_FEEDS.map(fetchRSS))
  const all = results.flatMap(r => r.status === 'fulfilled' ? r.value : [])
  // Deduplicate by title similarity
  const seen = new Set()
  return all.filter(item => {
    const key = item.title.toLowerCase().slice(0, 40)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(0, 20)
}

// ─── 2. Generate newsletter content with Claude ────────────────────────────────
async function generateContent(newsItems) {
  const prompt = `You are the editor of the Romandy CTO Weekly — a sharp, no-fluff AI newsletter for CTOs and technology leaders in Switzerland and across Europe.

Here are the latest AI/tech news items from the past week:
${newsItems.map((n, i) => `${i + 1}. ${n.title}\n   ${n.description}`).join('\n\n')}

Generate the newsletter content as a JSON object with this exact structure:
{
  "subject": "string — compelling email subject line, max 60 chars, no emojis",
  "previewText": "string — email preview text, max 90 chars",
  "heroHeadline": "string — bold 4-6 word headline for the top of the email",
  "intro": "string — 2 sentence intro greeting the reader, referencing the week's theme",
  "stories": [
    {
      "tag": "string — source/category tag in CAPS (e.g. OPENAI, ANTHROPIC, REGULATION, RESEARCH)",
      "headline": "string — concise story headline",
      "body": "string — 2-3 sentence summary focused on what CTOs need to know",
      "url": "string — source URL if available, else empty string"
    }
  ],
  "deepDive": {
    "title": "string — deep dive article title",
    "body": "string — 4-5 sentence strategic analysis of the most important story, CTO perspective, what to do about it",
    "imagePrompt": "string — DALL-E prompt for a dark, dramatic, abstract tech illustration. Style: dark background, amber/orange glow, no text, geometric/network patterns, cinematic"
  },
  "toolOfTheWeek": {
    "name": "string — tool name",
    "tagline": "string — one line description",
    "body": "string — 2-3 sentences on what it does and why CTOs should care",
    "url": "string — tool URL if known"
  },
  "ctoInsight": "string — one punchy strategic observation (1-2 sentences) in first-person CTO voice. Opinionated, not corporate.",
  "dallePrompt": "string — DALL-E 3 prompt for the newsletter header image. Dark tech aesthetic, amber highlights, abstract, no text"
}

Pick exactly 3 stories. Be direct and opinionated. Write like a senior CTO, not a journalist. No hype, no filler.`

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].text
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Claude did not return valid JSON')
  return JSON.parse(jsonMatch[0])
}

// ─── 3. Generate header image with DALL-E ─────────────────────────────────────
async function generateImage(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    console.log('No OPENAI_API_KEY — skipping image generation')
    return null
  }
  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `${prompt}. Dark background, amber and orange color palette, no text, no words, abstract geometric shapes, cinematic lighting, high quality.`,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
      }),
    })
    if (!res.ok) {
      console.warn('DALL-E failed:', await res.text())
      return null
    }
    const data = await res.json()
    return data.data?.[0]?.url ?? null
  } catch (e) {
    console.warn('Image generation error:', e.message)
    return null
  }
}

// ─── 4. Build HTML email ──────────────────────────────────────────────────────
function buildEmail({ content, imageUrl, subscribers, locale, token }) {
  const isFr = locale === 'fr'
  const unsubUrl = `${SITE}/api/newsletter?token=${token}`
  const dateStr = new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  const subject = content.subject
  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Logo + date -->
        <tr><td style="padding:0 0 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">ROMANDY</span><br/>
                <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
              </td>
              <td style="text-align:right;vertical-align:bottom;">
                <span style="font-size:10px;font-weight:600;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.25);">${dateStr}</span>
              </td>
            </tr>
          </table>
        </td></tr>

        ${imageUrl ? `
        <!-- Hero image -->
        <tr><td style="padding:0 0 0;line-height:0;">
          <img src="${imageUrl}" width="600" alt="${content.heroHeadline}"
            style="width:100%;max-width:600px;height:auto;display:block;border-radius:16px 16px 0 0;" />
        </td></tr>` : ''}

        <!-- Main card -->
        <tr><td style="background:#1A1A1A;border-radius:${imageUrl ? '0 0 16px 16px' : '16px'};border:1px solid rgba(255,255,255,0.07);${imageUrl ? 'border-top:none;' : ''}">
          <div style="height:3px;background:linear-gradient(to right,#C8834A,#E0A070);${imageUrl ? '' : 'border-radius:16px 16px 0 0;'}"></div>
          <div style="padding:36px 40px 44px;">

            <!-- Hero headline + intro -->
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C8834A;">
              ${isFr ? 'Cette semaine en IA' : 'This week in AI'}
            </p>
            <h1 style="margin:0 0 16px;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;text-transform:uppercase;">
              ${content.heroHeadline}
            </h1>
            <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.75;">
              ${content.intro}
            </p>

            <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 32px;"></div>

            <!-- Top stories -->
            <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
              ${isFr ? 'Top actualités' : 'Top stories'}
            </p>

            ${content.stories.map(s => `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
              <tr><td style="padding:16px 18px;">
                <p style="margin:0 0 6px;">
                  <span style="font-size:9px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;background:rgba(200,131,74,0.18);color:#C8834A;padding:2px 6px;border-radius:3px;">${s.tag}</span>
                </p>
                <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#ffffff;">${s.headline}</p>
                <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.45);line-height:1.65;">${s.body}</p>
                ${s.url ? `<p style="margin:8px 0 0;"><a href="${s.url}" style="font-size:11px;color:#C8834A;text-decoration:none;">${isFr ? 'Lire →' : 'Read →'}</a></p>` : ''}
              </td></tr>
            </table>`).join('')}

            <div style="height:1px;background:rgba(255,255,255,0.06);margin:28px 0;"></div>

            <!-- Deep dive -->
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
              ${isFr ? 'Analyse' : 'Deep dive'}
            </p>
            <h2 style="margin:0 0 12px;font-size:17px;font-weight:900;color:#ffffff;line-height:1.25;text-transform:uppercase;">
              ${content.deepDive.title}
            </h2>
            <p style="margin:0 0 28px;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.8;">
              ${content.deepDive.body}
            </p>

            <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 28px;"></div>

            <!-- Tool of the week -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:rgba(200,131,74,0.06);border:1px solid rgba(200,131,74,0.18);border-radius:12px;">
              <tr><td style="padding:20px 22px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C8834A;">
                  ${isFr ? 'Outil de la semaine' : 'Tool of the week'}
                </p>
                <p style="margin:0 0 2px;font-size:15px;font-weight:900;color:#ffffff;">${content.toolOfTheWeek.name}
                  <span style="font-size:12px;font-weight:400;color:rgba(255,255,255,0.4);margin-left:6px;">${content.toolOfTheWeek.tagline}</span>
                </p>
                <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.5);line-height:1.65;">${content.toolOfTheWeek.body}</p>
                ${content.toolOfTheWeek.url ? `<p style="margin:8px 0 0;"><a href="${content.toolOfTheWeek.url}" style="font-size:11px;color:#C8834A;text-decoration:none;">${isFr ? 'Explorer →' : 'Explore →'}</a></p>` : ''}
              </td></tr>
            </table>

            <!-- CTO Insight -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;background:rgba(255,255,255,0.025);border-left:3px solid #C8834A;border-radius:0 8px 8px 0;">
              <tr><td style="padding:16px 20px;">
                <p style="margin:0 0 4px;font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.3);">
                  ${isFr ? 'Perspective CTO' : 'CTO perspective'}
                </p>
                <p style="margin:0;font-size:13px;font-style:italic;color:rgba(255,255,255,0.6);line-height:1.7;">
                  &ldquo;${content.ctoInsight}&rdquo;
                </p>
              </td></tr>
            </table>

            <!-- CTA -->
            <a href="${SITE}/${locale}/events"
              style="display:block;text-align:center;background:#C8834A;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:9px;text-transform:uppercase;letter-spacing:0.07em;">
              ${isFr ? 'Voir les prochains événements →' : 'See upcoming events →'}
            </a>

          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.18);">Romandy CTO · Geneva, Switzerland</p>
          <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.12);">
            ${isFr
              ? `Vous recevez cet email car vous êtes abonné à la newsletter Romandy CTO. <a href="${unsubUrl}" style="color:rgba(255,255,255,0.25);text-decoration:underline;">Se désabonner</a>`
              : `You're receiving this as a subscriber to the Romandy CTO newsletter. <a href="${unsubUrl}" style="color:rgba(255,255,255,0.25);text-decoration:underline;">Unsubscribe</a>`}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`

  return { subject, html }
}

// ─── 5. Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('📰 Romandy CTO Newsletter — starting...')

  // Fetch subscribers
  const { data: subscribers, error: dbErr } = await supabase
    .from('newsletter_subscribers')
    .select('email, first_name, locale, token')
    .eq('is_active', true)

  if (dbErr) { console.error('Supabase error:', dbErr.message); process.exit(1) }
  if (!subscribers?.length) { console.log('No active subscribers — nothing to send.'); process.exit(0) }
  console.log(`Found ${subscribers.length} subscribers`)

  // Fetch news
  console.log('Fetching RSS feeds...')
  const newsItems = await fetchAllNews()
  console.log(`Fetched ${newsItems.length} news items`)
  if (newsItems.length < 3) { console.error('Not enough news items'); process.exit(1) }

  // Generate content
  console.log('Generating newsletter content with Claude...')
  const content = await generateContent(newsItems)
  console.log('Subject:', content.subject)

  // Generate image
  console.log('Generating header image...')
  const imageUrl = await generateImage(content.dallePrompt)
  console.log(imageUrl ? `Image: ${imageUrl}` : 'No image (skipped)')

  // Group by locale
  const byLocale = { en: [], fr: [] }
  for (const sub of subscribers) {
    const l = sub.locale === 'fr' ? 'fr' : 'en'
    byLocale[l].push(sub)
  }

  // Send batches
  for (const [locale, subs] of Object.entries(byLocale)) {
    if (!subs.length) continue
    console.log(`Sending ${subs.length} emails (${locale})...`)
    const emails = subs.map(sub => {
      const { subject, html } = buildEmail({ content, imageUrl, locale, token: sub.token })
      const firstName = sub.first_name || (locale === 'fr' ? 'Cher lecteur' : 'there')
      return {
        from: FROM,
        to: sub.email,
        subject,
        html: html.replace(/there|Cher lecteur/, firstName),
      }
    })

    for (let i = 0; i < emails.length; i += 50) {
      const batch = emails.slice(i, i + 50)
      const { error } = await resend.batch.send(batch)
      if (error) console.error(`Batch error (${locale}, batch ${Math.floor(i/50)+1}):`, error)
      else console.log(`Sent batch ${Math.floor(i/50)+1} (${batch.length} emails, ${locale})`)
      if (i + 50 < emails.length) await new Promise(r => setTimeout(r, 1000))
    }
  }

  console.log('✅ Newsletter sent!')
}

main().catch(e => { console.error(e); process.exit(1) })
