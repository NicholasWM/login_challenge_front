import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { useAuth } from '../contexts/Auth'
import { UserForm } from '../forms/UserForm'
import { authNameCookie } from '../services'

export default function Update() {
    return (
        <DefaultLayout title='Editar'>
            <DefaultCard>
                <UserForm isCreate={false} />
            </DefaultCard>
        </DefaultLayout>
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
