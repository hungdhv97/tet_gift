"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaShip } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useFetchVessels } from "@/queries/vessel";
import { useUpdateVesselPosition } from "@/queries/position";
import dynamic from "next/dynamic";

interface PositionData {
    latitude: string;
    longitude: string;
}

const Map = dynamic(() => import("@/components/PointMap"), { ssr: false });

const UpdateVesselPosition: React.FC = () => {
    const [positionData, setPositionData] = useState<PositionData>({
        latitude: "",
        longitude: "",
    });
    const [selectedVesselId, setSelectedVesselId] = useState<string>("");
    const [vessels, setVessels] = useState<{ id: number; name: string }[]>([]);
    const [errors, setErrors] = useState<{ latitude?: string; longitude?: string }>({});
    const { data: vesselList } = useFetchVessels();
    const updatePositionMutation = useUpdateVesselPosition();
    const router = useRouter();

    useEffect(() => {
        if (vesselList) {
            setVessels(vesselList);
        }
    }, [vesselList]);

    const validateForm = (): boolean => {
        let tempErrors: Partial<{ latitude: string; longitude: string }> = {};
        if (
            !positionData.latitude ||
            isNaN(Number(positionData.latitude)) ||
            Number(positionData.latitude) < -90 ||
            Number(positionData.latitude) > 90
        ) {
            tempErrors.latitude = "Vĩ độ phải nằm trong khoảng (-90 đến 90)";
        }
        if (
            !positionData.longitude ||
            isNaN(Number(positionData.longitude)) ||
            Number(positionData.longitude) < -180 ||
            Number(positionData.longitude) > 180
        ) {
            tempErrors.longitude =
                "Kinh độ phải nằm trong khoảng (-180 đến 180)";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        if (name === "vesselId") {
            setSelectedVesselId(value);
        } else {
            setPositionData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
        if (errors[name as keyof PositionData]) {
            setErrors(prev => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            updatePositionMutation.mutate(
                {
                    vessel_id: selectedVesselId,
                    latitude: positionData.latitude,
                    longitude: positionData.longitude,
                },
                {
                    onSuccess: () => {
                        router.push("/vessels");
                    },
                },
            );
        }
    };

    const handleCancel = () => {
        router.push("/vessels");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-6">
                <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
                    <div className="flex items-center mb-6">
                        <FaShip className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            Cập nhật vị trí tàu
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tìm kiếm tàu
                            </label>
                            <select
                                name="vesselId"
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md shadow-sm py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Chọn tàu</option>
                                {vessels.map(vessel => (
                                    <option key={vessel.id} value={vessel.id}>
                                        {vessel.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Vĩ độ
                            </label>
                            <input
                                type="text"
                                name="latitude"
                                value={positionData.latitude}
                                onChange={handleChange}
                                disabled={!selectedVesselId}
                                className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                                    errors.latitude ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.latitude && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AiOutlineWarning className="mr-1" /> {errors.latitude}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Kinh độ
                            </label>
                            <input
                                type="text"
                                name="longitude"
                                value={positionData.longitude}
                                onChange={handleChange}
                                disabled={!selectedVesselId}
                                className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                                    errors.longitude ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.longitude && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AiOutlineWarning className="mr-1" /> {errors.longitude}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Trở về
                            </button>
                            <button
                                type="submit"
                                disabled={!selectedVesselId}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Lưu vị trí
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Map />
        </div>
    );
};

export default UpdateVesselPosition;
