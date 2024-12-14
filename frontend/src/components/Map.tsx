import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import io from "socket.io-client";

interface Vessel {
    vessel_id: string;
    name: string;
    latitude: number;
    longitude: number;
}

const Map: React.FC = () => {
    const [vessels, setVessels] = useState<Vessel[]>([
        { vessel_id: "1", name: "Vessel Alpha", latitude: 15.0, longitude: 115.5 },
        { vessel_id: "2", name: "Vessel Beta", latitude: 16.2, longitude: 114.8 },
        { vessel_id: "3", name: "Vessel Gamma", latitude: 14.5, longitude: 112.6 },
        { vessel_id: "4", name: "Vessel Delta", latitude: 13.8, longitude: 113.7 },
        { vessel_id: "5", name: "Vessel Epsilon", latitude: 16.8, longitude: 117.3 },
        { vessel_id: "6", name: "Vessel Zeta", latitude: 15.6, longitude: 116.2 },
        { vessel_id: "7", name: "Vessel Eta", latitude: 14.9, longitude: 114.0 },
        { vessel_id: "8", name: "Vessel Theta", latitude: 16.0, longitude: 113.5 },
        { vessel_id: "9", name: "Vessel Iota", latitude: 13.5, longitude: 115.1 },
        { vessel_id: "10", name: "Vessel Kappa", latitude: 14.6, longitude: 116.8 },
    ]);

    const [mapCenter, setMapCenter] = useState<[number, number]>([15.0, 115.5]);

    const DefaultIcon = L.icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        const socket = io("ws://localhost:8000/ws/vessel-tracking/");

        socket.on("message", (data: string) => {
            const parsedData: Vessel = JSON.parse(data);
            setVessels((prevVessels) => {
                const updatedVessels = [...prevVessels];
                const index = updatedVessels.findIndex(
                    (v) => v.vessel_id === parsedData.vessel_id,
                );

                if (index >= 0) {
                    updatedVessels[index] = parsedData;
                } else {
                    updatedVessels.push(parsedData);
                }

                // Update map center to the latest vessel's location
                setMapCenter([parsedData.latitude, parsedData.longitude]);

                return updatedVessels;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <MapContainer center={mapCenter} zoom={5} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {vessels.map((vessel) => (
                <Marker
                    key={vessel.vessel_id}
                    position={[vessel.latitude, vessel.longitude]}
                >
                    <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent={false}>
                        <strong>Tàu:</strong> {vessel.name}
                        <br />
                        <strong>ID:</strong> {vessel.vessel_id}
                        <br />
                        <strong>Tọa độ:</strong> {vessel.latitude}, {vessel.longitude}
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;