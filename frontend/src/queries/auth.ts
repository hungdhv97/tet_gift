import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";
import { ENDPOINTS } from "@/utils/endpoints";
import { setAccessToken } from "@/helpers/auth";

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
            const loginResponse = await axiosInstance.post(
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

