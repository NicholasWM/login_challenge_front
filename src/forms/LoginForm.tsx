import { useRef } from "react";
import Link from "next/link";
import * as Yup from 'yup'
import { Form } from "@unform/web";
import { FormControl, Stack, Text } from "@chakra-ui/react";

import { DefaultButton } from "../components/DefaultButton";
import { DefaultInput } from "../components/DefaultInput";

import { deleteValidationError, setValidationErrors, ValidationSchemas } from "../helpers";
import { useNotifier } from "../contexts/Notifier";
import { useRouter } from "next/router";
import { auth } from "../services/auth";
import { useAuth } from "../contexts/Auth";

type NameFields = 'email' | 'password'
type FormValidationSchemas = ValidationSchemas<NameFields>

export function LoginForm() {
  const {toggleNotifier} = useNotifier()
  const {signIn} = useAuth()
  const router = useRouter()
  const formRef = useRef(null)
  const validateSchemas: FormValidationSchemas = {
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }

  const handleValidate = async (schemas: FormValidationSchemas, name: NameFields) => {
    try {
      let schema = {} as Yup.ObjectSchema<any>
      const fieldValue = formRef.current.getFieldValue(name)
      
      schema = Yup.object().shape({ [name]: schemas[name] })

      await schema.validate({ [name]: fieldValue }, {
        abortEarly: false
      })
      deleteValidationError({ names: [name], formRef })
      return;
    } catch (error) {
      setValidationErrors(error, formRef)
    }
  }

  const handleFormSubmit = async (data) => {
    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape(validateSchemas)
      await schema.validate(data, {
        abortEarly: false
      })
      signIn(data)

    } catch (err) {
      setValidationErrors(err, formRef)
    }
  }
  return (
    <Stack
      width={'100%'}
    >
      <Form noValidate={false} ref={formRef} onSubmit={handleFormSubmit}>
        <FormControl isRequired>
          <Stack
            spacing='1rem'
          >
            <Text letterSpacing={'.4px'} fontWeight='600' color="#152542" w="100%" justifyContent={'center'}>Entre na sua Conta</Text>

            <DefaultInput
              id="email"
              placeholder="E-mail"
              type="email"
              name="email"
              onChange={()=> {handleValidate(validateSchemas, 'email')}}
              />
            <DefaultInput
              id="password"
              placeholder="Senha"
              type="password"
              name="password"
              onChange={()=> {handleValidate(validateSchemas, 'password')}}
            />
            <DefaultButton onClick={()=>{}} type="submit">
              Entrar
            </DefaultButton>
            <DefaultButton onClick={()=> router.push('/signup')} variant="outline">
              Cadastrar
            </DefaultButton>
          </Stack>
          {/* <Link href="" passHref> */}
            <Text onClick={()=> {toggleNotifier({message: 'Não implementado!', status: 'warning'})}} cursor={'pointer'} color={'#015eff'} mt="1rem" textAlign={'end'}>Esqueceu a senha?</Text>
          {/* </Link> */}
        </FormControl>
      </Form>
    </Stack>
  )
}