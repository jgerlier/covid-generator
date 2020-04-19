import axios from 'axios';
import { saveAs } from 'file-saver';
import { v4 as uuid } from 'uuid';

export async function generateDocument(profile, reason) {
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
  });

  saveAs(fileLink, filename);
}
