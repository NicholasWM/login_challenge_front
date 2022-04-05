import axios from 'axios'
import { parseCookies } from 'nookies'
export const authNameCookie = 'login_challenge.token'
export const backendRoutes = {
    GET: {
        protectedUserImage: '/user/image',
        getMe: '/auth/me',
    },
    POST: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
    },
    PUT:{
        updateUser: '/user'
    },
    DELETE: {
        deleteUser: '/user'
    }
}

export const api = axios.create({
    baseURL:'http://localhost:4000'
})

api.interceptors.request.use(config => {
    return config
})

export const getAuthHeaders = () => {
    const {[authNameCookie]:token} = parseCookies();
    return {"Authorization": token}
}