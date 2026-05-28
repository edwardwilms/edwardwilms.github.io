import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, 'resume.html');
const outputPath = resolve(here, '..', 'Edward Wilms - English.pdf');

if (!existsSync(htmlPath)) {
  console.error(`✗ Missing source: ${htmlPath}`);
  process.exit(1);
}

const t0 = Date.now();
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });
} finally {
  await browser.close();
}

const dt = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`✓ Resume PDF generated in ${dt}s`);
console.log(`  → ${outputPath}`);
