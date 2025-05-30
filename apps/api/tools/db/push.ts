import Surreal from 'surrealdb';
import { loadSchema, setupDb } from './utils';

const namespace = process.env.SURREALDB_NS;
const database = process.env.SURREALDB_DB;

let db: Surreal;

async function push() {
  db = await setupDb();

  // Setup namespace and databases
  await db.query(`DEFINE NAMESPACE IF NOT EXISTS ${namespace};`);
  await db.use({ namespace: namespace, database: database });
  await db.query(`DEFINE DATABASE IF NOT EXISTS ${database};`);

  const schemaStr = await loadSchema();
  if (schemaStr) {
    console.log('Pushing schema...');
    await db.query(schemaStr);
  } else {
    console.log('No schema found');
  }
}

push().finally(async () => {
  await db.close();
});
