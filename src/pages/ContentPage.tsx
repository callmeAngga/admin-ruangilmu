export default function ContentPage() {
    return (
        <main className="p-4 min-h-screen bg-[#F9FAFB] dark:bg-gray-900">
            <div className="flex flex-col lg:flex-row gap-6 h-screen">
                <div className="w-full lg:w-1/4 flex flex-col gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h1 className="text-xl font-bold mb-4 text-gray-800">Daftar Course</h1>

                        <div className="bg-gray-200 rounded-lg p-3 mb-4 border-2 border-dashed border-gray-400">
                            <span className="text-gray-600 text-sm">Search Component</span>
                        </div>

                    </div>

                    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                        <div className="grid grid-cols-1 gap-3 h-full">
                            <div className="bg-purple-300 rounded-lg p-4 flex items-center justify-center text-purple-800 font-semibold border-2 border-dashed border-purple-500">
                                Course 1
                            </div>
                            <div className="bg-indigo-300 rounded-lg p-4 flex items-center justify-center text-indigo-800 font-semibold border-2 border-dashed border-indigo-500">
                                Course 2
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gray-300 rounded-lg px-3 py-2 border-2 border-dashed border-gray-500 text-center">
                                <span className="text-gray-700 text-sm">← Previous</span>
                            </div>
                            <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
                                <span className="text-blue-700 text-sm">Page 1 of 5</span>
                            </div>
                            <div className="bg-gray-300 rounded-lg px-3 py-2 border-2 border-dashed border-gray-500 text-center">
                                <span className="text-gray-700 text-sm">Next →</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 lg:w-3/4 flex flex-col gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Tambahkan Content Baru</h2>
                                <p className="text-gray-600 mt-1">Buat konten pembelajaran baru untuk course yang tersedia</p>
                            </div>
                            <div className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition-colors">
                                + Content Baru
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                        <div className="bg-orange-200 rounded-lg p-8 h-full border-2 border-dashed border-orange-400 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-orange-800 font-bold text-2xl">Form Component Area</span>
                                <p className="text-orange-700 mt-3 text-lg">Area yang lebih luas untuk form input content baru</p>
                                <p className="text-orange-600 text-sm mt-2">Editor, upload media, metadata, dll.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}