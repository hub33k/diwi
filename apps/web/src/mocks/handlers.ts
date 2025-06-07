import type { TUser } from '@diwi/contracts';
import { http, HttpResponse } from 'msw';
import { getBaseUrl } from '~/utils';

const user1: TUser = {
  id: {
    id: '1',
    tb: 'user',
    toJSON: () => '1',
    equals: (_other: unknown): boolean => {
      return true;
    },
  },
  username: 'Test 1',
  email: 'nV4fW@example.com',
  password_hash: 'hash',
  name: 'Bob',
  refresh_token: null,
  created_at: new Date(),
  updated_at: new Date(),
};

const baseURL = getBaseUrl();

export const handlers = [
  http.get<never, never, TUser[]>(`${baseURL}/api/users`, () => {
    return HttpResponse.json([user1]);
  }),
];
