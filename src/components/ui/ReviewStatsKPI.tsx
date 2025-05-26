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

const ReviewStatsKPI: React.FC = () => {
    const { data, loading, error } = useApiData<KPIData>('/dashboard/kpis');

    if (loading) return <div className="bg-purple-500 rounded-xl p-6 animate-pulse"></div>;
    if (error) return <div className="bg-red-500 rounded-xl p-6 text-white">Error loading data</div>;

    const reviewStats = data?.reviewStats || {
        totalReviews: 0,
        positiveReviews: 0,
        negativeReviews: 0
    };

    return (
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide opacity-90">Statistik Review</h3>
                <UserIcon className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-2xl font-bold mb-2">{reviewStats.totalReviews || 0}</div>
            <div className="flex justify-between text-sm">
                <span className="bg-green-400 bg-opacity-30 px-2 py-1 rounded">
                    ↑ {reviewStats.positiveReviews || 0} Positif
                </span>
                <span className="bg-red-400 bg-opacity-30 px-2 py-1 rounded">
                    ↓ {reviewStats.negativeReviews || 0} Negatif
                </span>
            </div>
        </div>
    );
};

export default ReviewStatsKPI;