import { Flex, FormControl, Stack, Text } from "@chakra-ui/react";
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import { DefaultButton } from "../components/DefaultButton";
import { DefaultInput } from "../components/DefaultInput";
import * as Yup from 'yup'
import { DefaultCheckbox } from "../components/DefaultCheckbox";
import DefaultFileInput from "../components/DefaultFileInput";
import { deleteValidationError, phoneRegExp, removeSpecialCharacters, setValidationErrors, ValidationSchema } from "../helpers";

type NameFields = 'name' | 'email' | 'passwordConfirmation' | 'phoneNumber' | 'password' | 'photo'
type ValidationSchemas = {
    [name in NameFields]: ValidationSchema
}

export function UserForm() {
    const [userName, setUsername] = useState('Username')
    
    const formRef = useRef(null)

    const validateSchemas: ValidationSchemas = {
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        passwordConfirmation: Yup.string().required('Digite a senha novamente!').oneOf([Yup.ref('password'), null], 'As senhas são diferentes!'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Numero inválido!'),
        photo: Yup.string()
    }

    const handleValidate = async (schemas: ValidationSchemas, name: NameFields) => {
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
                    deleteValidationError({names:['password', 'passwordConfirmation'], formRef})
                    return;
                }
            }
            
            schema = Yup.object().shape({ [name]: schemas[name] })
            if(name=== 'name'){
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
            deleteValidationError({names:[name], formRef})
            return;
        } catch (error) {
            setValidationErrors(error, formRef)
        }
    }

    const handleFormSubmit = async (data) => {
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
            console.log(data)
        } catch (err) {
            setValidationErrors(err, formRef)
        }
    }
    return (
        <Stack
            width={'100%'}
        >
            <Form noValidate={false} ref={formRef} onSubmit={handleFormSubmit}>
                <FormControl>
                    <Stack
                        spacing='1rem'
                    >
                        <Text letterSpacing={'.4px'} fontWeight='600' color="#152542" w="100%" justifyContent={'center'}>Crie sua conta</Text>
                        <Flex flexDir={'column'} align='center' justify={'space-around'}>
                            <DefaultFileInput name="photo" userName={userName}/>
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
                                id="permission"
                                name="permission"
                                label="Permissão de Acesso"
                            />
                        </Flex>
                        <DefaultButton type="submit">
                            Registrar
                        </DefaultButton>
                    </Stack>
                </FormControl>
            </Form>
        </Stack>
    )
}