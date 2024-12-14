interface Status {
    text: string;
    color: string;
}

export const statusMap: Record<string, Status> = {
    "active": { text: "Hoạt động", color: "bg-green-100 text-green-800" },
    "inactive": { text: "Không hoạt động", color: "bg-red-100 text-red-800" },
    "warning": { text: "Cảnh báo", color: "bg-yellow-100 text-yellow-800" },
    "maintenance": { text: "Bảo trì", color: "bg-blue-100 text-blue-800" },
    "sunk": { text: "Chìm", color: "bg-gray-100 text-gray-800" },
};