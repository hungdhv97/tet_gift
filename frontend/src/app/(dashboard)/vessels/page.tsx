"use client";

import React, { useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useDeleteVessel, useFetchVessels } from "@/queries/vessel";
import { useRouter } from "next/navigation";

const VesselList: React.FC = () => {
    const { data: vessels } = useFetchVessels();
    const { mutate: deleteVessel } = useDeleteVessel();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    if (!vessels) return null;

    const handleEdit = (vesselId: number) => {
        router.push(`/vessels/${vesselId}`);
    };

    const handleDelete = (id: number) => {
        deleteVessel({ vesselId: id });
    };

    const filteredVessels = vessels.filter(vessel =>
        vessel.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="container">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Danh Sách Tàu</h2>
                    <div className="flex items-center space-x-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => router.push("/vessels/add")}
                        >
                            Thêm tàu
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm tàu..."
                                className="pl-10 pr-4 py-2 border rounded-lg"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tàu
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng Thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vị Trí
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hành Động
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVessels.map(vessel => (
                            <tr key={vessel.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            {vessel.name}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            vessel.status === "Hoạt động"
                                                ? "bg-blue-100 text-blue-800"
                                                : vessel.status ===
                                                "Không hoạt động"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {vessel.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vessel.address}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(vessel.id)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <FaEdit className="text-xl" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vessel.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VesselList;
