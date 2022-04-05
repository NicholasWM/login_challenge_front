import React, { memo } from 'react'
import {
  Alert,
  Slide,
  Status
} from '@chakra-ui/react'
import { HiInformationCircle } from 'react-icons/hi'
import { useNotifier } from '../contexts/Notifier'

type INotifierColors = {
    [color in Partial<Status>]?: string
}
export const Notifier = memo(function NotifierComponent(){
    const {isNotifierActive, message, status} = useNotifier()
    const notifierColors:INotifierColors = {
        error: 'red.700',
        info: '#5b97ff',
        success: '#47e893',
        warning: 'yellow.800',
    }
    
    return (
        <>
            <Slide direction="right" in={isNotifierActive} style={{ zIndex: 10 }}>
                <Alert top="40px" right="0px" position="fixed" color={'white'} status={status} bg={notifierColors[status]} maxW="400px">
                <HiInformationCircle fontSize={'20px'} style={{marginRight: '1rem'}}/>
                    {message}
                </Alert>
            </Slide>
        </>
    )
})