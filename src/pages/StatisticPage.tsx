export default function StatisticPage() {
    return (
        <main className="p-4 min-h-screen bg-gray-100 space-y-4">
            <div className="flex flex-col gap-4 h-[50vh]">
                <div className="flex flex-col lg:flex-row gap-4 flex-1">
                    <div className="flex-1 lg:w-3/4 flex flex-col gap-4">
                        <div className="flex gap-4 h-2/7">
                            <div className="bg-blue-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                                1
                            </div>
                            <div className="bg-green-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                                2
                            </div>
                            <div className="bg-yellow-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                                3
                            </div>
                            <div className="bg-purple-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                                4
                            </div>
                        </div>

                        <div className="flex gap-4 flex-1 h-5/7">
                            <div className="bg-red-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                                5
                            </div>
                            <div className="bg-indigo-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                                6
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 flex flex-col gap-4">
                        <div className="bg-pink-400 rounded-lg p-4 h-3/5 flex items-center justify-center text-white font-bold text-xl">
                            7
                        </div>
                        <div className="bg-teal-400 rounded-lg p-4 h-2/5 flex items-center justify-center text-white font-bold text-xl">
                            8
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-[50vh] min-h-[200px]">
                <div className="bg-orange-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                    9
                </div>
                <div className="bg-cyan-400 rounded-lg p-4 flex-1 flex items-center justify-center text-white font-bold text-xl">
                    10
                </div>
            </div>
        </main>
    );
}