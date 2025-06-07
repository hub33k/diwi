import type { TUser } from '@diwi/contracts';
import axios from 'axios';
import type { Metadata } from 'next';
import { getBaseUrl } from '~/utils';
import { UsersList } from './components/UsersList';

export const homePageMetadata: Metadata = {
  title: 'Home',
};

async function getUsers(): Promise<TUser[]> {
  try {
    const res = await axios.get('/api/users', {
      baseURL: getBaseUrl(),
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return [];
  }
}

export const HomePage = async () => {
  const users = await getUsers();

  return (
    <>
      <h1>Home</h1>
      <UsersList data={users} />
    </>
  );
};
