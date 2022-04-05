import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { UserForm } from '../forms/UserForm'

export default function SignUp() {
  return (
    <DefaultLayout title='SignUp'>
        <DefaultCard>
          <UserForm />
        </DefaultCard>
    </DefaultLayout>
  )
}
