import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxChars) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length + 3) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[.,;:\-–—]?$/, '') + '…';
  }
  return lines;
}

export async function getStaticPaths() {
  const articles = await getCollection('articles');
  return articles.map((entry) => ({
    params: { slug: entry.slug },
    props: {
      title: entry.data.title,
      pillar: entry.data.pillar,
      audience: entry.data.audience,
    },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { title, pillar, audience } = props as {
    title: string;
    pillar: string;
    audience: string;
  };
  const titleLines = wrapText(title, 34, 3);
  const titleSvg = titleLines
    .map(
      (line, idx) =>
        `<text x="80" y="${275 + idx * 66}" font-family="Georgia, serif" font-size="50" font-weight="bold" fill="#ffffff">${escapeXml(line)}</text>`
    )
    .join('\n  ');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#022c22"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="614" width="1200" height="16" fill="#f59e0b"/>
  <g opacity="0.1" stroke="#f59e0b" stroke-width="3" fill="none">
    <polygon points="1010,120 1105,175 1105,285 1010,340 915,285 915,175"/>
    <polygon points="1105,285 1200,340 1200,450 1105,505 1010,450 1010,340"/>
  </g>
  <text x="80" y="102" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="#ffffff">Humic<tspan fill="#f59e0b">.blog</tspan></text>
  <rect x="80" y="148" width="600" height="40" rx="20" fill="#065f46" stroke="#f59e0b" stroke-opacity="0.6"/>
  <text x="104" y="174" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#fbbf24">${escapeXml(pillar.toUpperCase())}  •  ${escapeXml(audience.toUpperCase())}</text>
  ${titleSvg}
  <text x="80" y="558" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#a7f3d0">Peer-Reviewed Soil Science  •  ISO 19822 &amp; IHSS Aligned  •  https://humic.blog</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
    },
  });
};
