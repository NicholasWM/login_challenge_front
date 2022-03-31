import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export function DefaultCard({children}: {children:ReactNode}) {
    return (
        <Flex
            borderRadius={'16px'}
            boxShadow='0 6px 16px rgb(0 93 255 / 20%);'
            minH={'800px'}
            w="100%"
            px={'4rem'}
            flexDir={'column'}
            align={'center'}
            pb={'2rem'}
        >
            <img style={{ margin: '4rem auto' }} src="https://app.vlow.com.br/static/media/logo-vlow.12c8f13a.svg" alt="fgImg" />
            {children}
        </Flex>
    )
}