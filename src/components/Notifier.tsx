import React, { memo } from 'react'
import {
  Alert,
  AlertIcon,
  Slide,
  Status
} from '@chakra-ui/react'
import { useNotifier } from '../contexts/Notifier'
type INotifierColors = {
    [color in Partial<Status>]?: string
}
export const Notifier = memo(function NotifierComponent(){
    const {isNotifierActive, message, status} = useNotifier()
    const notifierColors:INotifierColors = {
        error: 'red.800',
        info: 'blue.500',
        success: 'green.600',
        warning: 'yellow.800',
    }
    return (
        <>
            <Slide direction="right" in={isNotifierActive} style={{ zIndex: 10 }}>
                <Alert top="40px" right="0px" position="fixed" color={'white'} status={status} bg={notifierColors[status]} maxW="400px">
                <AlertIcon />
                    {message}
                </Alert>
            </Slide>
        </>
    )
})