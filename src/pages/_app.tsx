import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex maxWidth={'1112px'} m="auto" flexDir="column" justifyContent="center" alignItems="center">
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}
export default MyApp
