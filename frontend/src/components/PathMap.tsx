import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import io from "socket.io-client";


const Map: React.FC = () => {
    const [messages, setMessages] = useState<MessageResponse[]>([
        {
            registration_number: "NA001",
            name: "Tàu Alpha",
            latitude: 12.194934,
            longitude: 109.225822,
            status: "sunk",
            captain_name: "Thuyền trưởng A",
            captain_phone: "123456789",
            created_at: "2023-01-01 12:00:00",
        },
        {
            registration_number: "NA002",
            name: "Tàu Beta",
            latitude: 16.05,
            longitude: 108.23,
            status: "inactive",
            captain_name: "Thuyền trưởng B",
            captain_phone: "987654321",
            created_at: "2023-02-01 14:30:00",
        },
        {
            registration_number: "NA003",
            name: "Tàu Gamma",
            latitude: 14.5,
            longitude: 119.2,
            status: "warning",
            captain_name: "Thuyền trưởng C",
            captain_phone: "456789123",
            created_at: "2023-03-01 10:15:00",
        },
        {
            registration_number: "NA004",
            name: "Tàu Delta",
            latitude: 14.25,
            longitude: 109.19,
            status: "maintenance",
            captain_name: "Thuyền trưởng D",
            captain_phone: "654321987",
            created_at: "2023-04-01 09:45:00",
        },
        {
            registration_number: "NA005",
            name: "Tàu Epsilon",
            latitude: 15.8,
            longitude: 119.0,
            status: "active",
            captain_name: "Thuyền trưởng E",
            captain_phone: "789123456",
            created_at: "2023-05-01 16:20:00",
        },
        {
            registration_number: "NA006",
            name: "Tàu Zeta",
            latitude: 10.76,
            longitude: 108,
            status: "inactive",
            captain_name: "Thuyền trưởng F",
            captain_phone: "321789654",
            created_at: "2023-06-01 11:00:00",
        },
        {
            registration_number: "NA007",
            name: "Tàu Eta",
            latitude: 17.9,
            longitude: 114.5,
            status: "sunk",
            captain_name: "Thuyền trưởng G",
            captain_phone: "159753468",
            created_at: "2023-07-01 15:10:00",
        },
        {
            registration_number: "NA008",
            name: "Tàu Theta",
            latitude: 15.14,
            longitude: 108.88,
            status: "maintenance",
            captain_name: "Thuyền trưởng H",
            captain_phone: "258741369",
            created_at: "2023-08-01 08:40:00",
        },
        {
            registration_number: "NA009",
            name: "Tàu Iota",
            latitude: 19.5,
            longitude: 117.1,
            status: "active",
            captain_name: "Thuyền trưởng I",
            captain_phone: "147258369",
            created_at: "2023-09-01 19:25:00",
        },
        {
            registration_number: "NA010",
            name: "Tàu Kappa",
            latitude: 18.68,
            longitude: 105.67,
            status: "inactive",
            captain_name: "Thuyền trưởng J",
            captain_phone: "753159846",
            created_at: "2023-10-01 21:30:00",
        },
    ]);

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
        const socket = io("ws://localhost:8000/ws/vessel-tracking/", {
            transports: ["websocket"],
        });

        socket.on("message", (data: string) => {
            const parsedData: MessageResponse = JSON.parse(data);
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                const index = updatedMessages.findIndex(
                    (v) => v.registration_number === parsedData.registration_number,
                );

                if (index >= 0) {
                    updatedMessages[index] = parsedData;
                } else {
                    updatedMessages.push(parsedData);
                }

                return updatedMessages;
            });
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
            {messages.map((message) => (
                <Marker
                    key={message.registration_number}
                    position={[message.latitude, message.longitude]}
                    icon={statusIcons[message.status]}
                >
                    <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent={false}>
                        <strong>Tàu:</strong> {message.name}
                        <br />
                        <strong>Số đăng ký:</strong> {message.registration_number}
                        <br />
                        <strong>Trạng thái:</strong> <span
                        className={`p-1 ${statusMap[message.status].color}`}>{statusMap[message.status].text}</span>
                        <br />
                        <strong>Thuyền trưởng:</strong> {message.captain_name}
                        <br />
                        <strong>Điện thoại:</strong> {message.captain_phone}
                        <br />
                        <strong>Thời gian:</strong> {message.created_at}
                        <br />
                        <strong>Tọa độ:</strong> {message.latitude}, {message.longitude}
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;