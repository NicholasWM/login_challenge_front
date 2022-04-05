import { api, backendRoutes, getAuthHeaders } from ".";
import { GetMeResponse, SignInProps, SignInResponse } from "../interfaces/auth.interface";

export const auth = {
    signIn: async ({ email, password }: SignInProps): Promise<SignInResponse> => {
        const {data} = await api.post<SignInResponse>(backendRoutes.POST.signIn, {email, password});
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