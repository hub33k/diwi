'use client';

import { Suspense, use } from 'react';
import { handlers } from '~/mocks/handlers';

// https://github.com/mswjs/examples/tree/with-next/examples/with-next

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('~/mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (
              request.url.includes('_next') ||
              request.url.includes('favicon')
            ) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);

        // console.log(worker.listHandlers());
      })
    : Promise.resolve();

export interface IMSWProviderProps extends React.PropsWithChildren {
  isEnabled?: boolean;
}

export function MSWProvider({
  children,
  isEnabled,
}: Readonly<IMSWProviderProps>) {
  if (!isEnabled) {
    return <>{children}</>;
  }

  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
