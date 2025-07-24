import { afterAll, beforeAll } from 'bun:test';
import Surreal from 'surrealdb';
import { loadSchema, setupDb } from '../tools/db/utils';

let db: Surreal;

const namespace = process.env.DATABASE_NAMESPACE;
const database = process.env.DATABASE_NAME;

beforeAll(async () => {
  // global setup
  // console.log('Starting e2e tests');
  // console.log('DATABASE_URL', process.env.DATABASE_URL);
  // console.log('NAMESPACE', process.env.DATABASE_NAMESPACE);
  // console.log('DATABASE', process.env.DATABASE_NAME);

  db = await setupDb();
  await db.query(`DEFINE NAMESPACE IF NOT EXISTS ${namespace};`);
  console.log(`Using: ${namespace} - ${database}`);
  await db.use({ namespace, database });
  await db.query(`DEFINE DATABASE IF NOT EXISTS ${database};`);

  const schemaStr = await loadSchema();
  if (schemaStr) {
    console.time('Pushing schema...');
    await db.query(schemaStr);
    console.timeEnd('Pushing schema...');
  } else {
    console.log('No schema found');
  }

  // TODO (hub33k): seed database
});

afterAll(async () => {
  // global teardown

  console.log('\nCleaning database...');
  const dbInfo = await db.query<{ tables: string[] }[]>('INFO FOR DB');
  const tables = Object.keys(dbInfo[0].tables);

  for (const table of tables) {
    console.time(`Removing table: ${table}`);
    await db.query(`REMOVE TABLE IF EXISTS ${table}`);
    console.timeEnd(`Removing table: ${table}`);
  }

  await db.close();
});
