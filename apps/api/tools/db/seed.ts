import { TUser } from '@diwi/contracts';
import Surreal from 'surrealdb';
import { dbInfo, setupDb } from './utils';

let db: Surreal;

async function seed() {
  console.log('🌱 Seeding...');
  console.time(`🌱 Database has been seeded`);

  db = await setupDb();
  await db.use({ namespace: dbInfo.namespace, database: dbInfo.name });

  const totalUsers = 5;
  console.time(`👤 Created ${totalUsers} users...`);
  for (let i = 0; i < totalUsers; i++) {
    if (await isUserExists(`test${i}@test.com`)) {
      console.log('User already exists:', `test${i}@test.com`);
      continue;
    }
    await createUser(`username = "Tester ${i}", email = "test${i}@test.com";`);
  }
  console.timeEnd(`👤 Created ${totalUsers} users...`);

  console.timeEnd(`🌱 Database has been seeded`);
}

seed()
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

// Helpers
// ================================================================

async function createUser(props: string) {
  try {
    const [user] = await db.query<TUser[]>(`CREATE ONLY user SET ${props};`);
    const id = user.id;
    console.log('User created:', id.toString());
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

async function isUserExists(email: string) {
  try {
    const [user] = await db.query<TUser[]>(
      `SELECT * FROM ONLY user WHERE email = "${email}" LIMIT 1`,
    );
    if (!user) {
      return false;
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
