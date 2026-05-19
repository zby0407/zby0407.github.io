const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///tmp/ai-memory-series.html', { waitUntil: 'networkidle' });
  await page.pdf({
    path: '/tmp/ai-memory-series.pdf',
    format: 'A4',
    margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:9px; width:100%; text-align:center; color:#666;"><span class="title"></span></div>',
    footerTemplate: '<div style="font-size:9px; width:100%; text-align:center; color:#666;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  });
  await browser.close();
  console.log('PDF generated: /tmp/ai-memory-series.pdf');
})();
