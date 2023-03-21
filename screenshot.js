const puppeteer = require('puppeteer');
const EventEmitter = require('events');

// 「MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added to [process]」を回避する
EventEmitter.defaultMaxListeners = 100;

async function takeScreenshot(url, index) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.setViewport({ width: 1280, height: 800 });
    await page.screenshot({ path: 'images/screenshot' + index  + '.png' });
    await browser.close();
}

const urls = [
    // URLを入力してください
];

async function run() {
    const promises = urls.map((url, index) => takeScreenshot(url, index));
    await Promise.all(promises);
}

run().catch(console.error);
