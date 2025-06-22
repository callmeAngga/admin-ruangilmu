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
        <main className="p-4 min-h-screen bg-[#F9FAFB] dark:bg-gray-900">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3 space-y-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <UserCountKPI />

                        <CourseCountKPI />

                        <CompletionRatioKPI />

                        <ReviewStatsKPI />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-[500px]">
                            <UserGrowthChart />
                        </div>
                        <div className="h-[500px]">
                            <CertificatesChart />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <div className="h-[337px]">
                        <ReviewSentimentChart />
                    </div>
                    <div className="h-[337px]">
                        <UsersPerClassChart />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="min-h-[300px]">
                    <CoursesTable />
                </div>
                <div className="min-h-[300px]">
                    <TopUsersTable />
                </div>
            </div>
        </main>
    );
}