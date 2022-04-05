import { useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";
import * as Yup from 'yup'
import { Button, Flex, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, HStack, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";

import { DefaultButton } from "../components/DefaultButton";
import { DefaultInput } from "../components/DefaultInput";
import { DefaultCheckbox } from "../components/DefaultCheckbox";
import DefaultFileInput from "../components/DefaultFileInput";

import { deleteValidationError, phoneRegExp, removeSpecialCharacters, setValidationErrors, ValidationSchemas } from "../helpers";
import Router from "next/router";
import { useAuth } from "../contexts/Auth";
import { SignUpProps } from "../interfaces/auth.interface";

type NameFields = 'name' | 'email' | 'passwordConfirmation' | 'phoneNumber' | 'password' | 'file' | 'hasPermission'
type FormValidationSchemas = {
    [name in NameFields]: any
}
interface IUserForm {
    isCreate?: boolean
}
export function UserForm({ isCreate = true }: IUserForm) {
    const { signUp, updateUser, user } = useAuth()
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
    const [userName, setUsername] = useState('Vixting')
    const formRef = useRef(null)
    useEffect(() => {
        if (isCreate) {
            formRef.current.reset()
        } else {
            if (user) {
                setUsername(user.name)
                formRef.current.setData({
                    email: user.email,
                    hasPermission: 1,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    password: '',
                    passwordConfirmation: '',
                    file: ''
                })
                console.log(formRef.current.getData())
            }
        }
    }, [user])
    const validateSchemas: FormValidationSchemas = isCreate ? {
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        passwordConfirmation: Yup.string().required('Digite a senha novamente!').oneOf([Yup.ref('password'), null], 'As senhas são diferentes!'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Numero inválido!'),
        file: Yup.string(),
        hasPermission: Yup.boolean()
    } : {
        name: Yup.string(),
        email: Yup.string().email(),
        password: Yup.string(),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas são diferentes!'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Numero inválido!'),
        file: Yup.string(),
        hasPermission: Yup.boolean()
    }

    const handleValidate = async (schemas: FormValidationSchemas, name: NameFields) => {
        try {
            let schema = {} as Yup.ObjectSchema<any>
            const fieldValue = formRef.current.getFieldValue(name)
            if (name === 'password' || name === 'passwordConfirmation') {
                if (formRef.current.getFieldValue('passwordConfirmation').length) {
                    schema = Yup.object().shape({ password: schemas['password'], 'passwordConfirmation': schemas['passwordConfirmation'], })
                    await schema.validate({
                        ['passwordConfirmation']: formRef.current.getFieldValue('passwordConfirmation'),
                        ['password']: formRef.current.getFieldValue('password')
                    }, {
                        abortEarly: false
                    })
                    deleteValidationError({ names: ['password', 'passwordConfirmation'], formRef })
                    return;
                }
            }

            schema = Yup.object().shape({ [name]: schemas[name] })
            if (name === 'name') {
                setUsername(fieldValue)
            }
            if (name === 'phoneNumber') {
                await schema.validate({ [name]: removeSpecialCharacters(fieldValue) }, {
                    abortEarly: false
                })
            } else {
                await schema.validate({ [name]: fieldValue }, {
                    abortEarly: false
                })
            }
            deleteValidationError({ names: [name], formRef })
            return;
        } catch (error) {
            setValidationErrors(error, formRef)
        }
    }

    const handleFormSubmit = async (data: SignUpProps) => {
        try {
            let formatedData = {}
            Object.keys(data).forEach(item => {
                if ('phoneNumber' === item) {
                    formatedData[item] = removeSpecialCharacters(data[item])
                } else {
                    formatedData[item] = data[item]
                }
            })
            formRef.current.setErrors({})
            const schema = Yup.object().shape(validateSchemas)
            await schema.validate(formatedData, {
                abortEarly: false
            })
            if (isCreate) {
                signUp({
                    email: data.email,
                    name: data.name,
                    password: data.password,
                    passwordConfirmation: data.passwordConfirmation,
                    phoneNumber: data.phoneNumber,
                    hasPermission: data.hasPermission,
                    file: data.file,
                })
            } else {
                updateUser({
                    id: user.id,
                    email: data?.email && user.email !== data?.email ? data?.email : undefined,
                    name: data?.name && user.name !== data?.name ? data?.name : undefined,
                    password: data?.password ? data?.password : undefined,
                    passwordConfirmation: data?.passwordConfirmation ? data?.passwordConfirmation : undefined,
                    phoneNumber: data?.phoneNumber && user.phoneNumber !== data?.phoneNumber ? data?.phoneNumber : undefined,
                    hasPermission: data?.hasPermission && user.hasPermission !== data?.hasPermission ? data?.hasPermission : undefined,
                    file: data?.file ? data?.file : undefined,
                })
                console.log(data)
            }
        } catch (err) {
            setValidationErrors(err, formRef)
        }
    }
    return (
        <Stack width={'100%'}>
            <Modal motionPreset="scale" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar Conta</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Certeza que deseja deletar sua conta?</Text>
                        <HStack mt={'2rem'} justify="space-between" align="center">
                            <Button w={'50%'} size="sm" colorScheme={"red"}>Deletar conta</Button>
                            <Button w={'50%'} size="sm" onClick={onToggle} colorScheme={"blue"}>Voltar</Button>
                        </HStack>
                    </ModalBody>
                    </ModalContent>
            </Modal>
            <Form noValidate={false} ref={formRef} onSubmit={handleFormSubmit}>
                <FormControl>
                    <Stack
                        spacing='1rem'
                    >
                        <Text letterSpacing={'.4px'} fontWeight='600' color="#152542" w="100%" justifyContent={'center'}>{isCreate ? "Crie sua conta" : "Atualize seus dados"}</Text>
                        <Flex flexDir={'column'} align='center' justify={'space-around'}>
                            <DefaultFileInput initialUrl={!isCreate ? user.imageExternalUrl : undefined} name="file" userName={userName} />
                        </Flex>
                        <DefaultInput
                            id="name"
                            placeholder="Nome"
                            name="name"
                            onChange={() => { handleValidate(validateSchemas, 'name') }}
                        />
                        <DefaultInput
                            id="email"
                            placeholder="E-mail"
                            type="email"
                            name="email"
                            onChange={() => { handleValidate(validateSchemas, 'email') }}
                        />
                        <DefaultInput
                            id="phoneNumber"
                            placeholder="Telefone"
                            name="phoneNumber"
                            mask="(99)99999-9999"
                            onChange={() => { handleValidate(validateSchemas, 'phoneNumber') }}
                        />
                        <DefaultInput
                            id="password"
                            placeholder="Senha"
                            type="password"
                            name="password"
                            onChange={() => { handleValidate(validateSchemas, 'password') }}
                        />
                        <DefaultInput
                            id="passwordConfirmation"
                            placeholder="Confirmar Senha"
                            type="password"
                            name="passwordConfirmation"
                            onChange={() => { handleValidate(validateSchemas, 'passwordConfirmation') }}
                        />
                        <Flex justify={'center'} style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                            <DefaultCheckbox
                                id="hasPermission"
                                name="hasPermission"
                                label="Permissão de Acesso"
                            />
                        </Flex>
                        {isCreate ? (
                            <>
                                <DefaultButton type="submit">
                                    Registrar
                                </DefaultButton>
                                <DefaultButton onClick={() => Router.push('/login')} variant="outline">
                                    Já possui conta?
                                </DefaultButton>
                            </>
                        ) : (
                            <>
                                <DefaultButton type="submit">
                                    Salvar
                                </DefaultButton>
                                <DefaultButton variant="outline" onClick={() => Router.push('/')}>
                                    Home
                                </DefaultButton>
                                <Button variant="outline" colorScheme={'red'} onClick={onOpen}>
                                    Deletar conta
                                </Button>
                            </>
                        )}
                    </Stack>
                </FormControl>
            </Form>
        </Stack>
    )
}