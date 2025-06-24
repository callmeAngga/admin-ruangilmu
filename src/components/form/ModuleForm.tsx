import React, { useState, useEffect } from 'react';
import { ModuleNameIcon, DeskripsiIcon } from "../../assets";
import ModuleCard from '../card/ModuleCard';
import type { CourseData } from "../../types/course";
import type { ModuleData, ModuleFormData } from "../../types/module";

interface ModuleFormProps {
    courseData?: CourseData | null;
    modules: ModuleData[];
    isActive: boolean;
    mode: 'add' | 'edit' | 'view';
    onSave: (data: ModuleFormData) => void;
    onCancel?: () => void;
    onEditModule: (module: ModuleData | null) => void; 
    onUpdateModule: (moduleData: Partial<ModuleData>) => void;
    editingModuleId?: number | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ModuleForm: React.FC<ModuleFormProps> = ({
    courseData = null,
    modules = [],
    isActive = false,
    mode = 'view',
    onSave,
    onCancel,
    onEditModule,
    onUpdateModule,
    editingModuleId = null
}) => {
    const [formData, setFormData] = useState<ModuleFormData>({
        module_id: undefined,
        course_id: courseData?.course_id || 0,
        title: '',
        description: '',
        module_order: ''
    });

    const [profilePreview, setProfilePreview] = useState<string>('');

    useEffect(() => {
        if (courseData && courseData.course_image_profile) {
            setProfilePreview(`${API_BASE_URL}/uploads/courses/${courseData.course_image_profile}`);
        } else {
            setProfilePreview('');
        }

        if (mode === 'add') {
            // Set module_order to next available number
            const nextOrder = modules.length > 0 ? Math.max(...modules.map(m => m.module_order)) + 1 : 1;
            setFormData({
                module_id: undefined,
                course_id: courseData?.course_id || 0,
                title: '',
                description: '',
                module_order: nextOrder.toString()
            });
        } else {
            setFormData({
                module_id: undefined,
                course_id: courseData?.course_id || 0,
                title: '',
                description: '',
                module_order: ''
            });
        }
    }, [courseData, mode, modules]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseData?.course_id) {
            alert('Error: Course belum dipilih. Tidak dapat menyimpan modul.');
            return;
        }
        if (!formData.title || !formData.description || !formData.module_order) {
            alert('Judul, deskripsi, dan urutan modul tidak boleh kosong.');
            return;
        }

        const dataToSend: ModuleFormData = {
            ...formData,
            course_id: courseData.course_id,
            module_order: Number(formData.module_order)
        };

        onSave(dataToSend);
    };

    const handleCancelClick = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleModuleEdit = (module: ModuleData) => {
        onEditModule(module);
    };

    const handleModuleUpdate = (moduleData: Partial<ModuleData>) => {
        onUpdateModule(moduleData);
    };

    const sortedModules = [...modules].sort((a, b) => a.module_order - b.module_order);

    const canEdit = isActive && mode === 'add';

    return (
        <div className="space-y-6 w-full h-full mx-auto">
            {/* Course Info Section */}
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
                                <div className="text-center bg-transparent text-gray-900 dark:text-gray-300">
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
                                value={courseData?.course_name || 'Tidak ada course dipilih'}
                                disabled={true}
                                readOnly={true}
                                className="w-full h-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-300 placeholder-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                                placeholder="Tidak ada course dipilih"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Module List Section */}
            <div className='space-y-3'>
                <h2 className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                    Daftar Module
                </h2>

                {sortedModules.length > 0 ? (
                    <div className="space-y-3">
                        {sortedModules.map((module) => (
                            <ModuleCard
                                key={module.module_id}
                                module={module}
                                onEditClick={handleModuleEdit}
                                isEditing={editingModuleId === module.module_id}
                                onSave={handleModuleUpdate}
                                onCancelEdit={() => onEditModule(null)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        {courseData ? 'Belum ada modul untuk course ini.' : 'Pilih course untuk melihat modul.'}
                    </div>
                )}
            </div>

            {/* Add New Module Form */}
            {mode === 'add' && (
                <div className='space-y-3'>
                    <h2 className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2 border-t pt-6 border-gray-200 dark:border-gray-700">
                        Tambah Module Baru
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Judul Modul */}
                        <div>
                            <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                                Judul Modul:
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                    <ModuleNameIcon width={18} height={18} />
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    disabled={!canEdit}
                                    className="w-full pl-10 pr-4 py-2.5 text-gray-800 dark:text-gray-300 bg-[#F9FAFB] dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none disabled:opacity-70"
                                    placeholder="Masukkan judul modul..."
                                />
                            </div>
                        </div>

                        {/* Input Deskripsi Modul */}
                        <div>
                            <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                                Deskripsi Modul:
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-4 text-gray-400 dark:text-gray-500">
                                    <DeskripsiIcon width={18} height={18} />
                                </div>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    disabled={!canEdit}
                                    rows={4}
                                    className="w-full pl-10 pr-4 py-2.5 text-gray-800 dark:text-gray-300 bg-[#F9FAFB] dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none resize-none disabled:opacity-70"
                                    placeholder="Masukkan deskripsi modul..."
                                />
                            </div>
                        </div>

                        {/* Input Urutan Modul */}
                        <div>
                            <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                                Urutan Modul:
                            </label>
                            <input
                                type="number"
                                name="module_order"
                                value={formData.module_order}
                                onChange={handleInputChange}
                                disabled={!canEdit}
                                min="1"
                                className="w-full px-4 py-2.5 text-gray-800 dark:text-gray-300 bg-[#F9FAFB] dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none disabled:opacity-70"
                                placeholder="1, 2, 3..."
                            />
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-end gap-3 pt-4">
                            {onCancel && (
                                <button
                                    type="button"
                                    onClick={handleCancelClick}
                                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={!canEdit}
                                className="px-6 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Tambah Modul
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ModuleForm;