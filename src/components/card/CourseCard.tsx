interface CourseData {
    id?: string;
    name: string;
    coverImage?: string;
    profileImage?: string;
    description: string;
    price: string;
    status: 'published' | 'pending';
    slug: string;
}

interface CourseCardProps {
    course: CourseData;
    onSelect: () => void;
}

const CourseCard = ({ course, onSelect }: CourseCardProps) => {
    const {
        name,
        status,
        coverImage,
        price
    } = course;

    const lastUpdated = "2 days ago";

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-green-800';
            case 'pending': return 'bg-yellow-800';
            default: return 'bg-gray-800';
        }
    };

    const formatPrice = (price: string) => {
        const numPrice = parseInt(price);
        if (numPrice === 0) return 'Gratis';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(numPrice);
    };

    return (
        <div
            className="bg-[#F9FAFB] border border-gray-300 dark:bg-gray-900 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            onClick={onSelect}
        >
            <div className="relative h-40 bg-gray-200">
                <img
                    src={coverImage || "./public/image.png"}
                    alt={name}
                    className="w-full h-full object-cover"
                />

                <span className={`absolute top-2 left-2 ${getStatusColor(status)} text-white text-xs px-2 py-1 rounded-md capitalize`}>
                    {status}
                </span>

                {price && (
                    <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                        {formatPrice(price)}
                    </span>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2 dark:text-gray-400 hover:text-blue-600 transition-colors">
                        {name}
                    </h3>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {lastUpdated}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            className="p-2 text-gray-500 hover:text-primary hover:bg-blue-50 rounded-full transition-colors"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                onSelect();
                            }}
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