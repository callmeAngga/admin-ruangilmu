const PaginationCard = () => {
    return (
        <div className="bg-[#F9FAFB] border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
                <div className="bg-[#F9FAFB] hover:bg-gray-300 hover:border-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 font-normal cursor-pointer dark:hover:bg-gray-950 rounded-lg px-4 py-2 border border-gray-300">
                    <span>← Previous</span>
                </div>
                <div className="bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 border border-gray-300 rounded px-4 py-2">
                    <span >Page 1 of 5</span>
                </div>
                <div className="bg-[#F9FAFB] hover:bg-gray-300 hover:border-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 font-normal cursor-pointer dark:hover:bg-gray-950 rounded-lg px-4 py-2 border border-gray-300">
                    <span>Next →</span>
                </div>
            </div>
        </div>
    )
};

export default PaginationCard;