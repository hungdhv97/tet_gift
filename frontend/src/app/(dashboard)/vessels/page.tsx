"use client";

import React, { useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useDeleteVessel, useFetchVessels } from "@/queries/vessel";
import { useRouter } from "next/navigation";

const VesselList: React.FC = () => {
    const { data: vessels } = useFetchVessels();
    const { mutate: deleteVessel } = useDeleteVessel();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const router = useRouter();

    if (!vessels) return null;

    const handleEdit = (vesselId: number) => {
        router.push(`/vessels/${vesselId}/edit`);
    };

    const handleDelete = (id: number) => {
        deleteVessel({ vesselId: id });
    };

    const filteredVessels = vessels.filter(vessel => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            vessel.name.toLowerCase().includes(searchLower) ||
            vessel.registration_number.toLowerCase().includes(searchLower);
        const matchesStatus = filterStatus === "all" || vessel.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const statusMapping: Record<string, {
        text: string;
        color: string;
    }> = {
        "active": { text: "Hoạt động", color: "bg-green-100 text-green-800" },
        "inactive": { text: "Không hoạt động", color: "bg-red-100 text-red-800" },
        "warning": { text: "Cảnh báo", color: "bg-yellow-100 text-yellow-800" },
        "maintenance": { text: "Bảo trì", color: "bg-blue-100 text-blue-800" },
        "sunk": { text: "Chìm", color: "bg-gray-100 text-gray-800" },
    };

    return (
        <div className="container">
            <div className="bg-white p-6 rounded-lg shadow">
                <div
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
                    <h2 className="text-xl font-bold">Danh Sách Tàu</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                            onClick={() => router.push("/vessels/add")}
                        >
                            Thêm tàu
                        </button>
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Tìm kiếm tàu hoặc số đăng ký..."
                                className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-80"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <select
                            className="pl-3 pr-4 py-2 border rounded-lg w-full sm:w-auto"
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                            <option value="warning">Cảnh báo</option>
                            <option value="maintenance">Bảo trì</option>
                            <option value="sunk">Chìm</option>
                        </select>
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
                                Số Đăng Ký
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên Thuyền Trưởng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Điện Thoại Thuyền Trưởng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Địa Chỉ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng Thái
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vessel.registration_number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vessel.captain_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vessel.captain_phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vessel.address}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            statusMapping[vessel.status].color
                                        }`}
                                    >
                                        {statusMapping[vessel.status].text}
                                    </span>
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
