#!/usr/bin/env node
/**
 * notify-community.mjs
 * Sends announcement emails to all community members when a new blog post
 * or event is detected. Called by .github/workflows/notify-community.yml
 *
 * Env vars required:
 *   RESEND_API_KEY, RESEND_FROM
 *   SUPABASE_URL, SUPABASE_KEY
 *   NEW_POST      — path to new .md file (e.g. content/blog/2026-04-01-foo.md)
 *   NEW_EVENT_SLUG — slug of new event    (e.g. innovation-luxury-april-2026)
 */

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const resend   = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const FROM     = process.env.RESEND_FROM ?? 'Romandy CTO <hello@ctoromandy.ch>'
const SITE     = 'https://www.ctoromandy.ch'

// ─── Fetch all community members ─────────────────────────────────────────────
const { data: members, error: dbErr } = await supabase
  .from('community_members')
  .select('first_name, email, locale')

if (dbErr) { console.error('Supabase error:', dbErr.message); process.exit(1) }
if (!members?.length) { console.log('No community members found — nothing to send.'); process.exit(0) }
console.log(`Sending to ${members.length} members…`)

// ─── Parse frontmatter (no deps) ─────────────────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  return Object.fromEntries(
    match[1].split('\n')
      .map(l => l.match(/^(\w+):\s*(.+)/))
      .filter(Boolean)
      .map(([, k, v]) => [k, v.replace(/^['"]|['"]$/g, '')])
  )
}

// ─── Email builders ───────────────────────────────────────────────────────────

function blogEmail({ firstName, title, excerpt, slug, locale }) {
  const isFr   = locale === 'fr'
  const postUrl = `${SITE}/${locale}/blog/${slug}`
  const subject = isFr
    ? `Nouvelle publication : ${title}`
    : `New insight: ${title}`

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <tr><td style="padding:0 0 28px;">
          <span style="font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">ROMANDY</span><br/>
          <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
        </td></tr>

        <tr><td style="background:#1A1A1A;border-radius:16px;border:1px solid rgba(255,255,255,0.07);">
          <div style="height:3px;background:linear-gradient(to right,#C8834A,#E0A070);border-radius:16px 16px 0 0;"></div>
          <div style="padding:40px 40px 48px;">

            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C8834A;">
              ${isFr ? 'Nouvelle publication' : 'New insight'}
            </p>
            <h1 style="margin:0 0 20px;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;line-height:1.15;">
              ${title}
            </h1>
            <p style="margin:0 0 36px;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.75;">
              ${excerpt}
            </p>

            <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 32px;"></div>

            <p style="margin:0 0 6px;font-size:11px;color:rgba(255,255,255,0.25);">
              ${isFr
                ? `Bonjour ${firstName}, ce nouvel article vient d'être publié sur le site Romandy CTO.`
                : `Hey ${firstName}, this insight was just published on the Romandy CTO site.`}
            </p>

            <a href="${postUrl}"
              style="display:block;text-align:center;background:#C8834A;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:15px 32px;border-radius:9px;text-transform:uppercase;letter-spacing:0.07em;margin-top:24px;">
              ${isFr ? 'Lire l\'article →' : 'Read the post →'}
            </a>

          </div>
        </td></tr>

        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.18);">Romandy CTO · Geneva, Switzerland</p>
          <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.12);">
            ${isFr
              ? 'Vous recevez cet email car vous êtes membre de la communauté Romandy CTO.'
              : "You're receiving this as a member of the Romandy CTO community."}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`

  return { subject, html }
}

function eventEmail({ firstName, eventName, eventDate, eventTime, eventLocation, eventDescription, eventSlug, spotsAvailable, locale }) {
  const isFr    = locale === 'fr'
  const regUrl  = `${SITE}/${locale}/register`
  const eventUrl = `${SITE}/${locale}/events/${eventSlug}`
  const subject = isFr
    ? `Prochain événement : ${eventName}`
    : `Next event: ${eventName}`

  const iconDate = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8834A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
  const iconPin  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8834A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <tr><td style="padding:0 0 28px;">
          <span style="font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">ROMANDY</span><br/>
          <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
        </td></tr>

        <tr><td style="padding:0;line-height:0;">
          <img src="${SITE}/og-image1.jpg" width="600" alt="${eventName}"
            style="width:100%;max-width:600px;height:auto;display:block;border-radius:16px 16px 0 0;" />
        </td></tr>

        <tr><td style="background:#1A1A1A;border-radius:0 0 16px 16px;border:1px solid rgba(255,255,255,0.07);border-top:none;">
          <div style="height:3px;background:linear-gradient(to right,#C8834A,#E0A070);"></div>
          <div style="padding:40px 40px 48px;">

            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C8834A;">
              ${isFr ? 'Prochain événement' : 'Upcoming event'}
            </p>
            <h1 style="margin:0 0 6px;font-size:28px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">
              ${eventName}
            </h1>
            <p style="margin:0 0 24px;font-size:13px;color:rgba(255,255,255,0.3);">
              ${isFr ? `Bonjour ${firstName}` : `Hey ${firstName}`}
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.75;">
              ${eventDescription}
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border:1px solid rgba(200,131,74,0.18);border-radius:12px;background:rgba(200,131,74,0.06);">
              <tr><td style="padding:22px 24px;">
                <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                  <tr>
                    <td style="width:22px;vertical-align:middle;">${iconDate}</td>
                    <td style="padding-left:10px;font-size:13px;color:rgba(255,255,255,0.65);">${eventDate} &nbsp;·&nbsp; ${eventTime}</td>
                  </tr>
                </table>
                <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                  <tr>
                    <td style="width:22px;vertical-align:middle;">${iconPin}</td>
                    <td style="padding-left:10px;font-size:13px;color:rgba(255,255,255,0.65);">${eventLocation}</td>
                  </tr>
                </table>
                <p style="margin:10px 0 0;font-size:12px;font-weight:700;color:#C8834A;">
                  ${spotsAvailable} ${isFr ? 'places disponibles · Toujours gratuit' : 'spots available · Always free'}
                </p>
              </td></tr>
            </table>

            <a href="${regUrl}"
              style="display:block;text-align:center;background:#C8834A;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:15px 32px;border-radius:9px;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:12px;">
              ${isFr ? 'Réserver ma place →' : 'Reserve my spot →'}
            </a>
            <p style="margin:0 0 0;font-size:11px;text-align:center;">
              <a href="${eventUrl}" style="color:rgba(200,131,74,0.7);font-size:11px;">
                ${isFr ? 'Voir tous les détails →' : 'Full event details →'}
              </a>
            </p>

          </div>
        </td></tr>

        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.18);">Romandy CTO · Geneva, Switzerland</p>
          <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.12);">
            ${isFr
              ? 'Vous recevez cet email car vous êtes membre de la communauté Romandy CTO.'
              : "You're receiving this as a member of the Romandy CTO community."}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`

  return { subject, html }
}

// ─── Send in batches of 50 (Resend batch limit) ───────────────────────────────
async function sendBatch(emails) {
  for (let i = 0; i < emails.length; i += 50) {
    const batch = emails.slice(i, i + 50)
    const { error } = await resend.batch.send(batch)
    if (error) console.error(`Batch ${i / 50 + 1} error:`, error)
    else console.log(`Batch ${i / 50 + 1} sent (${batch.length} emails)`)
    if (i + 50 < emails.length) await new Promise(r => setTimeout(r, 1000))
  }
}

// ─── Handle new blog post ─────────────────────────────────────────────────────
const newPost = process.env.NEW_POST
if (newPost) {
  console.log('New blog post detected:', newPost)

  const raw      = fs.readFileSync(path.join(ROOT, newPost), 'utf-8')
  const meta     = parseFrontmatter(raw)
  const slug     = path.basename(newPost, '.md')
  const title    = meta.title    ?? 'New post'
  const excerpt  = meta.excerpt  ?? ''

  const emails = members.map(({ first_name, email, locale }) => {
    const { subject, html } = blogEmail({ firstName: first_name, title, excerpt, slug, locale: locale ?? 'en' })
    return { from: FROM, to: email, subject, html }
  })

  await sendBatch(emails)
  console.log(`Blog notification sent to ${emails.length} members.`)
}

// ─── Handle new event ─────────────────────────────────────────────────────────
const newEventSlug = process.env.NEW_EVENT_SLUG
if (newEventSlug) {
  console.log('New event detected:', newEventSlug)

  // Load events from JSON export (generated at build / manually kept in sync)
  const eventsPath = path.join(ROOT, 'scripts/events-data.json')
  if (!fs.existsSync(eventsPath)) {
    console.error('scripts/events-data.json not found — cannot send event notification.')
    process.exit(1)
  }

  const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'))
  const event  = events.find(e => e.slug === newEventSlug)

  if (!event) {
    console.error(`Event "${newEventSlug}" not found in events-data.json`)
    process.exit(1)
  }

  const emails = members.map(({ first_name, email, locale }) => {
    const isFr  = locale === 'fr'
    const { subject, html } = eventEmail({
      firstName:        first_name,
      eventName:        isFr ? event.titleFr : event.title,
      eventDate:        event.date,
      eventTime:        event.time,
      eventLocation:    event.location,
      eventDescription: isFr ? event.descriptionFr : event.description,
      eventSlug:        event.slug,
      spotsAvailable:   event.maxSpots,
      locale:           locale ?? 'en',
    })
    return { from: FROM, to: email, subject, html }
  })

  await sendBatch(emails)
  console.log(`Event notification sent to ${emails.length} members.`)
}

if (!newPost && !newEventSlug) {
  console.log('Nothing to notify about.')
}
