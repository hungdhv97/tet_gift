import { ReactNode } from "react";

interface SummaryCardProps {
    icon: ReactNode;
    label: string;
    value: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
            <div className="text-3xl text-blue-500 mr-4">{icon}</div>
            <div>
                <p className="text-gray-500">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

export default SummaryCard;