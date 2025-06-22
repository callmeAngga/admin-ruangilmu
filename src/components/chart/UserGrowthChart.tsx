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

    if (loading) return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-[400px]">
            <div className="animate-pulse flex flex-col h-full p-6">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 h-[400px] flex flex-col items-center justify-center text-red-600 dark:text-red-400">
            <div className="text-center">
                <p className="font-medium">Error loading chart data</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                >
                    Coba Lagi
                </button>
            </div>
        </div>
    );

    const chartData: UserGrowthDataPoint[] = data?.labels?.map((label, index) => ({
        month: label,
        users: data.datasets[0]?.data[index] || 0
    })) || [];

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-full flex flex-col">
            <div className="flex items-center justify-between px-6 pt-5 pb-2 flex-shrink-0">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    Pertumbuhan Pengguna per Bulan
                </h3>
                <div className="flex items-center space-x-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pengguna</span>
                </div>
            </div>

            <div className="flex-1 px-4 pb-4 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 15, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
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
                            width={40}
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