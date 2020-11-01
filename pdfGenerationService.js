import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import util from 'util';

const covidFormUrl = 'https://media.interieur.gouv.fr/deplacement-covid-19/';

const browserPromise = puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--lang=fr-FR'],
  env: {
    ...process.env,
    TZ: 'Europe/Paris',
  },
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

  const frBirthDate = new Date(birthDate).toLocaleDateString('fr-FR');

  await page.type('#field-firstname', firstName);
  await page.type('#field-lastname', lastName);
  await page.type('#field-birthday', frBirthDate);
  await page.type('#field-placeofbirth', birthCity);
  await page.type('#field-address', address);
  await page.type('#field-city', city);
  await page.type('#field-zipcode', zipcode);
  await page.type(
    '#field-heuresortie',
    new Date().toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );

  await page.click(getCheckboxIdFrom(reason));

  await page.click('#generate-btn');

  let filename;
  try {
    filename = await waitForFile(dir, 10000);
  } catch (error) {
    console.warn(
      `An error occured, let's try again with link in the dom`,
      error
    );
    page.click('a[download]');
    filename = await waitForFile(dir, 10000);
  }

  const newFilename = path
    .basename(filename)
    .replace(/.pdf$/, `_${firstName}_${lastName}.pdf`);

  await Promise.all([
    page.close(),
    await util.promisify(fs.rename)(
      path.resolve(path.join(dir, filename)),
      path.resolve(path.join(dir, newFilename))
    ),
  ]);

  return newFilename;
}

function getCheckboxIdFrom(reason) {
  switch (reason) {
    case 'work':
      return '#checkbox-travail';
    case 'supply':
      return '#checkbox-achats';
    case 'health':
      return '#checkbox-sante';
    case 'familyAssistance':
      return '#checkbox-famille';
    case 'handicap':
      return '#checkbox-handicap';
    case 'sport':
      return '#checkbox-sport_animaux';
    case 'legal':
      return '#checkbox-convocation';
    case 'mandatoryMissions':
      return '#checkbox-missions';
    case 'children':
      return '#checkbox-enfants';
  }
}

export const fileNameRegex = /.+.pdf$/;

async function waitForFile(dir, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      fail(new Error(`Timeout: ${timeoutMs} ms`));
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
      resolve(fileName);
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
