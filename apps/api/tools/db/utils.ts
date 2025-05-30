import fs from 'node:fs/promises';
import path from 'node:path';
import Surreal from 'surrealdb';

export async function setupDb() {
  const db = new Surreal();

  // biome-ignore lint/style/noNonNullAssertion: off
  await db.connect(process.env.DATABASE_URL!, {
    auth: {
      // biome-ignore lint/style/noNonNullAssertion: off
      username: process.env.SURREALDB_USER!,
      // biome-ignore lint/style/noNonNullAssertion: off
      password: process.env.SURREALDB_PASS!,
    },
  });

  return db;
}

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
export async function loadSchema(
  file = '../../src/modules/surrealdb/schema.surql',
) {
  try {
    const schemaPath = path.resolve(__dirname, file);
    const data = fs.readFile(schemaPath, { encoding: 'utf-8' });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
