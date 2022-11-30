import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Web3Provider from 'components/Provider/Web3';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </QueryClientProvider>,
  );
}

export default MyApp;
