import { ReactNode, useEffect, useState } from "react";
import { Slide, SlideDirection, useDisclosure } from "@chakra-ui/react";
import { useSideEffects } from "../contexts/SideEffects";

interface IDefaultAnimation {
    children: ReactNode,
    direction?: SlideDirection
}

export function DefaultAnimation({children, direction='right'}: IDefaultAnimation){
    const {showScreen} = useSideEffects()
    const { isOpen, onToggle } = useDisclosure()
    useEffect(()=> {
        if(!isOpen && showScreen){
            onToggle()
        }
    },[showScreen])
    return (
    <Slide direction={direction} style={{ overflow: 'scroll' }} in={isOpen}>
        {children}
    </Slide>

    )
}