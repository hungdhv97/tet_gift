import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import L, { LatLngTuple } from "leaflet"; // Import LatLngTuple
import { useFetchPositionHistory } from "@/queries/position";

const Map: React.FC<{ vesselId: number }> = ({ vesselId }) => {
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const { data: positionHistory } = useFetchPositionHistory();
    const statusMap: Record<string, {
        text: string;
        color: string;
    }> = {
        "active": { text: "Hoạt động", color: "bg-green-100 text-green-800" },
        "inactive": { text: "Không hoạt động", color: "bg-red-100 text-red-800" },
        "warning": { text: "Cảnh báo", color: "bg-yellow-100 text-yellow-800" },
        "maintenance": { text: "Bảo trì", color: "bg-blue-100 text-blue-800" },
        "sunk": { text: "Chìm", color: "bg-gray-100 text-gray-800" },
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
        if (positionHistory) {
            setMessages(positionHistory.filter((position) => position.id === vesselId));
        }
    }, [positionHistory, vesselId]);

    useEffect(() => {
        const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_HOST}:8000/ws/vessel-tracking/`);

        socket.onmessage = (event) => {
            const parsedData: { message: MessageResponse } = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, parsedData.message]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const generateColorFromId = (id: string): string => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = "#";
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += ("00" + value.toString(16)).substr(-2);
        }
        return color;
    };

    return (
        <MapContainer center={[15.0, 110.0]} zoom={6} style={{ height: "50vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {messages.filter((message) => message.id === vesselId).length > 0 && (
                <React.Fragment>
                    {(() => {
                        const vesselPath = messages.filter((message) => message.id === vesselId);
                        const [latestPosition] = vesselPath.slice(-1);
                        const positions: LatLngTuple[] = vesselPath.map((message) => [message.latitude, message.longitude] as LatLngTuple);

                        const pathColor = generateColorFromId(latestPosition.registration_number);

                        return (
                            <React.Fragment>
                                <Polyline positions={positions} color={pathColor} />
                                <Marker
                                    position={[latestPosition.latitude, latestPosition.longitude] as LatLngTuple}
                                    icon={statusIcons[latestPosition.status]}
                                >
                                    <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent={false}>
                                        <strong>Id:</strong> {latestPosition.id}
                                        <br /><strong>Tàu:</strong> {latestPosition.name}
                                        <br />
                                        <strong>Số đăng ký:</strong> {latestPosition.registration_number}
                                        <br />
                                        <strong>Trạng thái:</strong> <span
                                        className={`p-1 ${statusMap[latestPosition.status].color}`}>{statusMap[latestPosition.status].text}</span>
                                        <br />
                                        <strong>Thuyền trưởng:</strong> {latestPosition.captain_name}
                                        <br />
                                        <strong>Điện thoại:</strong> {latestPosition.captain_phone}
                                        <br />
                                        <strong>Thời gian:</strong> {latestPosition.created_at}
                                        <br />
                                        <strong>Tọa độ:</strong> {latestPosition.latitude}, {latestPosition.longitude}
                                    </Tooltip>
                                </Marker>
                            </React.Fragment>
                        );
                    })()}
                </React.Fragment>
            )}
        </MapContainer>
    );
};

export default Map;