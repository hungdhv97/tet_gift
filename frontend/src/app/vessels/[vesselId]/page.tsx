import React from "react";

interface VesselDetailProps {
    params: { vesselId: string };
}

const VesselDetail: React.FC<VesselDetailProps> = ({ params }) => {
    const vesselId = params.vesselId;
    return <div>Vessel {vesselId}</div>;
};

export default VesselDetail;