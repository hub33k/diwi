import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// https://env.t3.gg/docs/nextjs

export const env = createEnv({
  server: {
    PAGE_URL: z.string().url(),
    API_URL: z.string().url(),
    ENABLE_MSW: z.coerce.boolean().default(false),
  },
  client: {
    NEXT_PUBLIC_PAGE_URL: z.string().optional(),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_ENABLE_MSW: z.coerce.boolean().default(false),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    PAGE_URL: process.env.PAGE_URL,
    API_URL: process.env.API_URL,
    ENABLE_MSW: process.env.ENABLE_MSW,

    NEXT_PUBLIC_PAGE_URL: process.env.NEXT_PUBLIC_PAGE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENABLE_MSW: process.env.NEXT_PUBLIC_ENABLE_MSW,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
