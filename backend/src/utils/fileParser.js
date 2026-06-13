import { readFile } from 'node:fs/promises';
import pdf from 'pdf-parse';

export async function parseUploadedFile(file) {
  const buffer = await readFile(file.path);

  if (file.mimetype === 'application/pdf') {
    const parsed = await pdf(buffer);
    return parsed.text;
  }

  return buffer.toString('utf8');
}
