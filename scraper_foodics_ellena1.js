const puppeteer = require('puppeteer');
const C = require('./constants');
const BUSINESS_SELECTOR = '#business_ref';
const USERNAME_SELECTOR = '#email';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = '.btn';

async function startBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  await page.click(BUSINESS_SELECTOR);
  await page.keyboard.type(C.febusiness);
  //await page.click(USERNAME_SELECTOR);
  await page.evaluate(() => {
    document.getElementsByName('email')[0].click();
  });
  await page.keyboard.type(C.feusername);
  //await page.click(PASSWORD_SELECTOR);
  await page.evaluate(() => {
    document.getElementsByName('password')[0].click();
  });
  await page.keyboard.type(C.fepassword);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  await page.screenshot({path: 'foodics_ellena_console.png'});
}

(async () => {
  await playTest("https://console.foodics.com/login");
  process.exit(1);
})();