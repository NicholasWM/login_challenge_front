import { Input } from "@chakra-ui/react";

type colors = '#494d5d'

interface  IDefaultInputProps{
    type?: 'text'| 'password'| 'email',
    color?: colors,
    id: string,
    placeholder: string,
}
export function DefaultInput({
    type='text',
    color='#494d5d',
    id,
    placeholder,
 }:IDefaultInputProps){
    return (
        <Input
            focusBorderColor="#015eff" 
            fontSize='16px' 
            size='lg'
            color={color} 
            type={type}
            id={id} 
            placeholder={placeholder}
        />
    )
} 