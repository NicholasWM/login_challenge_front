import { GetServerSideProps } from 'next'
import Router from "next/router";
import { Avatar, Badge, Button, HStack, Stack, Table, TableContainer, Tbody, Td, Spinner, Tr, Center } from '@chakra-ui/react'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { useAuth } from '../contexts/Auth'
import { api, authNameCookie } from '../services'
import { useEffect, useState } from 'react'
import { userApi } from '../services/user'
import { DefaultButton } from '../components/DefaultButton'
import { parseCookies } from 'nookies'
import { useNotifier } from '../contexts/Notifier'


export default function Home() {
  const { user, signOut } = useAuth();
  const { toggleNotifier } = useNotifier();
  const [urlProtected, setUrlProtected] = useState('')
  useEffect(() => {
    if (Object.keys(user).length) {
      if (user.hasPermission) {
        if(user?.imageName){
          userApi.getUserImage(user?.id).then(data => {
            const url = window.URL.createObjectURL(new Blob([data]))
            setUrlProtected(url)
          }).catch(e => {
            toggleNotifier({ message: 'Erro ao buscar as imagens', status: 'error' })
          })
        }
      } else {
        Router.push('/noPermission')
        toggleNotifier({ message: 'Você não tem permissão de acesso!', status: 'warning' })
      }
    }
  }, [user])
  return (
    <>
      {Object.keys(user).length && user.hasPermission ? (
        <DefaultLayout title='Home'>
          <DefaultCard>
            <HStack spacing={'1rem'}>
              <Stack align={"center"}>
                <Avatar
                  size={"lg"}
                  onError={() => {
                    toggleNotifier({ message: 'Erro ao buscar as imagens', status: 'error' })
                  }}
                  src={user.imageExternalUrl}
                />
                <Badge colorScheme={"green"}>Public External</Badge>
              </Stack>
              {user && (
                <>
                  <Stack align={"center"}>
                    <Avatar
                      onError={() => {
                        toggleNotifier({ message: 'Erro ao buscar as imagens', status: 'error' })
                      }}
                      size={"lg"} src={user.imageName?`${api.defaults.baseURL}/images/${user.id}`:''} />
                    <Badge colorScheme={"blue"}>Internal API</Badge>
                  </Stack>
                  <Stack align={"center"}>
                    <Avatar
                      onError={() => {
                        toggleNotifier({ message: 'Erro ao buscar as imagens', status: 'error' })
                      }}
                      size={"lg"}
                      src={urlProtected}
                    />
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
                    <Td>{user?.id}</Td>
                  </Tr>
                  <Tr>
                    <Td>Nome</Td>
                    <Td>{user?.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Tem acesso</Td>
                    <Td>{user?.hasPermission ? (<FcCheckmark />) : (<FcCancel />)}</Td>
                  </Tr>
                  <Tr>
                    <Td>E-mail</Td>
                    <Td>{user?.email}</Td>
                  </Tr>
                  <Tr>
                    <Td>Telefone</Td>
                    <Td>{user?.phoneNumber}</Td>
                  </Tr>
                  <Tr>
                    <Td>External Image</Td>
                    <Td>
                      <Button colorScheme={"linkedin"} disabled={!user.imageName} size={'xs'} onClick={() => { window.open(user.imageExternalUrl, '_blank').focus(); }}>OPEN IMAGE</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Internal Image</Td>
                    <Td>
                      <Button colorScheme={"linkedin"} disabled={!user.imageName} size={'xs'} onClick={() => { window.open(`http://localhost:4000/images/${user?.id}`, '_blank').focus(); }} >OPEN IMAGE</Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Internal Protected Image</Td>
                    <Td>
                      <Button colorScheme={"linkedin"} disabled={!user.imageName} size={'xs'} onClick={() => { window.open(`http://localhost:4000/user/image/${user?.id}`, '_blank').focus(); }}>OPEN IMAGE</Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <DefaultButton onClick={() => { Router.push('/update') }} mt={'2rem'}>Editar</DefaultButton>
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
  const { [authNameCookie]: token } = parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
