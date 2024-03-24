import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@/common/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Kanban task management dashboard" />
        <meta name="keywords" content="keywords, separated, by, commas" />
        <meta name="author" content="Tango" />
        <meta property="og:title" content="kanban dashboard" />
        <meta
          property="og:description"
          content="Kanban task management dashboard"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kanban.com" />
        <meta property="og:image" content="/title-kanban.png" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
