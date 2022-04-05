import { GetServerSideProps } from 'next'
import {Avatar, Badge, Button, Flex, HStack, Stack, Table, TableContainer, Tbody, Td, Spinner, Tr, Center} from '@chakra-ui/react'
import {FcCancel, FcCheckmark} from 'react-icons/fc'
import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { useAuth } from '../contexts/Auth'
import { api, authNameCookie } from '../services'
import { useEffect, useState } from 'react'
import { userApi } from '../services/user'
import { DefaultButton } from '../components/DefaultButton'
import { parseCookies } from 'nookies'

interface IBase64 {
  uri: string
}

export default function Home() {
  const {user, signOut} = useAuth();
  const [urlProtected, setUrlProtected] = useState('')
  useEffect(()=>{
    if(Object.keys(user).length){
      userApi.getUserImage(user.id).then(data =>{ 
        const url = window.URL.createObjectURL(new Blob([data]))
        setUrlProtected(url)
      })
    }
  },[user])
  return (
    <>
      {Object.keys(user).length ?(
      <DefaultLayout title='Home'>
          <DefaultCard>
            <HStack spacing={'1rem'}>
              <Stack align={"center"}>
                <Avatar size={"lg"} src={user.imageExternalUrl}/>
                <Badge colorScheme={"green"}>Public External</Badge>
              </Stack>
              {user && (
                <>
                  <Stack align={"center"}>
                    <Avatar size={"lg"} src={`${api.defaults.baseURL}/images/${user.id}`}/>
                    <Badge colorScheme={"blue"}>Internal API</Badge>
                  </Stack>
                  <Stack align={"center"}>
                    <Avatar size={"lg"} src={urlProtected}/>
                    <Badge colorScheme={"blue"}>Internal Protected</Badge>
                  </Stack>
                </>
              )}
              </HStack>
            <TableContainer mt={"2rem"}>
              <Table size='sm' variant={'striped'}>
                <Tbody>
                    <Tr>
                      <Td>ID</Td>
                      <Td>{user.id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Nome</Td>
                      <Td>{user.name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Has Permission</Td>
                      <Td>{user.hasPermission ? (<FcCheckmark /> ): (<FcCancel/>)}</Td>
                    </Tr>
                    <Tr>
                      <Td>E-mail</Td>
                      <Td>{user.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>Telefone</Td>
                      <Td>{user.phoneNumber}</Td>
                    </Tr>
                    <Tr>
                      <Td>External Image</Td>
                      <Td>
                        <Button colorScheme={"linkedin"} size={'xs'} as="a" target={"_blank"} href={user.imageExternalUrl}>OPEN IMAGE</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Internal Image</Td>
                      <Td>
                        <Button colorScheme={"linkedin"} size={'xs'} as="a" target={"_blank"} href={`http://localhost:4000/images/${user.id}`}>OPEN IMAGE</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Internal Protected Image</Td>
                      <Td>
                        <Button colorScheme={"linkedin"} size={'xs'} as="a" target={"_blank"} href={`http://localhost:4000/user/image/${user.id}`}>OPEN IMAGE</Button>
                      </Td>
                    </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <DefaultButton mt={'2rem'}>Editar</DefaultButton>
            <DefaultButton onClick={signOut} variant="outline" mt={'1rem'}>Logout</DefaultButton>
          </DefaultCard>
          </DefaultLayout>
          ) : (
            <Center w='100%' height={'40rem'}>

              <Spinner 
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                // mt="15rem"
                size='xl'
              />
            </Center>
          )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {[authNameCookie]: token} = parseCookies(ctx)
  console.log(ctx.req.cookies);
  if(!token){
    return {
      redirect:{
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }  
}
