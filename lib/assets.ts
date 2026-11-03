import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { SITE } from './site';

// Server-only. Adds a content hash to the resume link so a new PDF bypasses any
// cached copy (Cloudflare or the browser) as soon as it's deployed.
export function resumeHref(): string {
  const file = path.join(process.cwd(), 'public', SITE.resumePdf);
  const hash = crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
  return `${SITE.resumePdf}?v=${hash}`;
}
