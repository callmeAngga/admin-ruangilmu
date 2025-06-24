import { useState, useEffect, useCallback } from 'react';
import CourseMenu from "../components/ui/CourseMenu";
import CourseList from "../components/ui/CourseList";
import PaginationCard from "../components/card/PaginationCard";
import HeaderFormCard from "../components/card/HeaderFormCard";
import ModuleForm from '../components/form/ModuleForm';
import LoadingModal from '../components/LoadingModal';
import useMutation from "../hooks/useMutation";
import useApiData from "../hooks/useApiData";

import type { CourseData } from "../types/course";
import type { ModuleData, ModuleFormData } from "../types/module";

export default function ModulePage() {
    const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
    const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('view');
    const [isFormActive, setIsFormActive] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [moduleListRefreshTrigger, setModuleListRefreshTrigger] = useState(0);

    // Mutations
    const {
        loading: createModuleLoading,
        error: createModuleError,
        execute: createModuleApi,
        reset: resetCreateModuleState
    } = useMutation<ModuleData, ModuleFormData>();

    const {
        loading: updateModuleLoading,
        error: updateModuleError,
        execute: updateModuleApi,
        reset: resetUpdateModuleState
    } = useMutation<ModuleData, Partial<ModuleFormData>>();

    // API Data
    const moduleListEndpoint = selectedCourse ? `/courses/${selectedCourse.course_id}/modules?_t=${moduleListRefreshTrigger}` : '';
    const {
        data: moduleApiResponse,
        loading: moduleListLoading,
        error: moduleListError
    } = useApiData<{ data: ModuleData[] }>(moduleListEndpoint);

    const isLoading = createModuleLoading || updateModuleLoading || moduleListLoading;
    const error = createModuleError || updateModuleError || moduleListError;

    // Reset form state - wrapped in useCallback to prevent unnecessary re-renders
    const resetModuleFormState = useCallback(() => {
        setEditingModuleId(null);
        setFormMode('view');
        setIsFormActive(selectedCourse ? true : false);
        resetCreateModuleState();
        resetUpdateModuleState();
    }, [selectedCourse, resetCreateModuleState, resetUpdateModuleState]);

    // Effects
    useEffect(() => {
        resetModuleFormState();
    }, [resetModuleFormState]);

    // Handlers
    const handleCourseSelect = (courseData: CourseData) => {
        setSelectedCourse(courseData);
    };

    const handleEditModule = (moduleData: ModuleData | null) => {
        if (moduleData) {
            setEditingModuleId(moduleData.module_id ?? null); // Fix: handle undefined module_id
            setFormMode('edit');
        } else {
            setEditingModuleId(null);
            setFormMode('view');
        }
        resetCreateModuleState();
        resetUpdateModuleState();
    };

    const handleAddNewModule = () => {
        if (!selectedCourse) {
            alert('Silakan pilih Course terlebih dahulu untuk menambahkan modul.');
            return;
        }
        setEditingModuleId(null);
        setFormMode('add');
        setIsFormActive(true);
        resetCreateModuleState();
        resetUpdateModuleState();
    };

    const handleFormSave = async (data: ModuleFormData) => {
        let success = false;
        try {
            if (formMode === 'add' && selectedCourse) {
                const moduleDataToCreate: ModuleFormData = {
                    ...data,
                    course_id: selectedCourse.course_id,
                    module_order: Number(data.module_order)
                };

                const result = await createModuleApi('POST', `/courses/${selectedCourse.course_id}/modules`, moduleDataToCreate);
                if (result) {
                    console.log('Module added successfully:', result);
                    success = true;
                }
            }

            if (success && !error) {
                resetModuleFormState();
                setModuleListRefreshTrigger(prev => prev + 1);
            }

        } catch (err) {
            console.error('Form save error:', err);
        }
    };

    const handleModuleUpdate = async (moduleData: Partial<ModuleData>) => {
        if (!moduleData.module_id) return;

        try {
            const updateData: Partial<ModuleFormData> = {
                title: moduleData.title,
                description: moduleData.description,
                module_order: moduleData.module_order
            };

            const result = await updateModuleApi('PUT', `/modules/${moduleData.module_id}`, updateData);
            if (result) {
                console.log('Module updated successfully:', result);
                setEditingModuleId(null);
                setModuleListRefreshTrigger(prev => prev + 1);
            }
        } catch (err) {
            console.error('Module update error:', err);
        }
    };

    const handleFormCancel = () => {
        resetModuleFormState();
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Data processing
    const modules = moduleApiResponse?.data || [];

    // Header content
    let headerJudul = "Modul Form";
    let headerDeskripsi = "Pilih course dari daftar kiri untuk mulai mengelola modul.";

    if (formMode === 'add') {
        headerJudul = "Tambahkan Modul Baru";
        headerDeskripsi = `Tambahkan modul baru untuk Course: ${selectedCourse?.course_name || 'Pilih Course'}`;
    } else if (formMode === 'edit') {
        const editingModule = modules.find(m => m.module_id === editingModuleId);
        headerJudul = "Edit Modul";
        headerDeskripsi = `Edit modul: ${editingModule?.title || 'Modul Tidak Dipilih'}`;
    } else if (formMode === 'view' && selectedCourse) {
        headerJudul = "Daftar Modul";
        headerDeskripsi = `Modul untuk Course: ${selectedCourse.course_name}`;
    }

    return (
        <main className="p-4 min-h-screen bg-[#F9FAFB] dark:bg-gray-900">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar */}
                <div className="w-full lg:w-2/5 flex flex-col gap-4">
                    <CourseMenu
                        onSearch={handleSearch}
                        onStatusFilter={handleStatusFilter}
                    />

                    <CourseList
                        onCourseSelect={handleCourseSelect}
                        currentPage={currentPage}
                        searchQuery={searchQuery}
                        statusFilter={statusFilter}
                    />

                    <PaginationCard
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        searchQuery={searchQuery}
                        statusFilter={statusFilter}
                    />
                </div>

                {/* Right Content */}
                <div className="flex-1 lg:w-3/5 flex flex-col gap-4">
                    <HeaderFormCard
                        judul={headerJudul}
                        deskripsi={headerDeskripsi}
                        onAddClick={handleAddNewModule}
                        isAddButtonDisabled={!selectedCourse}
                        buttonText="Tambah Modul Baru"
                    />

                    <div className="flex-1 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg">
                        <div className="rounded-lg p-6 h-full flex flex-col justify-start">
                            <ModuleForm
                                courseData={selectedCourse}
                                modules={modules}
                                isActive={isFormActive}
                                mode={formMode}
                                onSave={handleFormSave}
                                onCancel={handleFormCancel}
                                onEditModule={handleEditModule}
                                onUpdateModule={handleModuleUpdate}
                                editingModuleId={editingModuleId}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            <LoadingModal
                isLoading={isLoading}
                message={
                    createModuleLoading ? "Menambahkan Modul..." :
                        updateModuleLoading ? "Memperbarui Modul..." :
                            moduleListLoading ? "Memuat daftar modul..." :
                                "Memuat data..."
                }
            />
        </main>
    );
}