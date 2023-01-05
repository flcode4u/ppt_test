const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#userNameTextBox';
const PASSWORD_SELECTOR = '#passwordTextBox';
const CTA_SELECTOR = '#signInButton';

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
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  await page.screenshot({path: 'pixelpoint_webview.png'});
}

(async () => {
  await playTest("http://192.168.0.25/WebView/Login.aspx");
  process.exit(1);
})();