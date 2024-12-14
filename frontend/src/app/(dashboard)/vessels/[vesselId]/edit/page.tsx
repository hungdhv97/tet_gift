"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaShip } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { useFetchVessel, useUpdateVessel } from "@/queries/vessel";

interface FormData {
    name: string;
    imoNumber: string;
    latitude: string;
    longitude: string;
    address: string;
    status: string;
    description: string;
    speed: string;
}

const EditVessel: React.FC = () => {
    const params = useParams<{ vesselId: string }>();
    const vesselId = parseInt(params.vesselId);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        imoNumber: "",
        latitude: "",
        longitude: "",
        address: "",
        status: "",
        description: "",
        speed: "",
    });
    const { data: vessel } = useFetchVessel(vesselId);
    const updateVesselMutation = useUpdateVessel();
    const router = useRouter();
    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (vessel) {
            setFormData({
                name: vessel.name || "",
                imoNumber: vessel.imo_number || "",
                latitude: vessel.latitude?.toString() || "",
                longitude: vessel.longitude?.toString() || "",
                address: vessel.address || "",
                status: vessel.status || "",
                description: vessel.description || "",
                speed: vessel.speed?.toString() || "",
            });
        }
    }, [vessel]);

    if (!vessel) return null;

    const validateForm = (): boolean => {
        let tempErrors: Partial<FormData> = {};
        if (!formData.name) tempErrors.name = "Tên tàu là bắt buộc";
        if (!formData.imoNumber || !/^IMO\d{7}$/.test(formData.imoNumber)) {
            tempErrors.imoNumber =
                "Định dạng số IMO không hợp lệ (vd., IMO1234567)";
        }
        if (
            !formData.latitude ||
            isNaN(Number(formData.latitude)) ||
            Number(formData.latitude) < -90 ||
            Number(formData.latitude) > 90
        ) {
            tempErrors.latitude = "Vĩ độ không hợp lệ (-90 đến 90)";
        }
        if (
            !formData.longitude ||
            isNaN(Number(formData.longitude)) ||
            Number(formData.longitude) < -180 ||
            Number(formData.longitude) > 180
        ) {
            tempErrors.longitude = "Kinh độ không hợp lệ (-180 đến 180)";
        }
        if (!formData.address) tempErrors.address = "Địa chỉ là bắt buộc";
        if (!formData.status) tempErrors.status = "Trạng thái là bắt buộc";
        if (
            !formData.speed ||
            isNaN(Number(formData.speed)) ||
            Number(formData.speed) <= 0
        ) {
            tempErrors.speed = "Giá trị tốc độ không hợp lệ";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            updateVesselMutation.mutate(
                {
                    vesselId,
                    name: formData.name,
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                    address: formData.address,
                    status: formData.status,
                    description: formData.description,
                    speed: formData.speed,
                    imo_number: formData.imoNumber,
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
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
                    <div className="flex items-center mb-6">
                        <FaShip className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            Chỉnh sửa tàu: {vesselId}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tên tàu
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AiOutlineWarning className="mr-1" />{" "}
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Số IMO
                                </label>
                                <input
                                    type="text"
                                    name="imoNumber"
                                    value={formData.imoNumber}
                                    onChange={handleChange}
                                    placeholder="IMO1234567"
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${errors.imoNumber ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.imoNumber && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AiOutlineWarning className="mr-1" />{" "}
                                        {errors.imoNumber}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Vĩ độ
                                </label>
                                <input
                                    type="number"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    step="any"
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${errors.latitude ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.latitude && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AiOutlineWarning className="mr-1" />{" "}
                                        {errors.latitude}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Kinh độ
                                </label>
                                <input
                                    type="number"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    step="any"
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${errors.longitude ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.longitude && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AiOutlineWarning className="mr-1" />{" "}
                                        {errors.longitude}
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Địa chỉ
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${errors.address ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AiOutlineWarning className="mr-1" />{" "}
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Trạng thái
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${errors.status ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                >
                                    <option value="">Chọn trạng thái</option>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">
                                        Không hoạt động
                                    </option>
                                    <option value="maintenance">
                                        Bảo trì
                                    </option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AiOutlineWarning className="mr-1" />{" "}
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tốc độ (hải lý)
                                </label>
                                <input
                                    type="number"
                                    name="speed"
                                    value={formData.speed}
                                    onChange={handleChange}
                                    step="0.1"
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${errors.speed ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.speed && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AiOutlineWarning className="mr-1" />{" "}
                                        {errors.speed}
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Mô tả
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md shadow-sm py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
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
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditVessel;
