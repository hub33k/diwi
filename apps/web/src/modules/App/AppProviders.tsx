'use client';

import { TailwindIndicator } from '~/modules/Debug';
import { ReactQueryProvider } from './ReactQueryProvider';

export interface IAppProvidersProps extends React.PropsWithChildren {}

export const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <ReactQueryProvider>
      {children}

      <TailwindIndicator />
    </ReactQueryProvider>
  );
};
