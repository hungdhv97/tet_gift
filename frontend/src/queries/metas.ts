import { useQuery } from "@tanstack/react-query";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";
import { ENDPOINTS } from "@/utils/endpoints";


export const useFetchMeta = () => {
    return useQuery<MetaResponse, Error>({
        queryKey: ["meta"],
        queryFn: async () => {
            const { data } = await axiosInstanceWithoutToken.get<MetaResponse>(
                ENDPOINTS.GET.META,
            );
            return data;
        },
    });
};


export const useFetchBanners = () => {
    return useQuery<BannerResponse[], Error>({
        queryKey: ["banners"],
        queryFn: async () => {
            const { data } = await axiosInstanceWithoutToken.get<BannerResponse[]>(
                ENDPOINTS.GET.BANNERS,
            );
            return data;
        },
    });
};
