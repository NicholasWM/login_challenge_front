import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface  IDefaultButtonProps extends ButtonProps{
    variant?: 'outline' | 'solid' | 'link',
    children: ReactNode,
}

export function DefaultButton({
    variant= 'solid',
    children,
    ...props
 }:IDefaultButtonProps){
    return (
        <Button 
            py="1.5rem" 
            colorScheme={"blue"} 
            fontSize='1.25rem' 
            fontWeight={'400'} 
            lineHeight='1.25' 
            w={['100%']} 
            size={'lg'}
            variant={variant}
            color={ variant=== 'solid' ? '#fff' : '#5b97ff'}
            bg={ variant=== 'solid' ? '#5b97ff': ''}
            {...props}
        >
            {children}
        </Button>
    )
} 