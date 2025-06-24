import CourseCard from "../card/CourseCard";
import useApiData from "../../hooks/useApiData";
import type { CourseData } from "../../types/course";

interface ApiResponse {
    data: CourseData[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

interface CourseListProps {
    onCourseSelect: (course: CourseData) => void;
    totalColumn?: number;
    currentPage: number;
    searchQuery: string;
    statusFilter: string;
}

const CourseList = ({ onCourseSelect, currentPage, searchQuery, statusFilter }: CourseListProps) => {
    const buildQueryParams = () => {
        const params = new URLSearchParams();
        params.append('page', currentPage.toString());
        params.append('limit', '6');

        if (searchQuery.trim()) {
            params.append('search', searchQuery.trim());
        }

        if (statusFilter) {
            params.append('status', statusFilter);
        }

        return params.toString();
    };

    const { data: apiResponse, loading, error } = useApiData<ApiResponse>(`/courses?${buildQueryParams()}`);

    if (loading) {
        return (
            <div className="flex-1 bg-white border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 bg-white border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center text-red-600 dark:text-red-400">
                        <p className="text-lg font-medium">Error loading courses</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const courses = apiResponse?.data || [];

    if (courses.length === 0) {
        return (
            <div className="flex-1 bg-white border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p className="text-lg font-medium">No courses found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
                {courses.map((course) => (
                    <CourseCard
                        key={course.course_id}
                        course={course}
                        onSelect={() => onCourseSelect(course)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseList;