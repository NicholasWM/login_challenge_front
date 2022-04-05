import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode, useContext } from "react";

interface SideEffectsContextData {
    toggleShowScreen: ()=> void,
    showScreen: boolean
}
interface SideEffectsProviderProps {
    children: ReactNode;
}

const SideEffectsContext = createContext<SideEffectsContextData>({} as SideEffectsContextData)

export function useSideEffects() {
    return useContext(SideEffectsContext)
}

export function SideEffectsProvider({ children }: SideEffectsProviderProps): JSX.Element {
    const [showScreen, setShowScreen] = useState(false)

    const toggleShowScreen = ()=>{
        setShowScreen(!showScreen)
    }
    return (
        <SideEffectsContext.Provider value={{
            toggleShowScreen,
            showScreen
        }}>
            {children}
        </SideEffectsContext.Provider>
    )
}