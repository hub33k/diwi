import type { Metadata } from 'next';
import { env } from '~/env';
import { UsersList } from './components/UsersList';

export const homePageMetadata: Metadata = {
  title: 'Home',
};

async function getUsers() {
  try {
    const res = await fetch(`${env.PAGE_URL}/api/users`);
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return [];
    }
  }
}

export const HomePage = async () => {
  const users = await getUsers();
  console.log(users);

  return (
    <>
      <h1>Home</h1>
      <p>Users count: {users.length}</p>
      <UsersList data={users} />
    </>
  );
};
