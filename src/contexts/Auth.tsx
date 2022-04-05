import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { SignInProps } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { api, authNameCookie } from "../services";
import {auth} from '../services/auth'

interface AuthContextData {
    user: User,
    signIn: (props: SignInProps) => void,
    signOut: ()=> void,
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [user, setUser] = useState<User>({} as User)

    async function signIn({email, password}: SignInProps){
        const {token, ...user} = await auth.signIn({email, password})
        setCookie(undefined, authNameCookie, `Bearer ${token}`, {
            maxAge: 60 * 60 * 24, // 24 hours
        })
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        console.log(token, user)
        setUser(user)
        Router.push('/')
    }

    useEffect(()=> {
        const {[authNameCookie]: token} = parseCookies()
        if(token){
            auth.getMe().then(data => {
                setUser(data);
            })
        }
    },[])

    const signOut = ()=>{
        destroyCookie(undefined, authNameCookie);
        Router.push('/login')
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}