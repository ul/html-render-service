const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/', async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(request.body.html);
    const screenshot = await page.screenshot({ fullPage: true, type: 'png' });

    response.attachment(request.body.filename);
    response.send(screenshot);

    await browser.close();
});

app.listen(port, () => console.log('Service started.'));
