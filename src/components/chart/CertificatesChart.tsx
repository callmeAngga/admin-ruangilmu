import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { DocumenTextIcon, ExclamationIcon } from "../../assets";
import useApiData from "../../hooks/useApiData";

interface ChartDataset {
    data: number[];
    [key: string]: unknown;
}

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

interface CertificateDataPoint {
    course: string;
    certificates: number;
}

const CertificatesChart: React.FC = () => {
    const { data, loading, error } = useApiData<ChartData>('/dashboard/certificates-per-course');

    if (loading) return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full">
            <div className="animate-pulse flex flex-col h-full">
                <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded"></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 h-full flex flex-col items-center justify-center text-red-600 dark:text-red-400">
            <ExclamationIcon className="w-8 h-8 mb-2" />
            <p>Gagal memuat data sertifikat</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
            >
                Coba Lagi
            </button>
        </div>
    );

    const chartData: CertificateDataPoint[] = data?.labels?.map((label, index) => ({
        course: label,
        certificates: data.datasets[0]?.data[index] || 0
    })).filter(item => item.certificates > 0) || [];

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-full shadow-sm hover:shadow-md transition-all">
            <div className="px-6 pt-5 pb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <DocumenTextIcon className="w-5 h-5 text-indigo-500 mr-2" />
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                            Sertifikat per Kursus
                        </h3>
                    </div>
                    <div className="text-sm text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                        {chartData.reduce((sum, item) => sum + item.certificates, 0)} Total
                    </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Distribusi sertifikat yang telah diterbitkan
                </p>
            </div>

            <div className="px-2 pb-2 h-[calc(100%-90px)]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            strokeOpacity={0.5}
                            horizontal={false}
                        />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: '#6b7280',
                                fontSize: 12,
                            }}
                        />
                        <YAxis
                            type="category"
                            dataKey="course"
                            width={120}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: '#4b5563',
                                fontSize: 12,
                            }}
                            tickFormatter={(value) =>
                                value.length > 15 ? `${value.substring(0, 15)}...` : value
                            }
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                fontSize: '14px',
                            }}
                            formatter={(value) => [`${value} Sertifikat`, 'Jumlah']}
                            cursor={{ fill: '#e0e7ff', fillOpacity: 0.3 }}
                        />
                        <Bar
                            dataKey="certificates"
                            name="Sertifikat"
                            fill="#6366f1"
                            radius={[0, 4, 4, 0]}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`url(#gradient-${index})`}
                                />
                            ))}
                        </Bar>
                        <defs>
                            <linearGradient
                                id="gradient-0"
                                x1="0" y1="0" x2="1" y2="0"
                            >
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CertificatesChart;