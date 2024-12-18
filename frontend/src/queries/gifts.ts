import { useQuery } from "@tanstack/react-query";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";
import { ENDPOINTS } from "@/utils/endpoints";


export const useFetchGifts = () => {
    return useQuery<GiftResponse[], Error>({
        queryKey: ["gifts"],
        queryFn: async () => {
            const { data } = await axiosInstanceWithoutToken.get<GiftResponse[]>(
                ENDPOINTS.GET.GIFTS,
            );
            return data;
        },
    });
};
