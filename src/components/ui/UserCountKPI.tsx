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

const UserCountKPI: React.FC = () => {
    const { data, loading, error } = useApiData<KPIData>('/dashboard/kpis');

    if (loading) return <div className="bg-blue-500 rounded-xl p-6 animate-pulse"></div>;
    if (error) return <div className="bg-red-500 rounded-xl p-6 text-white">Error loading data</div>;

    return (
        <KPICard
            title="Total Pengguna"
            value={data?.totalUsers || 0}
            icon={UserIcon}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            subtext="Registered users"
        />
    );
};

export default UserCountKPI;