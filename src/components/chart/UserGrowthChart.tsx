import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { UserIcon } from "../../assets";
import useApiData from "../../hooks/useApiData";

interface ChartDataset {
    data: number[];
    [key: string]: unknown;
}

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

interface UserGrowthDataPoint {
    month: string;
    users: number;
}

const UserGrowthChart: React.FC = () => {
    const { data, loading, error } = useApiData<ChartData>('/dashboard/user-growth');

    if (loading) return <div className="bg-white rounded-xl p-6 animate-pulse h-full"></div>;
    if (error) return <div className="bg-red-100 rounded-xl p-6 text-red-600">Error loading chart data</div>;

    const chartData: UserGrowthDataPoint[] = data?.labels?.map((label, index) => ({
        month: label,
        users: data.datasets[0]?.data[index] || 0
    })) || [];

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg h-full">
            <div className="flex items-center mb-4">
                <UserIcon className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="font-bold text-lg text-gray-800">Pertumbuhan Pengguna per Bulan</h3>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserGrowthChart;