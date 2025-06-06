'use client';

import type { TUser } from '@diwi/contracts';

interface IUsersListProps {
  data: TUser[];
}

export const UsersList = ({ data }: IUsersListProps) => {
  return (
    <div>
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
