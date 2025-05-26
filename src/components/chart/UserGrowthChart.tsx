import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
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
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    Pertumbuhan Pengguna per Bulan
                </h3>
                <div className="flex items-center space-x-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pengguna</span>
                </div>
            </div>

            <div className="px-2 pb-2 h-[calc(100%-72px)]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#6a7282 "
                            vertical={false}
                            strokeOpacity={0.5}
                        />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: '#6b7280',
                                fontSize: 12,
                                fontFamily: 'Inter, sans-serif'
                            }}
                            padding={{ left: 10, right: 10 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: '#6b7280',
                                fontSize: 12,
                                fontFamily: 'Inter, sans-serif'
                            }}
                            width={35}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                fontSize: '14px',
                                fontFamily: 'Inter, sans-serif'
                            }}
                            itemStyle={{ color: '#1f2937' }}
                            labelStyle={{
                                fontWeight: 600,
                                color: '#111827',
                                marginBottom: '4px'
                            }}
                            formatter={(value) => [`${value} Pengguna`, 'Jumlah']}
                        />
                        <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{
                                fill: '#3b82f6',
                                stroke: '#ffffff',
                                strokeWidth: 2,
                                r: 5,
                            }}
                            activeDot={{
                                r: 7,
                                fill: '#2563eb',
                                stroke: '#ffffff',
                                strokeWidth: 2
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserGrowthChart;