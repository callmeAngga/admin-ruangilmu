import useApiData from "../../hooks/useApiData";

interface ApiResponse {
    data: unknown[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

interface PaginationCardProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    searchQuery: string;
    statusFilter: string;
}

const PaginationCard = ({ currentPage, onPageChange, searchQuery, statusFilter }: PaginationCardProps) => {
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

    const { data: apiResponse, loading } = useApiData<ApiResponse>(`/courses?${buildQueryParams()}`);
    
    const pagination = apiResponse?.pagination;

    if (loading || !pagination) {
        return (
            <div className="bg-[#F9FAFB] border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                <div className="flex justify-center items-center h-12">
                    <div className="animate-pulse flex space-x-4">
                        <div className="bg-gray-300 h-4 w-20 rounded"></div>
                        <div className="bg-gray-300 h-4 w-24 rounded"></div>
                        <div className="bg-gray-300 h-4 w-20 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    const {
        totalPages,
        hasNextPage,
        hasPrevPage
    } = pagination;

    const handlePrevious = () => {
        if (hasPrevPage && currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNextPage && currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="bg-[#F9FAFB] border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={!hasPrevPage}
                    className={`px-4 py-2 border border-gray-300 rounded-lg font-normal transition-colors ${
                        hasPrevPage
                            ? 'bg-[#F9FAFB] hover:bg-gray-300 hover:border-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-950 cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    }`}
                >
                    ← Previous
                </button>

                <div className="flex items-center space-x-2">
                    {pageNumbers[0] > 1 && (
                        <>
                            <button
                                onClick={() => onPageChange(1)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-950"
                            >
                                1
                            </button>
                            {pageNumbers[0] > 2 && <span className="text-gray-500">...</span>}
                        </>
                    )}

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                                page === currentPage
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-[#F9FAFB] border-gray-300 hover:bg-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-950'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                        <>
                            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="text-gray-500">...</span>}
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-950"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={handleNext}
                    disabled={!hasNextPage}
                    className={`px-4 py-2 border border-gray-300 rounded-lg font-normal transition-colors ${
                        hasNextPage
                            ? 'bg-[#F9FAFB] hover:bg-gray-300 hover:border-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-950 cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    }`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default PaginationCard;