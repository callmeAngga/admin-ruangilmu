import useApiData from "../../hooks/useApiData";

interface CourseTableRow {
    no: number;
    course_name: string;
    enrolled_users: number;
    positive_reviews: number;
    negative_reviews: number;
    satisfaction_percentage: number;
}

interface CourseTableData {
    data: CourseTableRow[];
}

const CoursesTable: React.FC = () => {
    const { data, loading, error } = useApiData<CourseTableData>('/dashboard/courses-table');

    if (loading) return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full min-h-[400px] flex flex-col animate-pulse">
            <div className="h-7 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4 flex-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
                ))}
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-900/30 h-full flex flex-col items-center justify-center">
            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Gagal memuat data kursus</p>
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-none dark:border dark:border-gray-700 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Daftar Kursus</h3>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total: {data?.data?.length || 0} kursus
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-300">No</th>
                            <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-300">Nama Kursus</th>
                            <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-300">Pengguna</th>
                            <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-300">Review +</th>
                            <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-300">Review -</th>
                            <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-300">Kepuasan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data?.data?.map((course, index) => (
                            <tr
                                key={course.no || index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <td className="p-3 text-gray-600 dark:text-gray-300">{course.no}</td>
                                <td className="p-3 max-w-[200px] 2xl:max-w-[300px]">
                                    <div
                                        className="truncate font-medium text-gray-800 dark:text-gray-200"
                                        title={course.course_name}
                                    >
                                        {course.course_name}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs min-w-[32px]">
                                        {course.enrolled_users.toLocaleString()}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs min-w-[32px]">
                                        {course.positive_reviews.toLocaleString()}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className="inline-flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-xs min-w-[32px]">
                                        {course.negative_reviews.toLocaleString()}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                                            <div
                                                className={`h-2 rounded-full ${course.satisfaction_percentage >= 70 ? 'bg-green-500' :
                                                        course.satisfaction_percentage >= 40 ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                    }`}
                                                style={{ width: `${course.satisfaction_percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600 dark:text-gray-300">
                                            {course.satisfaction_percentage}%
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data?.data?.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Tidak ada data kursus yang tersedia
                </div>
            )}
        </div>
    );
};

export default CoursesTable;