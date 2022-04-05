import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { api, backendRoutes, getAuthHeaders } from ".";
import { GetMeResponse, SignInProps, SignInResponse, SignUpProps, SignUpResponse } from "../interfaces/auth.interface";

export const auth = {
    signIn: async ({ email, password }: SignInProps): Promise<SignInResponse> => {
        const {data} = await api.post<SignInResponse>(backendRoutes.POST.signIn, {email, password});
        return {...data}
    },
    signUp: async (signUpProps: SignUpProps): Promise<SignUpResponse> => {
        const formData = new FormData()
        Object.keys(signUpProps).forEach(item => {
            formData.append(item, signUpProps[item])
        })
        const {data} = await api.post<SignUpResponse>(backendRoutes.POST.signUp, formData,{
            data:formData,
            headers: {
                'content-type': 'multipart/form-data',
                ...getAuthHeaders()
            }
        });
        return {...data}
    },
    getMe: async ()=> {
        const {data} = await api.get<GetMeResponse>(backendRoutes.GET.getMe, {
            headers:{...getAuthHeaders()},
        })
        console.log(data)
        return data
    }
}