import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "@/utils/endpoints";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";


export const useFetchAboutPage = () => {
    return useQuery<AboutPageResponse, Error>({
        queryKey: ["about-data"],
        queryFn: async () => {
            const { data } = await axiosInstanceWithoutToken.get<AboutPageResponse>(ENDPOINTS.GET.ABOUT_PAGE);
            return data;
        },
    });
};
