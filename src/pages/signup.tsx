import { Box, Flex, Spacer, Text, useBreakpointValue } from '@chakra-ui/react'
import Head from 'next/head'
import { DefaultCard } from '../components/DefaultCard'
import DefaultLayout from '../components/DefaultLayout'
import { LoginForm } from '../forms/LoginForm'
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
