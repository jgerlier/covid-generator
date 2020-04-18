import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const covidFormUrl = 'https://media.interieur.gouv.fr/deplacement-covid-19/';

const browserPromise = puppeteer.launch({
  headless: true,
  args: ['--no-sandbox'],
});

export async function generatePdf(
  dir,
  { firstName, lastName, birthDate, birthCity, address, zipcode, city, reason }
) {
  const browser = await browserPromise;
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: dir,
  });

  await page.goto(covidFormUrl);

  const frBirthDate = new Date(birthDate).toLocaleDateString({
    locales: 'fr_FR',
  });

  await page.type('#field-firstname', firstName);
  await page.type('#field-lastname', lastName);
  await page.type('#field-birthday', frBirthDate);
  await page.type('#field-lieunaissance', birthCity);
  await page.type('#field-address', address);
  await page.type('#field-town', city);
  await page.type('#field-zipcode', zipcode);

  await page.click(getCheckboxIdFrom(reason));

  await page.click('#generate-btn');

  return await waitForFile(dir, 2000);
}

function getCheckboxIdFrom(reason) {
  switch (reason) {
    case 'work':
      return '#checkbox-travail';
    case 'shopping':
      return '#checkbox-courses';
    case 'sport':
      return '#checkbox-sport';
    case 'health':
      return '#checkbox-sante';
    case 'familyAssistance':
      return '#checkbox-family';
    case 'legal':
      return '#checkbox-judiciaire';
    case 'mandatoryMissions':
      return '#checkbox-missions';
  }
}

const fileNameRegex = /.+.pdf$/;

async function waitForFile(dir, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      fail(new Error(timeoutMs));
    }, timeoutMs);

    const watcher = fs.watch(dir, (eventType, fileName) => {
      if (eventType === 'rename' && fileName.match(fileNameRegex)) {
        succeed(fileName);
      }
    });

    function fail(err) {
      clearTimeout(timer);
      watcher.close();
      reject(
        new Error(`Unable to wait for a PDF file in ${dir}, error: ${err}`)
      );
    }

    function succeed(fileName) {
      clearTimeout(timer);
      watcher.close();
      resolve(path.resolve(path.join(dir, fileName)));
    }

    fs.readdir(dir, (err, files) => {
      if (err) {
        fail(err);
        return;
      }

      const foundFile = files.find((file) => file.match(fileNameRegex));
      if (foundFile) {
        succeed(path.fileName(foundFile));
      }
    });
  });
}
