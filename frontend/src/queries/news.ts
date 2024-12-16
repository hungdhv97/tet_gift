import { useQuery } from "@tanstack/react-query";
import { axiosInstanceWithToken } from "@/utils/axiosConfig";
import { ENDPOINTS } from "@/utils/endpoints";

export const useFetchNews = () => {
    return useQuery<NewsPostResponse[], Error>({
        queryKey: ["news"],
        queryFn: async () => {
            const { data } = await axiosInstanceWithToken.get<NewsPostResponse[]>(
                ENDPOINTS.GET.NEWS,
            );
            return data;
        },
    });
};

export const useFetchNewsPost = (newsId: number) => {
    return useQuery<NewsPostResponse, Error>({
        queryKey: ["news", newsId],
        queryFn: async () => {
            const { data } = await axiosInstanceWithToken.get<NewsPostResponse>(
                ENDPOINTS.GET.NEWS_POST(newsId),
            );
            return data;
        },
    });
};