import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";
import { ENDPOINTS } from "@/utils/endpoints";
import { getAccessToken } from "@/helpers/auth";

export const useFetchUser = () => {
    return useQuery<UserResponse | null>({
        queryKey: ["user"],
        queryFn: async () => {
            const token = getAccessToken();
            if (!token) {
                return null;
            }
            return axiosInstance
                .get<UserResponse>(ENDPOINTS.GET.CURRENT_USER)
                .then(response => {
                    return response.data;
                });
        },
    });
};
