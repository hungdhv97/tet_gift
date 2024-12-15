import { useMutation, useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "@/utils/endpoints";
import { axiosInstanceWithToken } from "@/utils/axiosConfig";


interface UpdatePositionPayload {
    vessel_id: string;
    latitude: string;
    longitude: string;
}


export const useUpdateVesselPosition = () => {
    return useMutation<any, Error, UpdatePositionPayload>({
        mutationFn: async (payload) => {
            const { data } = await axiosInstanceWithToken.post(
                ENDPOINTS.POST.UPDATE_POSITION,
                payload,
            );
            return data;
        },
    });
};


export const useFetchPositionHistory = () => {
    return useQuery<MessageResponse[], Error>({
        queryKey: ["position-history"],
        queryFn: async () => {
            const { data } = await axiosInstanceWithToken.get<MessageResponse[]>(
                ENDPOINTS.GET.POSITION_HISTORY,
            );
            return data;
        },
    });
};