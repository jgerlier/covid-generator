import { fileNameRegex, generatePdf } from './pdfGenerationService';
import bodyParser from 'body-parser';
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import uuid from 'uuid';

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cleanup on start
rimraf('tmp/*', (err) => {
  if (err) {
    console.error(`Error while cleaning up tmp`, err);
  } else {
    console.debug(`Cleaned up directory tmp with success`);
  }
});

app.post('/api/generate', async (req, res) => {
  const payload = req.body;

  console.info(`New generation request from user ${payload.userId}`);

  const dirId = uuid.v4();
  const dir = path.join('tmp', dirId);

  try {
    await fs.mkdir(dir, { recursive: true });
    const filename = await generatePdf(dir, payload);
    res.send({
      fileLink: `/api/generate/${dirId}`,
      filename,
    });
  } catch (err) {
    console.error('Unexpected error', err);
    res.sendStatus(500);
  }

  // clean up after 5 minutes
  setTimeout(() => cleanUp(dir), 1000 * 60 * 5);
});

app.get('/api/generate/:dirId', async (req, res) => {
  const dirId = req.params.dirId;
  const dir = path.join('tmp', dirId);

  console.debug(`Downloading file for ${dirId}`);

  try {
    const files = await fs.readdir(dir);
    const foundFile = files.find((file) => file.match(fileNameRegex));

    if (foundFile) {
      await sendFile(res, path.resolve(path.join(dir, foundFile)));
    } else {
      console.error('No file found in ${dir}');
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Error while reading ${dir}', err);
    res.sendStatus(403);
    return;
  }
});

function sendFile(res, filePath) {
  return new Promise((resolve, reject) => {
    res.download(filePath, path.basename(filePath), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function cleanUp(dir) {
  rimraf(dir, (err) => {
    if (err) {
      console.error(`Error while cleaning up ${dir}`, err);
    } else {
      console.debug(`Cleaned up directory ${dir} with success`);
    }
  });
}

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'front/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'front/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
