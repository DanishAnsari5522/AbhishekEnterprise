import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { Layout } from "../components/layout/layout";
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    let auth1 = localStorage.getItem('user');
    if (auth1) {
      setAuth(true);
    }
  })
  return (
    <NextThemesProvider defaultTheme="system" attribute="class">
      <NextUIProvider>
        {auth ?
          <Layout>
            <Component {...pageProps} />
          </Layout>
          : <Component {...pageProps} />}
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
