import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { SignInProps, SignUpProps } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { api, authNameCookie } from "../services";
import {auth} from '../services/auth'
import { useNotifier } from "./Notifier";

interface AuthContextData {
    user: User,
    signIn: (props: SignInProps) => void,
    signOut: ()=> void,
    signUp: (signUpProps: SignUpProps) => void
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const {toggleNotifier} = useNotifier()
    const [user, setUser] = useState<User>({} as User)

    useEffect(()=> {
        const {[authNameCookie]: token} = parseCookies()
        if(token){
            auth.getMe().then(data => {
                setUser(data);
            })
        }
    },[])

    async function signIn({email, password}: SignInProps){
        const {token, ...user} = await auth.signIn({email, password})
        setSession(token, user);
    }

    async function setSession(token:string, user: User){
        setCookie(undefined, authNameCookie, `Bearer ${token}`, {
            maxAge: 60 * 60 * 24, // 24 hours
        })
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        console.log(token, user)
        setUser(user)
        toggleNotifier({message: 'Login Efetuado com sucesso', status:'info'})
        Router.push('/')
    }

    async function signUp(signUpProps: SignUpProps){
        const {message, user: userData} = await auth.signUp(signUpProps)
        const {token, ...user} = userData
        setSession(token, user);
        toggleNotifier({message: 'Usuario criado com sucesso', status:'info'})
    }

    const signOut = ()=>{
        destroyCookie(undefined, authNameCookie);
        Router.push('/login')
        toggleNotifier({message: 'Logout efetuado com sucesso', status:'info'})
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}