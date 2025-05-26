import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
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

interface CertificateDataPoint {
  course: string;
  certificates: number;
}

const CertificatesChart: React.FC = () => {
    const { data, loading, error } = useApiData<ChartData>('/dashboard/certificates-per-course');

    if (loading) return <div className="bg-white rounded-xl p-6 animate-pulse h-full"></div>;
    if (error) return <div className="bg-red-100 rounded-xl p-6 text-red-600">Error loading chart data</div>;

    const chartData: CertificateDataPoint[] = data?.labels?.map((label, index) => ({
        course: label.length > 20 ? label.substring(0, 20) + '...' : label,
        certificates: data.datasets[0]?.data[index] || 0
    })).filter(item => item.certificates > 0) || [];

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg h-full">
            <div className="flex items-center mb-4">
                <UserIcon className="w-5 h-5 text-indigo-500 mr-2" />
                <h3 className="font-bold text-lg text-gray-800">Sertifikat per Kursus</h3>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="certificates" fill="#6366f1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CertificatesChart;