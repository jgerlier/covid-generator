import axios from 'axios';
import { saveAs } from 'file-saver';

export async function generateDocument(profile, reason) {
  const { data, headers } = await axios.post(
    '/api/generate',
    {
      ...profile,
      reason,
    },
    { responseType: 'blob' }
  );

  const filename = headers['content-disposition'].match(/filename="(.*)"$/)[1];

  saveAs(data, filename);
}
