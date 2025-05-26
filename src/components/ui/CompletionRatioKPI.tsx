import KPICard from "../card/KPICard";
import useApiData from "../../hooks/useApiData";
import { UserIcon } from "../../assets";

interface KPIData {
    totalUsers: number;
    totalCourses: number;
    completionRatio: number;
    reviewStats: {
        totalReviews: number;
        positiveReviews: number;
        negativeReviews: number;
    };
}


const CompletionRatioKPI: React.FC = () => {
    const { data, loading, error } = useApiData<KPIData>('/dashboard/kpis');

    if (loading) return <div className="bg-yellow-500 rounded-xl p-6 animate-pulse"></div>;
    if (error) return <div className="bg-red-500 rounded-xl p-6 text-white">Error loading data</div>;

    return (
        <KPICard
            title="Rasio Penyelesaian"
            value={data?.completionRatio?.toFixed(2) || '0.00'}
            icon={UserIcon}
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            subtext="Completion rate"
        />
    );
};

export default CompletionRatioKPI;