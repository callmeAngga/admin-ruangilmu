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

const CourseCountKPI: React.FC = () => {
    const { data, loading, error } = useApiData<KPIData>('/dashboard/kpis');

    if (loading) return <div className="bg-green-500 rounded-xl p-6 animate-pulse"></div>;
    if (error) return <div className="bg-red-500 rounded-xl p-6 text-white">Error loading data</div>;

    return (
        <KPICard
            title="Total Course"
            value={data?.totalCourses || 0}
            icon={UserIcon}
            subtext="Available courses"
        />
    );
};

export default CourseCountKPI;