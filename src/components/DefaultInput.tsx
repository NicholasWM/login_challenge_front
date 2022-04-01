import { Text, Input } from "@chakra-ui/react";
import { useField } from "@unform/core";
import { useRef, useEffect } from "react";
import InputMask from 'react-input-mask'
type colors = '#494d5d'

interface IDefaultInputProps {
    type?: 'text' | 'password' | 'email',
    color?: colors,
    id: string,
    placeholder: string,
    name: string,
    mask?: string,
    onChange?: () => void
}
export function DefaultInput({
    type = 'text',
    color = '#494d5d',
    id,
    placeholder,
    name,
    onChange,
    ...rest
}: IDefaultInputProps) {
    const inputRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])
    return (
        <>
            <Input
                ref={inputRef}
                name={name}
                as={InputMask}
                focusBorderColor="#015eff"
                style={error && {borderColor:'red'}}
                fontSize='16px'
                size='lg'
                color={color}
                type={type}
                id={id}
                errorBorderColor='red'
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
            />
            {error && (
                <span>
                    <Text fontSize={"0.8rem"} color='red'>{error}</Text>
                </span>
            )}
        </>
    )
} 