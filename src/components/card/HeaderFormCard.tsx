interface HeaderFormCardProps {
    judul: string;
    deskripsi: string;
    onAddClick: () => void;
}

const HeaderFormCard = ({ judul, deskripsi, onAddClick }: HeaderFormCardProps) => {
    return (
        <div className="bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {judul}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {deskripsi}
                    </p>
                </div>

                <button
                    onClick={onAddClick}
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Tambah Course
                </button>
            </div>
        </div>
    );
};

export default HeaderFormCard;