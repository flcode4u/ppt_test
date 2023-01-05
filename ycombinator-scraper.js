const puppeteer = require('puppeteer');

function run() {
    return new Promise(async(resolve, reject) => {
        try{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://news.ycombinator.com/");
            let urls = await page.evaluate(()=> {
                let results = [];
                let items = document.querySelectorAll('.titleline a');
                items.forEach((item) => {
                    results.push({
                        url: item.getAttribute('href'),
                        text: item.innerText,
                    }); //push
                }); //forEach
                return results;
            }) //urls page.evaluate
            browser.close();
            return resolve(urls);
            } catch (e) {
            return reject(e);
        } //catch
    }) //Promise
}

run().then(console.log).catch(console.error);