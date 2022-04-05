import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { SignInProps, SignUpProps } from "../interfaces/auth.interface";
import { UpdateUserProps, User } from "../interfaces/user.interface";
import { api, authNameCookie } from "../services";
import { auth } from '../services/auth'
import { useNotifier } from "./Notifier";
import { userApi } from "../services/user";

interface AuthContextData {
    user: User,
    signIn: (props: SignInProps) => void,
    signOut: () => void,
    signUp: (signUpProps: SignUpProps) => void,
    updateUser: (updateUserProps: UpdateUserProps) => void,
    deleteUser: ()=>void,
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const { toggleNotifier } = useNotifier()
    const [user, setUser] = useState<User>({} as User)

    useEffect(() => {
        const { [authNameCookie]: token } = parseCookies()
        if (token) {
            auth.getMe().then(data => {
                setUser(data);
            }).catch(error => {
                destroyCookie(undefined, authNameCookie)
                console.log(error)
                Router.push('/login')
            })
        }
    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const { token, ...user } = await auth.signIn({ email, password })
            setSession(token, user);
            toggleNotifier({ message: 'Login Efetuado com sucesso', status: 'info' })
        } catch (error) {
            toggleNotifier({ message: 'Email ou senha inválidos!', status: 'error' })
        }
    }

    async function setSession(token: string, user: User) {
        setCookie(undefined, authNameCookie, `Bearer ${token}`, {
            maxAge: 60 * 60 * 24, // 24 hours
        })
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        setUser(user)
        Router.push('/')
    }

    async function signUp(signUpProps: SignUpProps) {
        const { user: userData } = await auth.signUp(signUpProps)
        const { token, ...user } = userData
        setSession(token, user);
        toggleNotifier({ message: 'Usuario criado com sucesso', status: 'info' })
    }

    async function deleteUser(){
        try {
            await userApi.deleteUser({id:user.id})
            toggleNotifier({ message: 'Usuário deletado com sucesso!', status: 'info' })   
            destroyCookie(undefined, authNameCookie);
            Router.push('/')
            
        } catch (error) {
            toggleNotifier({ message: 'Erro ao deletar usuario', status: 'error' })   
        }
    }

    async function updateUser(updateUserProps: UpdateUserProps) {
        try {
            const { status } = await userApi.updateUser(updateUserProps)
            const {...user} = await auth.getMe()
            setUser(user);
            if(status === 200){
                toggleNotifier({ message: 'Usuario atualizado com sucesso', status: 'info' })
                Router.push('/');
            }else{
                toggleNotifier({ message: 'Erro ao atualizar o usuario!', status: 'error' })
            }
        } catch (error) {
            console.log(error)            
            toggleNotifier({ message: 'Erro ao atualizar o usuario!', status: 'error' })
        }
    }

    const signOut = () => {
        destroyCookie(undefined, authNameCookie);
        Router.push('/login')
        toggleNotifier({ message: 'Logout efetuado com sucesso', status: 'info' })
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                signUp,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}