import React from 'react';

interface LoadingModalProps {
    isLoading: boolean;
    message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
    isLoading,
    message = "Memproses..."
}) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-2000 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mx-4 max-w-sm w-full">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Loading Spinner */}
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-600 rounded-full animate-spin">
                            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="text-center">
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                            {message}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Mohon tunggu sebentar...
                        </p>
                    </div>

                    {/* Loading dots animation */}
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingModal;