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

    if (loading) return <div className="bg-white rounded-xl p-6 animate-pulse"></div>;
    if (error) return <div className="bg-red-500 rounded-xl p-6 text-white">Error loading data</div>;

    const reviewStats = data?.reviewStats || {
        totalReviews: 0,
        positiveReviews: 0,
        negativeReviews: 0
    };

    return (
        <div className="bg-white border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded-lg  p-6 text-gray-700 dark:text-gray-300 hover:shadow-sm transition-all duration-300 transform hover:scale-101">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[15px]uppercase tracking-wide opacity-90">Statistik Review</h3>
                <UserIcon className="w-6 h-6 opacity-80" />
            </div>
            <div className="text-2xl font-bold mb-4">{reviewStats.totalReviews || 0}</div>
            <div className="flex justify-between text-sm">
                <span className="bg-primary text-white bg-opacity-30 px-2 py-2 rounded">
                    ↑ {reviewStats.positiveReviews || 0} Positif
                </span>
                <span className="bg-red-700 text-white bg-opacity-30 px-2 py-2 rounded">
                    ↓ {reviewStats.negativeReviews || 0} Negatif
                </span>
            </div>
        </div>
    );
};

export default ReviewStatsKPI;