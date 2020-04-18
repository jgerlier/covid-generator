const puppeteer = require('puppeteer');

const covidFormUrl = 'https://media.interieur.gouv.fr/deplacement-covid-19/';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: '.',
      });

    await page.goto(covidFormUrl);
    
    /*
    await page.type('#field-firstname', 'Julien');
    await page.type('#field-lastname', 'Gerlier');
    await page.type('#field-birthday', '13/03/1989');
    await page.type('#field-lieunaissance', 'Annecy');
    */

    await page.type('#field-address', '10 rue Aimé Collomb');
    await page.type('#field-town', 'Lyon');
    await page.type('#field-zipcode', '69003');
    await page.click("#checkbox-sport");

    await page.type('#field-firstname', 'Amélie');
    await page.type('#field-lastname', 'Petetin');
    await page.type('#field-birthday', '15/07/1988');
    await page.type('#field-lieunaissance', 'Pithiviers');
    
    await page.click("#generate-btn");
    
    //process.exit();
})();
