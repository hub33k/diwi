import Surreal from 'surrealdb';
import { dbInfo, loadSchema, setupDb } from './utils';

let db: Surreal;

async function push() {
  console.log('Pushing schema...');
  console.time(`Schema has been pushed`);

  db = await setupDb();

  // Setup namespace and databases
  await db.query(`DEFINE NAMESPACE IF NOT EXISTS ${dbInfo.namespace};`);
  await db.use({ namespace: dbInfo.namespace, database: dbInfo.name });
  await db.query(`DEFINE DATABASE IF NOT EXISTS ${dbInfo.name};`);

  const schemaStr = await loadSchema();
  if (schemaStr) {
    await db.query(schemaStr);
  } else {
    console.log('No schema found');
  }

  console.timeEnd(`Schema has been pushed`);
}

push()
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });
