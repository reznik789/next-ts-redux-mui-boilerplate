import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { wrapper } from "app/store";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import createEmotionCache from "utils/createEmotionCache";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useStore } from "react-redux";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type MyAppProps = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();
function MyApp({ Component, ...rest }: MyAppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={<Box>...Loading</Box>}
      >
        <CacheProvider value={emotionCache}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
