#!/usr/bin/env node
/**
 * Generate sitemap.xml with SITE_URL from env
 * Run: SITE_URL=https://yoursite.com node scripts/generate-sitemap.js
 */
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://internetisbeautiful.io'
const today = new Date().toISOString().split('T')[0]

const urls = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/projects', priority: '0.9', changefreq: 'daily' },
  { path: '/submit', priority: '0.8', changefreq: 'weekly' },
  { path: '/donate', priority: '0.7', changefreq: 'monthly' },
  { path: '/dashboard', priority: '0.7', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL.replace(/\/$/, '')}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml)
console.log('Generated sitemap.xml with base URL:', SITE_URL)
