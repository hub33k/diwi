import type { TUser } from '@diwi/contracts';
import { HttpResponse, http } from 'msw';
import { getBaseUrl } from '~/utils';

const user1: TUser = {
  id: 'user:test1',
  username: 'Test 1',
  email: 'nV4fW@example.com',
  name: 'Bob',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'active',
  isEmailVerified: false,
};

const baseURL = getBaseUrl();

export const handlers = [
  http.get<never, never, TUser[]>(`${baseURL}/api/users`, () => {
    return HttpResponse.json([user1]);
  }),
];
