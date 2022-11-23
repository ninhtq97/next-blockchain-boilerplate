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

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>,
  );
}

export default MyApp;
