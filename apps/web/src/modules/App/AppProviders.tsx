'use client';

import { env } from '~/env';
import { TailwindIndicator } from '~/modules/Debug';
import { MSWProvider } from './MswProvider';
import { ReactQueryProvider } from './ReactQueryProvider';

export interface IAppProvidersProps extends React.PropsWithChildren {}

export const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <MSWProvider isEnabled={env.NEXT_PUBLIC_ENABLE_MSW}>
      <ReactQueryProvider>
        {children}

        <TailwindIndicator />
      </ReactQueryProvider>
    </MSWProvider>
  );
};
