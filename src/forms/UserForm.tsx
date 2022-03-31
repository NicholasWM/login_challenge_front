import { Avatar, Checkbox, Flex, FormControl, Stack, Text } from "@chakra-ui/react";
import { DefaultButton } from "../components/DefaultButton";
import { DefaultInput } from "../components/DefaultInput";

export function UserForm() {
    return (
        <FormControl isRequired>
            <Stack
                width={'100%'}
                spacing='1rem'
            >
                <Text letterSpacing={'.4px'} fontWeight='600' color="#152542" w="100%" justifyContent={'center'}>Crie sua conta</Text>
                <Flex flexDir={'column'}  align='center' justify={'space-around'}>
                    <Avatar size='2xl' name='Name' />
                    <input style={{marginTop:'1rem'}} type="file"/>
                </Flex>
                <DefaultInput
                    id="name"
                    placeholder="Nome"
                />
                <DefaultInput
                    id="email"
                    placeholder="E-mail"
                    type="email"
                />
                <DefaultInput
                    id="cellphone"
                    placeholder="Telefone"
                />
                <DefaultInput
                    id="password"
                    placeholder="Senha"
                    type="password"
                />
                <DefaultInput
                    id="confirmPassword"
                    placeholder="Confirmar Senha"
                    type="password"
                />
                <Flex justify={'center'} style={{marginTop:'1.5rem', marginBottom:'0.5rem'}}>
                    <Checkbox size={'md'} id="permission" colorScheme='blue'>
                        Permissão de acesso
                    </Checkbox>
                </Flex>
                <DefaultButton type="submit">
                    Registrar
                </DefaultButton>
            </Stack>
        </FormControl>
    )
}