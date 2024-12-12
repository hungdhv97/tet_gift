"use client";

import React, { useState } from "react";
import { FaAnchor, FaEdit, FaSearch, FaShip, FaTrash } from "react-icons/fa";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useDeleteVessel, useFetchVessels } from "@/queries/vessel";
import { useRouter } from "next/navigation";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

const VesselManagementDashboard: React.FC = () => {
    const { data: vessels } = useFetchVessels();
    const { mutate: deleteVessel } = useDeleteVessel();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    if (!vessels) return null;

    const pieChartData = {
        labels: ["Hoạt động", "Không hoạt động", "Đang Bảo Dưỡng"],
        datasets: [
            {
                data: [
                    vessels.filter(vessel => vessel.status === "Hoạt động")
                        .length,
                    vessels.filter(
                        vessel => vessel.status === "Không hoạt động",
                    ).length,
                    vessels.filter(vessel => vessel.status === "Đang bảo dưỡng")
                        .length,
                ],
                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
                borderColor: ["#2563EB", "#059669", "#D97706"],
            },
        ],
    };

    const lineChartData = {
        labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
        ],
        datasets: [
            {
                label: "Tàu Đang Vận Chuyển",
                data: [4, 3, 5, 4, 6, 5],
                borderColor: "#3B82F6",
                tension: 0.1,
            },
        ],
    };

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
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Bảng Điều Khiển Quản Lý Tàu
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <FaShip className="text-blue-500 text-3xl mr-4" />
                            <div>
                                <p className="text-gray-500">Tổng Số Tàu</p>
                                <p className="text-2xl font-bold">
                                    {vessels.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <FaAnchor className="text-green-500 text-3xl mr-4" />
                            <div>
                                <p className="text-gray-500">Tàu Đã Cập Bến</p>
                                <p className="text-2xl font-bold">
                                    {
                                        vessels.filter(
                                            vessel =>
                                                vessel.status ===
                                                "Không hoạt động",
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <FaShip className="text-blue-500 text-3xl mr-4" />
                            <div>
                                <p className="text-gray-500">
                                    Tàu Đang Vận Chuyển
                                </p>
                                <p className="text-2xl font-bold">
                                    {
                                        vessels.filter(
                                            vessel =>
                                                vessel.status === "Hoạt động",
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">
                            Phân Phối Trạng Thái Tàu
                        </h2>
                        <div className="h-64">
                            <Pie data={pieChartData} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">
                            Xu Hướng Vận Chuyển Hàng Tháng
                        </h2>
                        <div className="h-64">
                            <Line data={lineChartData} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Danh Sách Tàu</h2>
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
                                                    vessel.status ===
                                                    "Hoạt động"
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
                                                onClick={() =>
                                                    handleEdit(vessel.id)
                                                }
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <FaEdit className="text-xl" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(vessel.id)
                                                }
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

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">
                        Theo Dõi Thời Gian Thực
                    </h2>
                    <div className="h-96 bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500">
                            Đang Xây Dựng Thành Phần Bản Đồ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VesselManagementDashboard;
