import React, { useState, useEffect } from 'react';
import Select from './Select';
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

interface CourseFormProps {
    courseData?: CourseData | null;
    isActive: boolean;
    mode: 'add' | 'edit' | 'view';
    onSave: (data: CourseData) => void;
    onCancel?: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
    courseData = null,
    isActive = false,
    mode = 'view',
    onSave,
    onCancel
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
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    console.log('Profile Image:', profileImage);
    console.log('Cover Image:', coverImage);

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

            if (courseData.coverImage) {
                setCoverPreview(courseData.coverImage);
            }
            if (courseData.profileImage) {
                setProfilePreview(courseData.profileImage);
            }

            setIsEditing(false);
        } else if (mode === 'add') {
            // Reset form untuk mode add
            setFormData({
                name: '',
                description: '',
                price: '',
                status: 'pending',
                slug: ''
            });
            setCoverPreview('');
            setProfilePreview('');
            setCoverImage(null);
            setProfileImage(null);
            setIsEditing(true);
        }
    }, [courseData, mode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'name') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9 ]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            setFormData(prev => ({
                ...prev,
                slug: slug
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') {
                    setProfileImage(file);
                    setProfilePreview(reader.result as string);
                } else {
                    setCoverImage(file);
                    setCoverPreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'add') {
            // Mode add - langsung save
            const dataToSave = {
                ...formData,
                coverImage: coverPreview,
                profileImage: profilePreview
            };
            onSave(dataToSave);
        } else if (mode === 'edit' || mode === 'view') {
            if (isEditing) {
                // Save changes
                const dataToSave = {
                    ...formData,
                    coverImage: coverPreview,
                    profileImage: profilePreview
                };
                onSave(dataToSave);
                setIsEditing(false);
            } else {
                // Enable editing
                setIsEditing(true);
            }
        }
    };

    const canEdit = isActive && (mode === 'add' || isEditing);

    const status = [
        { value: "pending", label: "Pending" },
        { value: "published", label: "Published" },
    ];

    const handleSelectChange = (value: string) => {
        console.log("Selected value:", value);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full h-full mx-auto">
            <div className="relative">
                <div className="h-80 rounded-t-lg overflow-hidden relative">
                    {coverPreview ? (
                        <img
                            src={coverPreview}
                            alt="Course cover"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:border-gray-700 border border-gray-300 dark:bg-gray-900 flex items-center justify-center">
                            <div className="text-center text-gray-900 dark:text-gray-300">
                                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm opacity-50">Course Cover</span>
                            </div>
                        </div>
                    )}
                    {canEdit && (
                        <div className="absolute top-6 right-6">
                            <label className="cursor-pointer bg-transparent bg-opacity-80 hover:bg-opacity-100 p-0 transition-all shadow-md">
                                <svg className="w-6 h-6 dark:text-white text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'cover')}
                                    className="hidden "
                                />
                            </label>
                        </div>
                    )}
                </div>

                <div className="pt-6 px-0">
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
                            {canEdit && (
                                <div className="absolute top-5 right-5">
                                    <label className="cursor-pointer bg-transparent">
                                        <svg className="w-4 h-4 dark:text-white text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'profile')}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-5">
                                Nama Course:
                            </label>
                            <div className="h-32 bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 border border-gray-300 rounded-lg py-3 px-5">
                                <textarea
                                    rows={4}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={!canEdit}
                                    className="w-full h-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-300 placeholder-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                                    placeholder={isActive ? "Masukkan nama course..." : "Tidak ada course dipilih"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">
                        Deskripsi Course:
                    </label>
                    <div className="h-32 bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 border border-gray-300 rounded-lg py-3 px-5">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            disabled={!canEdit}
                            className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-800 dark:text-gray-300 placeholder-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                            placeholder={isActive ? "Masukkan deskripsi course..." : ""}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">
                            Harga Course:
                        </label>
                        <div className="h-12 bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 border border-gray-300 rounded-lg px-5">
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                disabled={!canEdit}
                                className="w-full h-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-300 placeholder-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                                placeholder={isActive ? "0" : ""}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">
                            Status Course:
                        </label>
                        <div className="h-12 rounded-lg">
                            <Select
                                options={status}
                                placeholder="Status Course"
                                onChange={handleSelectChange}
                                className="dark:bg-dark-900 h-full"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">
                        Slug Course:
                    </label>
                    <div className="h-15 bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 borderborder-gray-300 rounded-lg px-5">
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            disabled={!canEdit}
                            className="w-full h-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-300 placeholder-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                            placeholder={isActive ? "course-slug-example" : ""}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    {mode === 'add' && onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Batal
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={!isActive}
                        className={`px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${mode === 'add'
                            ? 'bg-primary hover:bg-secondary text-white'
                            : isEditing
                                ? 'bg-primary hover:bg-secondary text-white'
                                : 'bg-primary hover:bg-secondary text-white'
                            }`}
                    >
                        {mode === 'add'
                            ? 'Tambah Course'
                            : isEditing
                                ? 'Simpan Course'
                                : 'Edit Course'
                        }
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CourseForm;