'use client';

import type { TUser } from '@diwi/contracts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getBaseUrl } from '~/utils';

interface IUsersListProps {
  data: TUser[];
}

export const UsersList = ({ data }: IUsersListProps) => {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    axios
      .get('/api/users', {
        baseURL: getBaseUrl(),
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error(error.message);
        }
      });
  }, []);

  return (
    <div data-testid="users">
      <p>
        UsersList client state{' '}
        <span data-testid="users-count-client">{users.length}</span>
      </p>
      <p>
        UsersList server data{' '}
        <span data-testid="users-count-server">{data.length}</span>
      </p>

      {data.map((user: TUser) => {
        return (
          <div key={user.id.toString()}>
            <p>
              {user.username} {user.email}
            </p>
          </div>
        );
      })}
    </div>
  );
};
