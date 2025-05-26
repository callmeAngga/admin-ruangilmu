import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import useApiData from "../../hooks/useApiData";

interface ChartDataset {
    data: number[];
    [key: string]: unknown;
}

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

interface UsersPerClassDataPoint {
    class: string;
    users: number;
}

const UsersPerClassChart: React.FC = () => {
    const { data, loading, error } = useApiData<ChartData>('/dashboard/users-per-class');

    if (loading) return <div className="bg-white rounded-xl p-6 animate-pulse h-full"></div>;
    if (error) return <div className="bg-red-100 rounded-xl p-6 text-red-600">Error loading chart data</div>;

    const chartData: UsersPerClassDataPoint[] = data?.labels?.map((label, index) => ({
        class: label,
        users: data.datasets[0]?.data[index] || 0
    })) || [];

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg h-full">
            <h3 className="font-bold text-lg text-gray-800 mb-4">User per Kelas</h3>
            <ResponsiveContainer width="100%" height="70%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#14b8a6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsersPerClassChart;