import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from 'styled-components'
import { Theme } from '@/styled/theme'
import { Layout } from "@/page-components/layout";
import { Provider } from "@/store/tracked";


type NextPageWithLayout = NextComponentType<NextPageContext> & {
  getLayout? : ( page: React.ReactElement ) => React.ReactNode 
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({
  Component, 
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{ page }</Layout>)

  return (
    <Provider>
      <ThemeProvider theme={ Theme }>
        <SessionProvider session={session}>
          { getLayout(<Component {...pageProps}/>) }
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}


export default App;