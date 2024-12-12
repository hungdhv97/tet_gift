import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";
import { ENDPOINTS } from "@/utils/endpoints";

interface AddVesselPayload {
    name: string;
    imo_number: string;
    latitude: number;
    longitude: number;
    address: string;
    description: string | null;
    speed: number | null;
}

interface UpdateVesselPayload {
    vesselId: number;
    name: string | null;
    imo_number: string | null;
    latitude: number | null;
    longitude: number | null;
    address: string | null;
    description: string | null;
    speed: number | null;
}

interface DeleteVesselPayload {
    vesselId: number;
}

export const useFetchVessels = () => {
    return useQuery<VesselResponse[], Error>({
        queryKey: ["vessels"],
        queryFn: async () => {
            const { data } = await axiosInstance.get<VesselResponse[]>(
                ENDPOINTS.GET.VESSELS,
            );
            return data;
        },
    });
};

export const useAddVessel = () => {
    const queryClient = useQueryClient();

    return useMutation<VesselResponse, Error, AddVesselPayload>({
        mutationFn: async (payload) => {
            const { data } = await axiosInstance.post<VesselResponse>(
                ENDPOINTS.POST.ADD_VESSEL,
                payload,
            );
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["vessels"],
            });
        },
    });
};

export const useUpdateVessel = () => {
    const queryClient = useQueryClient();

    return useMutation<VesselResponse, Error, UpdateVesselPayload>({
        mutationFn: async ({ vesselId, ...payload }) => {
            const { data } = await axiosInstance.patch<VesselResponse>(
                ENDPOINTS.PATCH.UPDATE_REVIEW(vesselId),
                payload,
            );
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["vessels"],
            });
        },
    });
};

export const useDeleteVessel = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, DeleteVesselPayload>({
        mutationFn: async ({ vesselId }) => {
            await axiosInstance.delete(
                ENDPOINTS.DELETE.REMOVE_REVIEW(vesselId),
            );
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["vessels"],
            });
        },
    });
};
