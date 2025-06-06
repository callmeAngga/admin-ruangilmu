import UserCountKPI from "../components/ui/UserCountKPI";
import CourseCountKPI from "../components/ui/CourseCountKPI";
import CompletionRatioKPI from "../components/ui/CompletionRatioKPI";
import ReviewStatsKPI from "../components/ui/ReviewStatsKPI";
import UserGrowthChart from "../components/chart/UserGrowthChart";
import CertificatesChart from "../components/chart/CertificatesChart";
import ReviewSentimentChart from "../components/chart/ReviewSentimentChart";   
import UsersPerClassChart from "../components/chart/UserPerClassChart";
import CoursesTable from "../components/table/CourseTable";
import TopUsersTable from "../components/table/TopUserTable";

export default function StatisticPage() {
    return (
        <main className="p-4 min-h-screen bg-[#F9FAFB] dark:bg-gray-900 space-y-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row gap-4 flex-1">
                    <div className="flex-1 lg:w-3/4 flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-1.5/6">
                            <UserCountKPI />
                            <CourseCountKPI />
                            <CompletionRatioKPI />
                            <ReviewStatsKPI />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-4.5/6">
                            <UserGrowthChart />
                            <CertificatesChart />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 flex flex-col gap-4">
                        <ReviewSentimentChart />
                        <UsersPerClassChart />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:flex-row gap-4  min-h-[200px]">
                <CoursesTable /> 
                <TopUsersTable />
            </div>
        </main>
    );
}