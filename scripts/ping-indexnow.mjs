#!/usr/bin/env node
/**
 * Reads Astro's generated sitemap(s) in dist/ and notifies IndexNow
 * of all canonical https://humic.blog URLs in a single batch POST.
 */
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'humic.blog';
const ORIGIN = `https://${HOST}`;
const KEY = 'dd22b1c95c3f30da7065eeb4b52b395b';
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const DRY_RUN = process.argv.includes('--dry-run');

function extractLocs(xml) {
  const locs = [];
  const regex = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    locs.push(match[1].trim());
  }
  return locs;
}

function collectSitemapUrls() {
  const sitemapIndexPath = path.join(DIST_DIR, 'sitemap-index.xml');
  const childFiles = [];

  if (fs.existsSync(sitemapIndexPath)) {
    const indexXml = fs.readFileSync(sitemapIndexPath, 'utf8');
    const childLocs = extractLocs(indexXml);
    for (const loc of childLocs) {
      try {
        const pathname = new URL(loc).pathname.replace(/^\/+/, '');
        const localFile = path.join(DIST_DIR, pathname);
        if (fs.existsSync(localFile)) {
          childFiles.push(localFile);
        }
      } catch {
        // Ignore malformed child loc entries
      }
    }
  }

  if (childFiles.length === 0) {
    const fallback = path.join(DIST_DIR, 'sitemap-0.xml');
    if (fs.existsSync(fallback)) {
      childFiles.push(fallback);
    }
  }

  if (childFiles.length === 0) {
    throw new Error(`No sitemap files found in ${DIST_DIR}. Run "npm run build" first.`);
  }

  const urlSet = new Set();
  for (const file of childFiles) {
    const xml = fs.readFileSync(file, 'utf8');
    for (const loc of extractLocs(xml)) {
      if (loc.startsWith(`${ORIGIN}/`) || loc === ORIGIN) {
        urlSet.add(loc);
      }
    }
  }

  return Array.from(urlSet);
}

async function main() {
  const urlList = collectSitemapUrls();
  console.log(`[IndexNow] Discovered ${urlList.length} canonical URLs for ${HOST}`);
  console.log(`[IndexNow] Key location: ${KEY_LOCATION}`);

  if (urlList.length === 0) {
    console.warn('[IndexNow] Sitemap yielded 0 URLs — skipping submission.');
    return;
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  if (DRY_RUN) {
    console.log(`[IndexNow] Dry run enabled — sample URLs:`, urlList.slice(0, 5));
    return;
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'humic-blog-indexnow-bot/1.0',
      },
      body: JSON.stringify(payload),
    });

    const bodyText = await res.text().catch(() => '');
    console.log(`[IndexNow] HTTP ${res.status} ${res.statusText} — Submitted ${urlList.length} URLs`);
    if (bodyText) {
      console.log(`[IndexNow] Response body: ${bodyText.slice(0, 300)}`);
    }

    if (res.status === 200 || res.status === 202) {
      console.log('[IndexNow] Submission accepted successfully.');
      return;
    }

    if (res.status === 429 || res.status >= 500) {
      console.warn(`[IndexNow] Transient HTTP ${res.status} — exiting gracefully without failing CI.`);
      return;
    }

    console.warn(`[IndexNow] Unexpected HTTP ${res.status} — check key file availability at ${KEY_LOCATION}.`);
  } catch (err) {
    console.warn(`[IndexNow] Network error while pinging IndexNow (${err?.message || err}) — exiting gracefully.`);
  }
}

main().catch((err) => {
  console.error('[IndexNow] Fatal local error:', err);
  process.exit(1);
});
