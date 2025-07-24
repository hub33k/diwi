import fs from 'node:fs/promises';
import path from 'node:path';
import Surreal from 'surrealdb';

export const dbInfo = {
  // biome-ignore lint/style/noNonNullAssertion: off
  url: process.env.DATABASE_URL!,
  // biome-ignore lint/style/noNonNullAssertion: off
  user: process.env.DATABASE_USER!,
  // biome-ignore lint/style/noNonNullAssertion: off
  pass: process.env.DATABASE_PASS!,
  // biome-ignore lint/style/noNonNullAssertion: off
  namespace: process.env.DATABASE_NAMESPACE!,
  // biome-ignore lint/style/noNonNullAssertion: off
  name: process.env.DATABASE_NAME!,
} as const;

export async function setupDb(): Promise<Surreal> {
  const db = new Surreal();

  await db.connect(dbInfo.url, {
    auth: {
      username: dbInfo.user,
      password: dbInfo.pass,
    },
  });

  return db;
}

/** Api root dir */
export const rootDir = path.resolve(__dirname, '..', '..');
export const schemaFilePath = path.resolve(
  rootDir,
  'src/modules/surrealdb/schema.surql',
);

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
export async function loadSchema(
  file = schemaFilePath,
): Promise<string | null> {
  try {
    const schemaPath = path.resolve(rootDir, file);
    const data = fs.readFile(schemaPath, { encoding: 'utf-8' });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
