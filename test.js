import { Actor } from 'apify';
import { launchPuppeteer, log } from 'crawlee';

await Actor.init();

// Get the username and password inputs
const input = await Actor.getInput();

const browser = await launchPuppeteer();
const page = await browser.newPage();
await page.goto('http://192.168.0.65/Report/Default.aspx');

// Login
await page.type('#txtLoginName', input.username);
await page.type('#txtPassword', input.password);
await page.click('#btnLogin');
await page.waitForNavigation();

// Get cookies
const cookies = await page.cookies();

// Use cookies in another tab or browser
const page2 = await browser.newPage();
await page2.setCookie(...cookies);
// Open the page as a logged-in user
await page2.goto('http://192.168.0.65/Report/Forms/Home.aspx');

await browser.close();

log.info('Done.');

await Actor.exit();