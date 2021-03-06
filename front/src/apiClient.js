import axios from 'axios';
import { v4 as uuid } from 'uuid';

export async function generateDocument(profile, reason, debug = false) {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = uuid();
    localStorage.setItem('userId', userId);
  }

  const {
    data: { fileLink, filename },
  } = await axios.post('/api/generate', {
    ...profile,
    reason,
    userId,
    debug,
  });

  //saveAs(fileLink, filename);

  const a = document.createElement('a');
  a.href = fileLink;
  a.download = filename || 'download';
  a.click();
}
