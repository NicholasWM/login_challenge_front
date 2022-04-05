import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { UserForm } from '../forms/UserForm'
import { authNameCookie } from '../services'

export default function SignUp() {
  return (
    <DefaultLayout title='SignUp'>
        <DefaultCard>
          <UserForm />
        </DefaultCard>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [authNameCookie]: token } = parseCookies(ctx)
  console.log(ctx.req.cookies);
  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
