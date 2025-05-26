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

    if (loading) return <div className="bg-white rounded-xl p-6 animate-pulse h-full">Loading courses...</div>;
    if (error) return <div className="bg-red-100 rounded-xl p-6 text-red-600">Error loading courses data</div>;

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg h-full flex flex-col">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Daftar Course</h3>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="text-left p-3 font-semibold text-gray-700">No</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Nama Course</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Users</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Review +</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Review -</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Kepuasan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((course, index) => (
                            <tr key={course.no || index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-3">{course.no}</td>
                                <td className="p-3 max-w-[200px]">
                                    <div className="truncate" title={course.course_name}>
                                        {course.course_name}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                        {course.enrolled_users}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                        {course.positive_reviews}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                                        {course.negative_reviews}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center">
                                        <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${course.satisfaction_percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs">{course.satisfaction_percentage}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursesTable;