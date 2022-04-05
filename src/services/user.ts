import { parseCookies } from "nookies";
import { api, authNameCookie, backendRoutes, getAuthHeaders } from ".";
import { UpdateUserProps, UpdateUserResponse } from "../interfaces/user.interface";

// UPDATE DO USUARIO -> FAZER GETME PARA ATUALIZAR OS DADOS
// DELETE DO USUARIO -> MODAL PERGUNTANDO SE TEM CERTEZA

export const userApi = {
    getUserImage: async (userId: number): Promise<any> => {
        const { [authNameCookie]: token } = parseCookies();
        const response = await api.get(`${backendRoutes.GET.protectedUserImage}/${userId}`, {
            responseType: 'blob',
            headers: { "Authorization": token }
        })
        return response.data
    },
    updateUser: async (updateUserProps: UpdateUserProps):Promise<UpdateUserResponse> => {
        const formData = new FormData()
        Object.keys(updateUserProps).forEach(item => {
            if(updateUserProps[item]){
                formData.append(item, updateUserProps[item])
            }
        })
        const {data} = await api.put<UpdateUserResponse>(backendRoutes.PUT.updateUser, formData,{
            data:formData,
            headers: {
                'content-type': 'multipart/form-data',
                ...getAuthHeaders()
            }
        });
        return {...data}
    }
}