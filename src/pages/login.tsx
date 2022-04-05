import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { LoginForm } from '../forms/LoginForm'

export default function Login() {

  return (
    <DefaultLayout title='Login'>
      <DefaultCard>
        <LoginForm />
      </DefaultCard>
    </DefaultLayout>
  )
}
