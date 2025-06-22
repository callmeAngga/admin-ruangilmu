import useApiData from "../../hooks/useApiData";
import { ExclamationIcon } from "../../assets";

interface TopUserRow {
    no: number;
    nama: string;
    total_enrollments: number;
    completed_courses: number;
}

interface TopUsersData {
    data: TopUserRow[];
}

const TopUsersTable: React.FC = () => {
    const { data, loading, error } = useApiData<TopUsersData>('/dashboard/top-users');

    if (loading) return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full shadow-sm">
            <div className="animate-pulse space-y-4">
                <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl p-6 text-red-600 dark:text-red-400 flex flex-col items-center justify-center h-full">
            <ExclamationIcon className="w-8 h-8 mb-2" />
            <p>Gagal memuat data pengguna</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-1.5 text-sm bg-red-100 dark:bg-red-900/20 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            >
                Coba Lagi
            </button>
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700  h-full flex flex-col">
            <div className="px-6 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Top Performer User</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pengguna dengan aktivitas belajar tertinggi</p>
            </div>

            <div className="flex-1 overflow-auto p-1">
                <table className="w-full">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                            <th className="p-3 font-medium text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Rank</th>
                            <th className="p-3 font-medium text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Nama</th>
                            <th className="p-3 font-medium text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Join</th>
                            <th className="p-3 font-medium text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Selesai</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data?.data?.map((user, index) => (
                            <tr
                                key={user.no || index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <td className="p-3 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {index < 3 ? (
                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mr-2 ${index === 0 ? 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-400' :
                                                    index === 1 ? 'bg-gray-400/20 text-gray-600 dark:text-gray-400' :
                                                        'bg-orange-400/20 text-orange-600 dark:text-orange-400'
                                                }`}>
                                                {user.no}
                                            </span>
                                        ) : (
                                            <span className="text-gray-600 dark:text-gray-300 ml-2">{user.no}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-3 font-medium text-gray-900 dark:text-white">
                                    {user.nama}
                                </td>
                                <td className="p-3 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                        {user.total_enrollments.toLocaleString()}
                                    </span>
                                </td>
                                <td className="p-3 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                        {user.completed_courses.toLocaleString()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data?.data?.length === 0 && (
                <div className="flex-1 flex items-center justify-center p-6 text-gray-500 dark:text-gray-400">
                    Tidak ada data pengguna
                </div>
            )}
        </div>
    );
};

export default TopUsersTable;