import Surreal from 'surrealdb';
import { dbInfo, setupDb } from './utils';

let db: Surreal;

async function cleanup() {
  console.log('🧹 Cleaning...');
  console.time(`🧹 Database has been cleaned`);

  db = await setupDb();
  await db.use({ namespace: dbInfo.namespace, database: dbInfo.name });

  const dbInfoQuery = await db.query<{ tables: string[] }[]>('INFO FOR DB');
  const tables = Object.keys(dbInfoQuery[0].tables);

  for (const table of tables) {
    console.log(`Removing table: ${table}`);
    await db.query(`REMOVE TABLE IF EXISTS ${table}`);
  }

  console.timeEnd(`🧹 Database has been cleaned`);
}

cleanup()
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
