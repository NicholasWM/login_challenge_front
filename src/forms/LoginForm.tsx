import { Button, FormControl, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { DefaultButton } from "../components/DefaultButton";
import { DefaultInput } from "../components/DefaultInput";

export function LoginForm(){
    return (
        <FormControl isRequired>
              <Stack
                width={'100%'}
                spacing='1rem'
              >
                <Text letterSpacing={'.4px'} fontWeight='600' color="#152542" w="100%" justifyContent={'center'}>Entre na sua Conta</Text>
                <DefaultInput
                  id="email"
                  placeholder="E-mail"
                  type="email"
                  name="email"
                />
                <DefaultInput
                  id="password"
                  placeholder="Senha"
                  type="password"
                />
                <DefaultButton type="submit">
                  Entrar
                </DefaultButton>
                <DefaultButton variant="outline">
                  Cadastrar
                </DefaultButton>
              </Stack>
              <Link href="" passHref>
                <Text cursor={'pointer'} color={'#015eff'} mt="1rem" textAlign={'end'}>Esqueceu a senha?</Text>
              </Link>
            </FormControl>
    )
}