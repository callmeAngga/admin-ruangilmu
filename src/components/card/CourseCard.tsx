import type { CourseData } from "../../types/course";

interface CourseCardProps {
    course: CourseData;
    onSelect: () => void;
}

const CourseCard = ({ course, onSelect }: CourseCardProps) => {
    const {
        course_name,
        course_description,
        course_image_cover,
        course_price,
        status,
        updated_at,
        enrollment_count,
        module_count
    } = course;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-green-800';
            case 'pending': return 'bg-yellow-800';
            default: return 'bg-gray-800';
        }
    };

    const formatPrice = (price: string) => {
        const numPrice = parseFloat(price);
        if (numPrice === 0) return 'Gratis';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(numPrice);
    };

    const formatLastUpdated = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    };

    const coverImage = `http://localhost:8000/uploads/courses/${course_image_cover}`;

    return (
        <div
            className="bg-[#F9FAFB] border border-gray-300 dark:bg-gray-900 dark:border-gray-700 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onSelect}
        >
            <div className="relative h-40 bg-gray-200">
                <img
                    src={coverImage}
                    alt={course_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "./public/image.png";
                    }}
                />

                <span className={`absolute top-2 left-2 ${getStatusColor(status)} text-white text-xs px-2 py-1 rounded-md capitalize`}>
                    {status}
                </span>
                <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                    {formatPrice(course_price)}
                </span>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2 dark:text-gray-400 hover:text-blue-600 transition-colors">
                        {course_name}
                    </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-500 mb-3 line-clamp-2">
                    {course_description}
                </p>

                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{enrollment_count} enrolled</span>
                        <span>{module_count} modules</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {formatLastUpdated(updated_at)}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect();
                            }}
                            title="Edit Course"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;