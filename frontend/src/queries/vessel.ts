import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@/utils/endpoints";
import { axiosInstanceWithToken } from "@/utils/axiosConfig";

interface AddVesselPayload {
    name: string;
    registration_number: string;
    captain_name: string;
    captain_phone: string;
    latitude: string;
    longitude: string;
    status: string;
    address: string;
    description: string | null;
    speed: string | null;
}

interface UpdateVesselPayload {
    vesselId: number;
    name: string | null;
    imo_number: string | null;
    latitude: string | null;
    longitude: string | null;
    status: string;
    address: string | null;
    description: string | null;
    speed: string | null;
}

interface DeleteVesselPayload {
    vesselId: number;
}

export const useFetchVessels = () => {
    return useQuery<VesselResponse[], Error>({
        queryKey: ["vessels"],
        queryFn: async () => {
            const { data } = await axiosInstanceWithToken.get<VesselResponse[]>(
                ENDPOINTS.GET.VESSELS,
            );
            return data;
        },
    });
};

export const useFetchVessel = (vesselId: number) => {
    return useQuery<VesselResponse, Error>({
        queryKey: ["vessels", vesselId],
        queryFn: async () => {
            const { data } = await axiosInstanceWithToken.get<VesselResponse>(
                ENDPOINTS.GET.VESSEL(vesselId),
            );
            return data;
        },
    });
};

export const useAddVessel = () => {
    const queryClient = useQueryClient();

    return useMutation<VesselResponse, Error, AddVesselPayload>({
        mutationFn: async (payload) => {
            const { data } = await axiosInstanceWithToken.post<VesselResponse>(
                ENDPOINTS.POST.ADD_VESSEL,
                payload,
            );
            return data;
        },
        onSuccess: async (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["vessels"],
            });
            await axiosInstanceWithToken.post(ENDPOINTS.POST.UPDATE_POSITION, {
                vessel_id: data.id,
                latitude: variables.latitude,
                longitude: variables.longitude,
            });
        },
    });
};

export const useUpdateVessel = () => {
    const queryClient = useQueryClient();

    return useMutation<VesselResponse, Error, UpdateVesselPayload>({
        mutationFn: async ({ vesselId, ...payload }) => {
            const { data } = await axiosInstanceWithToken.patch<VesselResponse>(
                ENDPOINTS.PATCH.UPDATE_VESSEL(vesselId),
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
            await axiosInstanceWithToken.delete(
                ENDPOINTS.DELETE.REMOVE_VESSEL(vesselId),
            );
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["vessels"],
            });
        },
    });
};
