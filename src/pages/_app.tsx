import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { NotifierProvider } from '../contexts/Notifier'
import { Notifier } from '../components/Notifier'
import { AuthProvider } from '../contexts/Auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NotifierProvider>
        <AuthProvider>
          <Head>
            <title>Vlow</title>
            <meta name="description" content="Challenge CRUD" />
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Flex maxWidth={'1112px'} px="14px" m="auto" flexDir="column" justifyContent="center" alignItems="center">
            <Notifier/>
            <Component {...pageProps} />
          </Flex>
        </AuthProvider>
      </NotifierProvider>
    </ChakraProvider>
  )
}
export default MyApp
