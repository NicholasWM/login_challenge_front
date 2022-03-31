import Document, {Head, Html, Main, NextScript} from 'next/document'
import { ColorModeScript } from "@chakra-ui/react"
import { theme } from './styles/theme'
import favicon from '../public/favicon.png'
import faviconAirplane from '../public/images/airplane.svg'
export default class MyDocument extends Document {
    render(){
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet"/>
                    <link rel="icon" href={favicon.src} type="image/png"/>
                    <link rel="icon" href={faviconAirplane} sizes="any" type="image/svg+xml"/>
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}