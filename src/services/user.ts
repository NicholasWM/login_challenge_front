import { parseCookies } from "nookies";
import { api, authNameCookie, backendRoutes, getAuthHeaders } from ".";
import { DeleteUserProps, DeleteUserResponse, UpdateUserProps, UpdateUserResponse } from "../interfaces/user.interface";

// UPDATE DO USUARIO -> FAZER GETME PARA ATUALIZAR OS DADOS
// DELETE DO USUARIO -> MODAL PERGUNTANDO SE TEM CERTEZA

export const userApi = {
    getUserImage: async (userId: number): Promise<any> => {
        try {
            const { [authNameCookie]: token } = parseCookies();
            const {data} = await api.get(`${backendRoutes.GET.protectedUserImage}/${userId}`, {
                responseType: 'blob',
                headers: { "Authorization": token }
            })
            return data
        } catch (error) {
            console.log(error)            
        }
    },
    updateUser: async (updateUserProps: UpdateUserProps):Promise<UpdateUserResponse> => {
        const formData = new FormData()
        Object.keys(updateUserProps).forEach(item => {
            if(updateUserProps[item] !== undefined){
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
        return data
    },
    deleteUser: async ({id}:DeleteUserProps):Promise<DeleteUserResponse> => {
        const {data} = await api.delete(backendRoutes.DELETE.deleteUser, {data:{ id }, headers:{...getAuthHeaders()}})
        return data
    }
}