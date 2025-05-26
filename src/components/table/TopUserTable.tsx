import useApiData from "../../hooks/useApiData";

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

    if (loading) return <div className="bg-white rounded-xl p-6 animate-pulse h-full">Loading users...</div>;
    if (error) return <div className="bg-red-100 rounded-xl p-6 text-red-600">Error loading users data</div>;

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg h-full flex flex-col">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Top Performer User</h3>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="text-left p-3 font-semibold text-gray-700">Rank</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Nama</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Total Join</th>
                            <th className="text-left p-3 font-semibold text-gray-700">Selesai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((user, index) => (
                            <tr key={user.no || index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-3">
                                    <div className="flex items-center">
                                        {index < 3 && (
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white mr-2 ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                                                }`}>
                                                {user.no}
                                            </span>
                                        )}
                                        {index >= 3 && <span className="ml-2">{user.no}</span>}
                                    </div>
                                </td>
                                <td className="p-3 font-medium">{user.nama}</td>
                                <td className="p-3">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                        {user.total_enrollments}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                        {user.completed_courses}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopUsersTable;