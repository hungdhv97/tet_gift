"use client";

import React, { useEffect, useState } from "react";
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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface Vessel {
    id: number;
    name: string;
    status: "Đang Vận Chuyển" | "Đã Cập Bến";
    location: string;
    coordinates: [number, number];
    image: string;
}

const ShipManagementDashboard: React.FC = () => {
    const [vessels, setVessels] = useState<Vessel[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const mockVessels: Vessel[] = [
        {
            id: 1,
            name: "Ocean Explorer",
            status: "Đang Vận Chuyển",
            location: "Đại Tây Dương",
            coordinates: [25.7617, -80.1918],
            image: "https://images.unsplash.com/photo-1566887129867-33e9d4f23087",
        },
        {
            id: 2,
            name: "Caribbean Princess",
            status: "Đã Cập Bến",
            location: "Cảng Miami",
            coordinates: [25.7742, -80.1850],
            image: "https://images.unsplash.com/photo-1589458223095-8e38f1875994",
        },
        {
            id: 3,
            name: "Pacific Voyager",
            status: "Đang Vận Chuyển",
            location: "Thái Bình Dương",
            coordinates: [37.7749, -122.4194],
            image: "https://images.unsplash.com/photo-1599008633840-052c7f756385",
        },
    ];

    useEffect(() => {
        setVessels(mockVessels);
    }, []);

    const pieChartData = {
        labels: ["Đang Vận Chuyển", "Đã Cập Bến"],
        datasets: [
            {
                data: [
                    vessels.filter(vessel => vessel.status === "Đang Vận Chuyển").length,
                    vessels.filter(vessel => vessel.status === "Đã Cập Bến").length,
                ],
                backgroundColor: ["#3B82F6", "#10B981"],
                borderColor: ["#2563EB", "#059669"],
            },
        ],
    };

    const lineChartData = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
        datasets: [
            {
                label: "Tàu Đang Vận Chuyển",
                data: [4, 3, 5, 4, 6, 5],
                borderColor: "#3B82F6",
                tension: 0.1,
            },
        ],
    };

    const handleEdit = (vessel: Vessel) => {
        setSelectedVessel(vessel);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setVessels(vessels.filter(vessel => vessel.id !== id));
    };

    const filteredVessels = vessels.filter(vessel =>
        vessel.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Bảng Điều Khiển Quản Lý Tàu</h1>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <FaShip className="text-blue-500 text-3xl mr-4" />
                            <div>
                                <p className="text-gray-500">Tổng Số Tàu</p>
                                <p className="text-2xl font-bold">{vessels.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <FaAnchor className="text-green-500 text-3xl mr-4" />
                            <div>
                                <p className="text-gray-500">Tàu Đã Cập Bến</p>
                                <p className="text-2xl font-bold">
                                    {vessels.filter(vessel => vessel.status === "Đã Cập Bến").length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <FaShip className="text-blue-500 text-3xl mr-4" />
                            <div>
                                <p className="text-gray-500">Tàu Đang Vận Chuyển</p>
                                <p className="text-2xl font-bold">
                                    {vessels.filter(vessel => vessel.status === "Đang Vận Chuyển").length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Phân Phối Trạng Thái Tàu</h2>
                        <div className="h-64">
                            <Pie data={pieChartData} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Xu Hướng Vận Chuyển Hàng Tháng</h2>
                        <div className="h-64">
                            <Line data={lineChartData} />
                        </div>
                    </div>
                </div>

                {/* Ship List */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Danh Sách Tàu</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm tàu..."
                                className="pl-10 pr-4 py-2 border rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tàu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng
                                    Thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vị
                                    Trí
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành
                                    Động
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredVessels.map((vessel) => (
                                <tr key={vessel.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={vessel.image}
                                                alt={vessel.name}
                                            />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{vessel.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              vessel.status === "Đang Vận Chuyển"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                      >
                        {vessel.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {vessel.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(vessel)}
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

                {/* Map Placeholder */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Theo Dõi Thời Gian Thực</h2>
                    <div className="h-96 bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500">Đang Xây Dựng Thành Phần Bản Đồ</p>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedVessel && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Chỉnh Sửa Chi Tiết Tàu</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tên Tàu
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                value={selectedVessel.name}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Trạng Thái
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                value={selectedVessel.status}
                                onChange={(e) =>
                                    setSelectedVessel({
                                        ...selectedVessel,
                                        status: e.target.value as "Đang Vận Chuyển" | "Đã Cập Bến",
                                    })
                                }
                            >
                                <option value="Đang Vận Chuyển">Đang Vận Chuyển</option>
                                <option value="Đã Cập Bến">Đã Cập Bến</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Lưu Thay Đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShipManagementDashboard;
