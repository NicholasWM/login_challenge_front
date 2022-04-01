import { Box, Flex, Spacer, Text, useBreakpointValue } from '@chakra-ui/react'
import Head from 'next/head'
import { DefaultCard } from '../components/DefaultCard'
import { LoginForm } from '../forms/LoginForm'
import { UserForm } from '../forms/UserForm'

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: false,
    lg: true
  })
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex
        py={["1.75rem", "3.5rem", "3rem", "8rem"]}
        w="100%"
        justifyContent="space-around"
      >
        <Box maxW={['692px', '692px', '692px', '462px']} flex={["0.5", '0.8']} >
          <DefaultCard>
            <LoginForm/>
            {/* <UserForm /> */}
          </DefaultCard>

        </Box>
        {isWideVersion && (
          <Box flex="0.5">
            <Flex
              my='1rem'
              px="1rem"
              flexDir={'column'}
              align='center'
            >
              <img style={{ minWidth: '397px' }} src="https://app.vlow.com.br/static/media/account-access.58ca8ec4.svg" alt="fgImg" />
              <Text my={'2rem'} fontSize={'18px'} fontWeight="700" color={'#494d5d'} letterSpacing=".4px" textAlign={'center'}>
                Mantenha os seus dados sempre atualizados!
              </Text>
              <Text w={'90%'} fontSize={'16px'} fontWeight='400' color={'#494d5d'} letterSpacing={'.3px'} textAlign={'center'}>
                Com o Vlow ficou mais fácil gerenciar os colaboradores e ter total autonomia. Versão 3.3.0
              </Text>
            </Flex>
          </Box>
        )}
      </Flex>
    </>
  )
}
