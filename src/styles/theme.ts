import {extendTheme, Theme} from '@chakra-ui/react'

export const theme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: false
    },
    fonts:{

        heading: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif',
        body: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif',
    },
    styles:{
        global:{
            lineHeight: '1.15',
            fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif',
            color:'#152542',
            body:{
                bg: '#f8f8f8',
                maxWidth: "1440px",
                margin: "0 auto",
                fontSize:'1rem',
                color:'#626262',
                fontWeight: '400',
                lineHeight: '1.45'
                
            },
        }
    }
})