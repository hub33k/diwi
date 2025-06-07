import { afterAll, afterEach, beforeAll } from 'bun:test';
import { server } from '~/mocks/node';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
