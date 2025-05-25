export default function ModulePage() {
    return (
        <main className="p-4 min-h-screen bg-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 h-screen">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">Daftar Course</h1>

                        <div className="bg-gray-200 rounded-lg p-3 mb-4 border-2 border-dashed border-gray-400">
                            <span className="text-gray-600">Search Component Box</span>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-blue-200 rounded-lg p-3 flex-1 border-2 border-dashed border-blue-400">
                                <span className="text-blue-700">Status Dropdown</span>
                            </div>
                            <div className="bg-green-200 rounded-lg p-3 flex-1 border-2 border-dashed border-green-400">
                                <span className="text-green-700">Area Dropdown</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="bg-purple-300 rounded-lg p-4 flex items-center justify-center text-purple-800 font-semibold border-2 border-dashed border-purple-500">
                                Course 1
                            </div>
                            <div className="bg-indigo-300 rounded-lg p-4 flex items-center justify-center text-indigo-800 font-semibold border-2 border-dashed border-indigo-500">
                                Course 2
                            </div>
                            <div className="bg-pink-300 rounded-lg p-4 flex items-center justify-center text-pink-800 font-semibold border-2 border-dashed border-pink-500">
                                Course 3
                            </div>
                            <div className="bg-yellow-300 rounded-lg p-4 flex items-center justify-center text-yellow-800 font-semibold border-2 border-dashed border-yellow-500">
                                Course 4
                            </div>
                            <div className="bg-red-300 rounded-lg p-4 flex items-center justify-center text-red-800 font-semibold border-2 border-dashed border-red-500">
                                Course 5
                            </div>
                            <div className="bg-teal-300 rounded-lg p-4 flex items-center justify-center text-teal-800 font-semibold border-2 border-dashed border-teal-500">
                                Course 6
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div className="bg-gray-300 rounded-lg px-4 py-2 border-2 border-dashed border-gray-500">
                                <span className="text-gray-700">← Previous</span>
                            </div>
                            <div className="bg-blue-100 rounded-lg px-4 py-2">
                                <span className="text-blue-700">Page 1 of 5</span>
                            </div>
                            <div className="bg-gray-300 rounded-lg px-4 py-2 border-2 border-dashed border-gray-500">
                                <span className="text-gray-700">Next →</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Tambahkan Module Course Baru</h2>
                                <p className="text-gray-600 text-sm mt-1">Tambahkan module untuk course </p>
                            </div>
                            <div className="bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition-colors">
                                + Module Baru
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                        <div className="bg-orange-200 rounded-lg p-6 h-full border-2 border-dashed border-orange-400 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-orange-800 font-semibold text-lg">Form Component Area</span>
                                <p className="text-orange-700 text-sm mt-2">Tempat untuk form input module baru</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}