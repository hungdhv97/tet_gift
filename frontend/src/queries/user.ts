import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@/utils/endpoints";
import { getAccessToken, setAccessToken } from "@/helpers/auth";
import { axiosInstanceWithoutToken, axiosInstanceWithToken } from "@/utils/axiosConfig";

export const useFetchUser = () => {
    return useQuery<UserResponse | null>({
        queryKey: ["user"],
        queryFn: async () => {
            const token = getAccessToken();
            if (!token) {
                return null;
            }
            return axiosInstanceWithToken
                .get<UserResponse>(ENDPOINTS.GET.CURRENT_USER)
                .then(response => {
                    return response.data;
                });
        },
    });
};
export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
                               username,
                               password,
                           }: {
            username: string;
            password: string;
        }) => {
            const loginResponse = await axiosInstanceWithoutToken.post(
                ENDPOINTS.POST.LOGIN,
                {
                    username,
                    password,
                },
            );
            return loginResponse.data;
        },
        onSuccess: data => {
            setAccessToken(data.access_token);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};