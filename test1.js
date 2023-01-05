const puppeteer = require('puppeteer');
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://oxylabs.io/');
  await page.screenshot({'path': 'oxylabs_js.png'})
  await browser.close();
}
main();