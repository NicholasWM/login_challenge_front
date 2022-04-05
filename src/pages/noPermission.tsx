import { Text } from '@chakra-ui/react'
import { DefaultButton } from '../components/DefaultButton'
import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { useAuth } from '../contexts/Auth'
export default function NoPermission() {
    const {signOut} = useAuth()
  return (
    <DefaultLayout title='NoPermission'>
        <DefaultCard>
            <Text>Você não tem permissão de acesso!</Text>
            <DefaultButton onClick={signOut} variant="outline" mt={'1rem'}>Logout</DefaultButton>
        </DefaultCard>
    </DefaultLayout>
  )
}
