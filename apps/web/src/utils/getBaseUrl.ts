import { env } from '~/env';

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'test') {
    return env.NEXT_PUBLIC_PAGE_URL;
  }

  // window.origin || env.NEXT_PUBLIC_PAGE_URL,
  const isServer = typeof window === 'undefined';
  const baseURL = isServer
    ? env.NEXT_PUBLIC_PAGE_URL || 'http://localhost:3000'
    : '';

  return baseURL;
};
