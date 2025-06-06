import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useMemo } from 'react';

interface IReactQueryProviderProps {
  children: React.ReactNode;
}

export const ReactQueryProvider = ({ children }: IReactQueryProviderProps) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // biome-ignore lint/suspicious/noExplicitAny: off
            retry: (failureCount, error: any) => {
              if (error?.response.status === 502 && failureCount > 3)
                return false;
              if (error?.response.status >= 400) return false;
              return true;
            },
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
