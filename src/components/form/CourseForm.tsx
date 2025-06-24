import React, { useState, useEffect } from 'react';
import Select from './Select';
import type { CourseData, CourseFormData } from "../../types/course";

interface CourseFormProps {
    courseData?: CourseData | null;
    isActive: boolean;
    mode: 'add' | 'edit' | 'view';
    onSave: (data: CourseFormData) => void;
    onCancel?: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CourseForm: React.FC<CourseFormProps> = ({
    courseData = null,
    isActive = false,
    mode = 'view',
    onSave,
    onCancel
}) => {
    const initialFormData: CourseFormData = {
        course_name: '',
        course_description: '',
        course_price: '',
        status: '',
        course_slug: '',
        course_image_profile: null,
        course_image_cover: null,
    };

    const [formData, setFormData] = useState<CourseFormData>(initialFormData);

    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

    const [profilePreviewUrl, setProfilePreviewUrl] = useState<string>('');
    const [coverPreviewUrl, setCoverPreviewUrl] = useState<string>('');

    const [existingProfileImageUrl, setExistingProfileImageUrl] = useState<string>('');
    const [existingCoverImageUrl, setExistingCoverImageUrl] = useState<string>('');

    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        if (courseData && mode !== 'add') {
            setFormData({
                course_id: courseData.course_id,
                course_name: courseData.course_name || '',
                course_description: courseData.course_description || '',
                course_price: courseData.course_price || '',
                status: courseData.status,
                course_slug: courseData.course_slug || '',
                course_image_profile: null, 
                course_image_cover: null, 
            });

            if (courseData.course_image_cover) {
                setExistingCoverImageUrl(`${API_BASE_URL}/uploads/courses/${courseData.course_image_cover}`);
            } else {
                setExistingCoverImageUrl('');
            }
            if (courseData.course_image_profile) {
                setExistingProfileImageUrl(`${API_BASE_URL}/uploads/courses/${courseData.course_image_profile}`);
            } else {
                setExistingProfileImageUrl('');
            }

            setProfilePreviewUrl('');
            setCoverPreviewUrl('');
            setProfileImageFile(null);
            setCoverImageFile(null);

            setIsEditing(false);
        } else if (mode === 'add') {
            setFormData(initialFormData);

            setCoverPreviewUrl('');
            setProfilePreviewUrl('');
            setCoverImageFile(null);
            setProfileImageFile(null);
            setExistingCoverImageUrl('');
            setExistingProfileImageUrl('');

            setIsEditing(true);
        } else {
            setFormData(initialFormData);
            setCoverPreviewUrl('');
            setProfilePreviewUrl('');
            setCoverImageFile(null);
            setProfileImageFile(null);
            setExistingCoverImageUrl('');
            setExistingProfileImageUrl('');
            setIsEditing(false); 
        }
    }, [courseData, mode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'course_name') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9 ]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            setFormData(prev => ({
                ...prev,
                course_slug: slug
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') {
                    setProfileImageFile(file);
                    setProfilePreviewUrl(reader.result as string);
                    setExistingProfileImageUrl('');
                    setFormData(prev => ({ ...prev, course_image_profile: file }));
                } else {
                    setCoverImageFile(file);
                    setCoverPreviewUrl(reader.result as string);
                    setExistingCoverImageUrl(''); 
                    setFormData(prev => ({ ...prev, course_image_cover: file }));
                }
            };
            reader.readAsDataURL(file);
        } else {
            if (type === 'profile') {
                setProfileImageFile(null);
                setProfilePreviewUrl('');
                setFormData(prev => ({ ...prev, course_image_profile: null }));
            } else {
                setCoverImageFile(null);
                setCoverPreviewUrl('');
                setFormData(prev => ({ ...prev, course_image_cover: null }));
            }
        }
    };

    const handleSaveSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        const dataToSave: CourseFormData = {
            ...formData,
            course_image_profile: profileImageFile,
            course_image_cover: coverImageFile,
        };
        onSave(dataToSave);
    };

    const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        if (onCancel) {
            onCancel();
        }
        if (mode === 'add') {
            setFormData(initialFormData);
            setProfileImageFile(null);
            setProfilePreviewUrl('');
            setCoverImageFile(null);
            setCoverPreviewUrl('');
            setExistingProfileImageUrl('');
            setExistingCoverImageUrl('');
        } else if (mode === 'edit' && courseData) {
            setFormData({
                course_id: courseData.course_id,
                course_name: courseData.course_name || '',
                course_description: courseData.course_description || '',
                course_price: courseData.course_price || '',
                status: courseData.status,
                course_slug: courseData.course_slug || '',
                course_image_profile: null,
                course_image_cover: null,
            });
            if (courseData.course_image_cover) {
                setExistingCoverImageUrl(`${API_BASE_URL}/uploads/courses/${courseData.course_image_cover}`);
            } else {
                setExistingCoverImageUrl('');
            }
            if (courseData.course_image_profile) {
                setExistingProfileImageUrl(`${API_BASE_URL}/uploads/courses/${courseData.course_image_profile}`);
            } else {
                setExistingProfileImageUrl('');
            }
            setProfilePreviewUrl('');
            setCoverPreviewUrl('');
            setProfileImageFile(null);
            setCoverImageFile(null);
            setIsEditing(false); 
        }
    };


    const canEdit = isActive && (mode === 'add' || isEditing);
    const statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "published", label: "Published" },
    ];
    const handleSelectChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            status: value as 'published' | 'pending'
        }));
    };

    const displayCoverImage = coverPreviewUrl || existingCoverImageUrl;
    const displayProfileImage = profilePreviewUrl || existingProfileImageUrl;

    return (
        <form onSubmit={handleSaveSubmit} className="space-y-6 w-full h-full mx-auto">
            <div className="relative">
                <div className="h-80 rounded-t-lg overflow-hidden relative">
                    {displayCoverImage ? (
                        <img
                            src={displayCoverImage}
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
                            <div className="w-48 h-48 bg-gray-200 dark:border-gray-700 border border-gray-300 dark:bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                                {displayProfileImage ? (
                                    <img
                                        src={displayProfileImage}
                                        alt="Course profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center bg-transparent text-gray-900 dark:text-gray-300">
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
                                    name="course_name"
                                    value={formData.course_name}
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
                            name="course_description"
                            value={formData.course_description}
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
                                name="course_price"
                                value={formData.course_price}
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
                                options={statusOptions}
                                placeholder="Status Course"
                                defaultValue={formData.status}
                                onChange={handleSelectChange}
                                disabled={!canEdit}
                                className="dark:bg-dark-900 h-full"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">
                        Slug Course:
                    </label>
                    <div className="h-12 bg-[#F9FAFB] dark:bg-gray-900 dark:border-gray-700 border border-gray-300 rounded-lg px-5">
                        <input
                            type="text"
                            name="course_slug"
                            value={formData.course_slug}
                            onChange={handleInputChange}
                            disabled={!canEdit}
                            className="w-full h-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-300 placeholder-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                            placeholder={isActive ? "course-slug-example" : ""}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    {(mode === 'add' || (mode === 'edit' && isEditing)) && onCancel && (
                        <button
                            type="button" 
                            onClick={handleCancelClick}
                            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Batal
                        </button>
                    )}

                    <button
                        type={canEdit ? "submit" : "button"}
                        onClick={canEdit ? undefined : handleEditButtonClick}
                        disabled={!isActive}
                        className={`px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${canEdit
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