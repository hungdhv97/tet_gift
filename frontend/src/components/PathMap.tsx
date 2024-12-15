import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useFetchPositionHistory } from "@/queries/position";

type StatusKey = "active" | "inactive" | "warning" | "maintenance" | "sunk";

interface StatusMap {
    [key: string]: {
        text: string;
        color: string;
    };
}

const statusMap: StatusMap = {
    active: { text: "Hoạt động", color: "bg-green-100 text-green-800" },
    inactive: { text: "Không hoạt động", color: "bg-red-100 text-red-800" },
    warning: { text: "Cảnh báo", color: "bg-yellow-100 text-yellow-800" },
    maintenance: { text: "Bảo trì", color: "bg-blue-100 text-blue-800" },
    sunk: { text: "Chìm", color: "bg-gray-100 text-gray-800" },
};

const statusIcons: { [key in StatusKey]: L.Icon<L.IconOptions> } = {
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

const VesselMarker = React.memo(({ latestPosition }: { latestPosition: MessageResponse }) => (
    <Marker
        position={[latestPosition.latitude, latestPosition.longitude]}
        icon={statusIcons[latestPosition.status as StatusKey]}
    >
        <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent={false}>
            <strong>Id:</strong> {latestPosition.id}
            <br />
            <strong>Tàu:</strong> {latestPosition.name}
            <br />
            <strong>Số đăng ký:</strong> {latestPosition.registration_number}
            <br />
            <strong>Trạng thái:</strong>{" "}
            <span className={`p-1 ${statusMap[latestPosition.status].color}`}>
                {statusMap[latestPosition.status].text}
            </span>
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
));
VesselMarker.displayName = "VesselMarker";

const VesselPath = React.memo(
    ({ vesselPath, pathColor }: { vesselPath: MessageResponse[]; pathColor: string }) => {
        const positions = vesselPath.map((message) => [message.latitude, message.longitude] as [number, number]);
        return <Polyline positions={positions} color={pathColor} />;
    },
);
VesselPath.displayName = "VesselPath";

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

const Map: React.FC = () => {
    const [messages, setMessages] = useState<Record<string, MessageResponse[]>>({});
    const { data: positionHistory } = useFetchPositionHistory();

    useEffect(() => {
        if (positionHistory) {
            const groupedMessages = positionHistory.reduce((acc: Record<string, MessageResponse[]>, message: MessageResponse) => {
                if (!acc[message.id]) {
                    acc[message.id] = [];
                }
                acc[message.id].push(message);
                return acc;
            }, {});
            setMessages(groupedMessages);
        }
    }, [positionHistory]);

    useEffect(() => {
        const protocol = process.env.NEXT_PUBLIC_HOST === "localhost:8000" ? "ws" : "wss";
        const socket = new WebSocket(`${protocol}://${process.env.NEXT_PUBLIC_HOST}/ws/vessel-tracking/`);

        socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log(parsedData);
            setMessages((prevMessages) => {
                const updatedMessages = { ...prevMessages };
                if (!updatedMessages[parsedData.message.id]) {
                    updatedMessages[parsedData.message.id] = [];
                }
                updatedMessages[parsedData.message.id] = [
                    ...updatedMessages[parsedData.message.id],
                    parsedData.message,
                ];
                return updatedMessages;
            });
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <MapContainer center={[15.0, 110.0]} zoom={6} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {Object.entries(messages).map(([id, vesselPath]) => {
                const [latestPosition] = vesselPath.slice(-1);
                const pathColor = generateColorFromId(latestPosition.registration_number);

                return (
                    <React.Fragment key={id}>
                        <VesselPath vesselPath={vesselPath} pathColor={pathColor} />
                        <VesselMarker latestPosition={latestPosition} />
                    </React.Fragment>
                );
            })}
        </MapContainer>
    );
};

export default Map;
