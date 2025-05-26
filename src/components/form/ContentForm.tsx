import { useState, useEffect } from 'react';
import { ModuleNameIcon, DeskripsiIcon } from "../../assets"

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

interface ModuleFormProps {
    courseData?: CourseData | null;
    isActive: boolean;
    mode: 'add' | 'edit' | 'view';
    onSave: (data: CourseData) => void;
    onCancel?: () => void;
}

const ContentForm: React.FC<ModuleFormProps> = ({
    courseData = null,
    isActive = false,
    mode = 'view'
}) => {
    const [formData, setFormData] = useState<CourseData>({
        name: '',
        description: '',
        price: '',
        status: 'pending',
        slug: ''
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string>('');

    console.log('Profile Image:', profileImage);

    useEffect(() => {
        if (courseData && mode !== 'add') {
            setFormData({
                id: courseData.id,
                name: courseData.name || '',
                description: courseData.description || '',
                price: courseData.price || '',
                status: courseData.status,
                slug: courseData.slug || ''
            });

            if (courseData.profileImage) {
                setProfilePreview(courseData.profileImage);
            }

        } else if (mode === 'add') {
            // Reset form untuk mode add
            setFormData({
                name: '',
                description: '',
                price: '',
                status: 'pending',
                slug: ''
            });
            setProfilePreview('');
            setProfileImage(null);
        }
    }, [courseData, mode]);

    const ModuleCard = () => {
        return (
            <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-center gap-3">
                        <h3 className="text-md font-normal text-gray-800 dark:text-white">Module : 1</h3>
                    </div>

                    <button
                        className="p-2 text-white rounded-xl bg-secondary hover:bg-[#435e74] transition-colors"
                        aria-label="Edit module"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    {/* Tambahkan tombol save dengan svg jika user sudah klik tombol edit */}
                </div>

                <div className="p-4 space-y-4 dark:bg-gray-800">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                            <ModuleNameIcon width={18} height={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Masukkan nama module"
                            className="w-full pl-15 pr-4 py-2.5 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none"
                            value="Pengenalan React Dasar"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                            <DeskripsiIcon width={18} height={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Masukkan nama module"
                            className="w-full pl-15 pr-4 py-2.5 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none"
                            value="Pengenalan React Dasar"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form className="space-y-6 w-full h-full mx-auto">
            <div className="relative">
                <div className="flex gap-6">
                    <div className="flex-shrink-0 relative">
                        <div className="w-48 h-48 bg-gray-200 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                            {profilePreview ? (
                                <img
                                    src={profilePreview}
                                    alt="Course profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center bg-transparent  text-gray-900 dark:text-gray-300">
                                    <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm opacity-50">Profile</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                            Nama Course:
                        </label>
                        <div className="h-20 bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 border border-gray-300 rounded-lg py-3 px-5">
                            <textarea
                                rows={2}
                                name="name"
                                value={formData.name}
                                disabled={true}
                                className="w-full h-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-300 placeholder-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                                placeholder={isActive ? "Tidak ada course dipilih" : "Tidak ada course dipilih"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-3'>
                <h2 className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                    Daftar Module
                </h2>

                <ModuleCard />
                <ModuleCard />
                <ModuleCard />

            </div>
        </form>
    );
}

export default ContentForm;