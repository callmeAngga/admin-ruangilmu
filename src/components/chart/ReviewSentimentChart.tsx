import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
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

    if (loading) return <div className="bg-white rounded-xl p-6 animate-pulse h-full"></div>;
    if (error) return <div className="bg-red-100 rounded-xl p-6 text-red-600">Error loading chart data</div>;

    const chartData: ReviewSentimentDataPoint[] = data?.labels?.map((label, index) => ({
        name: label,
        value: data.datasets[0]?.data[index] || 0
    })) || [];

    const COLORS: string[] = ['#10b981', '#ef4444'];

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg h-full">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Sentimen Review</h3>
            <ResponsiveContainer width="100%" height="70%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
                {chartData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                        <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index] }}
                        ></div>
                        <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSentimentChart;