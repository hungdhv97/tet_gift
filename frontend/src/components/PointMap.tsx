import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import io from "socket.io-client";

const Map: React.FC = () => {
    const [vesselTracking, setVesselTracking] = useState<MessageResponse[]>([
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T10:00:00Z",
            latitude: 14.1,
            longitude: 110.1,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T10:20:00Z",
            latitude: 15.5,
            longitude: 110.5,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T10:40:00Z",
            latitude: 15.8,
            longitude: 111.0,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T11:00:00Z",
            latitude: 16.7,
            longitude: 111.7,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T11:20:00Z",
            latitude: 17.5,
            longitude: 112.5,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T11:40:00Z",
            latitude: 18.0,
            longitude: 114.0,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T12:00:00Z",
            latitude: 19.0,
            longitude: 114.0,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T12:20:00Z",
            latitude: 19.5,
            longitude: 115.0,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T12:40:00Z",
            latitude: 21.0,
            longitude: 116.0,
        },
        {
            registration_number: "VN001",
            name: "Tàu Alpha",
            status: "active",
            captain_name: "Nguyễn Văn A",
            captain_phone: "0123456789",
            created_at: "2023-10-01T13:00:00Z",
            latitude: 22.0,
            longitude: 117.0,
        },
    ]);

    const statusMap: Record<string, { text: string; color: string }> = {
        active: { text: "Hoạt động", color: "bg-green-100 text-green-800" },
        inactive: { text: "Không hoạt động", color: "bg-red-100 text-red-800" },
        warning: { text: "Cảnh báo", color: "bg-yellow-100 text-yellow-800" },
        maintenance: { text: "Bảo trì", color: "bg-blue-100 text-blue-800" },
        sunk: { text: "Chìm", color: "bg-gray-100 text-gray-800" },
    };

    const statusIcons: Record<string, L.Icon> = {
        active: L.icon({
            iconUrl: "/ship-active.png",
            iconSize: [45, 45],
            iconAnchor: [15, 45],
            popupAnchor: [1, -34],
        }),
        inactive: L.icon({
            iconUrl: "/ship-inactive.png",
            iconSize: [45, 45],
            iconAnchor: [15, 45],
            popupAnchor: [1, -34],
        }),
        warning: L.icon({
            iconUrl: "/ship-warning.png",
            iconSize: [45, 45],
            iconAnchor: [15, 45],
            popupAnchor: [1, -34],
        }),
        maintenance: L.icon({
            iconUrl: "/ship-maintenance.png",
            iconSize: [45, 45],
            iconAnchor: [15, 45],
            popupAnchor: [1, -34],
        }),
        sunk: L.icon({
            iconUrl: "/ship-sunk.png",
            iconSize: [45, 45],
            iconAnchor: [15, 45],
            popupAnchor: [1, -34],
        }),
    };

    useEffect(() => {
        const socket = io("ws://localhost:8000/ws/vessel-tracking/", {
            transports: ["websocket"],
        });

        socket.on("message", (data: string) => {
            const parsedData: MessageResponse = JSON.parse(data);
            setVesselTracking((prevData) => [...prevData, parsedData]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <MapContainer center={[15.0, 110.0]} zoom={6} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {vesselTracking.length > 0 && (
                <>
                    <Marker
                        key={vesselTracking[vesselTracking.length - 1].registration_number}
                        position={[
                            vesselTracking[vesselTracking.length - 1].latitude,
                            vesselTracking[vesselTracking.length - 1].longitude,
                        ]}
                        icon={statusIcons[vesselTracking[vesselTracking.length - 1].status]}
                    >
                        <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent={false}>
                            <strong>Tàu:</strong> {vesselTracking[vesselTracking.length - 1].name}
                            <br />
                            <strong>Số đăng ký:</strong> {vesselTracking[vesselTracking.length - 1].registration_number}
                            <br />
                            <strong>Trạng thái:</strong>{" "}
                            <span
                                className={`p-1 ${statusMap[vesselTracking[vesselTracking.length - 1].status].color}`}>
                                {statusMap[vesselTracking[vesselTracking.length - 1].status].text}
                            </span>
                            <br />
                            <strong>Thuyền trưởng:</strong> {vesselTracking[vesselTracking.length - 1].captain_name}
                            <br />
                            <strong>Điện thoại:</strong> {vesselTracking[vesselTracking.length - 1].captain_phone}
                            <br />
                            <strong>Thời gian:</strong> {vesselTracking[vesselTracking.length - 1].created_at}
                            <br />
                            <strong>Tọa độ:</strong> {vesselTracking[vesselTracking.length - 1].latitude},{" "}
                            {vesselTracking[vesselTracking.length - 1].longitude}
                        </Tooltip>
                    </Marker>
                    <Polyline
                        positions={vesselTracking.map((message) => [message.latitude, message.longitude])}
                        color="blue"
                    />
                </>
            )}
        </MapContainer>
    );
};

export default Map;