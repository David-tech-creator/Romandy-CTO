#!/usr/bin/env node
/**
 * export-events.mjs
 * Reads EVENTS from src/lib/events.ts (via regex, no TS runtime needed)
 * and writes scripts/events-data.json for use by notify-community.mjs.
 *
 * Run: node scripts/export-events.mjs
 * Called automatically by the notify-community GitHub Action.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname   = path.dirname(fileURLToPath(import.meta.url))
const ROOT        = path.join(__dirname, '..')
const EVENTS_SRC  = path.join(ROOT, 'src/lib/events.ts')
const OUTPUT_PATH = path.join(__dirname, 'events-data.json')

// Strip TS syntax and eval as JS to extract the EVENTS array
let src = fs.readFileSync(EVENTS_SRC, 'utf-8')

// Remove type annotations and exports
src = src
  .replace(/export type Event = \{[\s\S]*?\}/m, '')
  .replace(/export const UPCOMING_EVENT[\s\S]*$/m, '')
  .replace(/export const PAST_EVENTS[\s\S]*$/m, '')
  .replace(/export const NEXT_EVENT[\s\S]*$/m, '')
  .replace(/export /g, '')
  .replace(/: string/g, '')
  .replace(/: number/g, '')
  .replace(/: boolean/g, '')
  .replace(/\?: \{[\s\S]*?\}\[\]/g, '')
  .replace(/agenda\?:/g, 'agenda:')
  .replace(/attendees\?:/g, 'attendees:')

// Extract just the EVENTS array
const match = src.match(/const EVENTS[^=]*=\s*(\[[\s\S]*?\n\])/m)
if (!match) {
  console.error('Could not parse EVENTS array from events.ts')
  process.exit(1)
}

// Safe eval
let events
try {
  events = eval(match[1])
} catch (e) {
  console.error('Failed to parse events:', e.message)
  process.exit(1)
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2))
console.log(`Exported ${events.length} events to scripts/events-data.json`)
