import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Vlow</title>
        <meta name="description" content="Challenge CRUD" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Flex maxWidth={'1112px'} px="14px" m="auto" flexDir="column" justifyContent="center" alignItems="center">
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}
export default MyApp
