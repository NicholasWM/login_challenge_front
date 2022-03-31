import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDir="column" justifyContent="center" alignItems="center" maxW="1440px">
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}
export default MyApp
