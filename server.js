import { generatePdf } from './pdfGenerationService';
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

app.post('/api/generate', (req, res) => {
  const parameters = req.body;
  const uniqueId = uuid.v4();
  const dir = path.join('tmp', uniqueId);

  return fs
    .mkdir(dir, { recursive: true })
    .then(() => generatePdf(dir, parameters))
    .then(
      (filePath) =>
        new Promise((resolve, reject) => {
          const { firstName, lastName } = parameters;
          const filename = path
            .basename(filePath)
            .replace(/.pdf$/, `_${firstName}_${lastName}.pdf`);
          res.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}"`
          );
          res.sendFile(filePath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        })
    )
    .catch((err) => {
      console.error('Unexpected error', err);
      res.sendStatus(500);
    })
    .finally(() => {
      rimraf(dir, (err) => {
        if (err) {
          console.error(`Error while cleaning up ${dir}`, err);
        } else {
          console.debug(`Cleaned up directory ${dir} with success`);
        }
      });
    });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'front/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'front/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
