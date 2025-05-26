import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    Label
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

interface ReviewSentimentDataPoint {
    name: string;
    value: number;
}

const ReviewSentimentChart: React.FC = () => {
    const { data, loading, error } = useApiData<ChartData>('/dashboard/course-reviews-sentiment');

    if (loading) return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full min-h-[300px] flex flex-col animate-pulse">
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-900/30 h-full flex flex-col items-center justify-center">
            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Gagal memuat data sentimen</p>
        </div>
    );

    const chartData: ReviewSentimentDataPoint[] = data?.labels?.map((label, index) => ({
        name: label,
        value: data.datasets[0]?.data[index] || 0
    })) || [];

    const COLORS = ['#10B981', '#EF4444', '#F59E0B'];
    const TOTAL = chartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-none dark:border dark:border-gray-700 h-full flex flex-col">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-6">Distribusi Sentimen Review</h3>

            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            labelLine={false}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="#FFF"
                                    strokeWidth={2}
                                    strokeOpacity={0.5}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => [
                                `${value} (${TOTAL > 0 ? ((value / TOTAL) * 100).toFixed(1) : 0}%)`,
                                'Jumlah'
                            ]}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                color: '#111827'
                            }}
                            itemStyle={{ color: '#111827' }}
                            labelStyle={{ fontWeight: 600, color: '#111827' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            iconSize={10}
                            formatter={(value) => (
                                <span className="text-gray-600 dark:text-gray-300 text-xs">
                                    {value}
                                </span>
                            )}
                            wrapperStyle={{
                                paddingTop: '20px'
                            }}
                        />
                        <Label
                            value="Sentimen Review"
                            position="center"
                            className="text-lg font-semibold text-gray-800 dark:text-gray-200"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {chartData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                        <div
                            className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                            style={{
                                backgroundColor: COLORS[index],
                                boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.9), 0 0 0 3px ' + COLORS[index]
                            }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">{entry.name}:</span> {entry.value} (
                            {TOTAL > 0 ? ((entry.value / TOTAL) * 100).toFixed(1) : 0}%)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSentimentChart;