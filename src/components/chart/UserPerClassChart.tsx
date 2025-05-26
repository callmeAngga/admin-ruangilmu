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

    if (loading) return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full min-h-[300px] flex flex-col">
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-900/30 h-full flex flex-col items-center justify-center">
            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Gagal memuat data pengguna</p>
        </div>
    );

    const chartData: UsersPerClassDataPoint[] = data?.labels?.map((label, index) => ({
        class: label,
        users: data.datasets[0]?.data[index] || 0
    })) || [];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-none dark:border dark:border-gray-700 h-full flex flex-col">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-6">Distribusi Pengguna per Kelas</h3>

            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
                        barSize={30}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            strokeOpacity={0.2}
                        />
                        <XAxis
                            dataKey="class"
                            tick={{ fill: '#6b7280' }}
                            tickMargin={10}
                            axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.3 }}
                        />
                        <YAxis
                            tick={{ fill: '#6b7280' }}
                            tickMargin={10}
                            axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.3 }}
                        >
                        </YAxis>
                        <Tooltip
                            cursor={{ fill: '#f3f4f6', fillOpacity: 0.1 }}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '0.5rem',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                color: '#111827',
                                transition: 'all 0.2s'
                            }}
                            itemStyle={{ color: '#111827' }}
                            labelStyle={{ fontWeight: 600, color: '#111827' }}
                        />
                        <Bar
                            dataKey="users"
                            name="Pengguna"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                            fill="#3b82f6" 
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UsersPerClassChart;