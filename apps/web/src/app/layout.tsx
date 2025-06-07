import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '~/styles/globals.css';
import { env } from '~/env';
import { AppProviders } from '~/modules/App';
import { APP_DESCRIPTION, APP_KEYWORDS, APP_NAME } from '~/modules/Config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
};

if (env.ENABLE_MSW && process.env.NEXT_RUNTIME === 'nodejs') {
  const { server } = require('~/mocks/node');
  server.listen();
}

interface IRootLayoutProps extends React.PropsWithChildren {}

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
