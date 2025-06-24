import { useState } from 'react';
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
import LoadingModal from '../components/LoadingModal';

export default function StatisticPage() {
    const [isLoadingPage, setIsLoadingPage] = useState(false);

    const handleRefresh = () => {
        setIsLoadingPage(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <main className="p-4 min-h-screen bg-[#F9FAFB] dark:bg-gray-900">
            <div className="relative mb-6 p-6 rounded-2xl overflow-hidden shadow-md 
                        bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 
                        dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"> 

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-60"></div>
                                <svg className="relative z-10 w-8 h-8 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center md:space-x-3">
                                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                                    Dashboard Analitik
                                </h1>
                                <span className="px-4 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
                                    Ruang Ilmu
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleRefresh}
                        disabled={isLoadingPage}
                        className="group flex items-center space-x-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                               dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900"
                        title="Refresh Data"
                    >
                        <svg
                            className={`w-5 h-5 transition-transform duration-300 ${isLoadingPage ? 'animate-spin' : 'group-hover:rotate-180'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 12c0 2.972 1.157 5.726 3.057 7.742M20 20v-5h-.581m0 0a8.001 8.001 0 01-15.357-2c0-2.972 1.157-5.726 3.057-7.742"
                            />
                        </svg>
                        <span className="hidden sm:inline">Refresh Data</span>
                    </button>
                </div>
            </div>

            {/* Layout Asli yang Sudah Bagus */}
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

            <LoadingModal isLoading={isLoadingPage} message="Memuat ulang data dashboard..." />
        </main>
    );
}