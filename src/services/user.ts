import { parseCookies } from "nookies";
import { api, authNameCookie, backendRoutes } from ".";

export const userApi = {
    getUserImage: async (userId: number): Promise<any> => {
        const {[authNameCookie]:token} = parseCookies();
        const response = await api.get(`${backendRoutes.GET.protectedUserImage}/${userId}`, {
                                    responseType: 'blob',
                                    headers:{"Authorization": token}
                                })
        return response.data
    }
}