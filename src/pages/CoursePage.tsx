import { useState } from 'react';
import CourseMenu from "../components/ui/CourseMenu";
import CourseList from "../components/ui/CourseList";
import PaginationCard from "../components/card/PaginationCard";
import HeaderFormCard from "../components/card/HeaderFormCard";
import CourseForm from "../components/form/CourseForm";
import LoadingModal from '../components/LoadingModal';
import useMutation from "../hooks/useMutation";
import type { CourseData, CourseFormData } from "../types/course";

export default function CoursePage() {
    const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('view');
    const [isFormActive, setIsFormActive] = useState(false); 

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const { loading: createLoading, error: createError, execute: createCourseApi, reset: resetCreateState } = useMutation<CourseData, CourseFormData | FormData>();
    const { loading: updateLoading, error: updateError, execute: updateCourseApi, reset: resetUpdateState } = useMutation<CourseData, CourseFormData | FormData>();

    const isLoading = createLoading || updateLoading;
    const error = createError || updateError;

    const clearFormAndResetState = () => {
        setSelectedCourse(null);
        setFormMode('view');
        setIsFormActive(false);
        resetCreateState();
        resetUpdateState();
    };

    const handleCourseSelect = (courseData: CourseData) => {
        setSelectedCourse(courseData);
        setFormMode('edit');
        setIsFormActive(true);
        resetCreateState();
        resetUpdateState();
    };

    const handleAddNewCourse = () => {
        setSelectedCourse(null);
        setFormMode('add');
        setIsFormActive(true);
        resetCreateState();
        resetUpdateState();
    };

    const handleFormSave = async (data: CourseFormData) => {
        let success = false;
        try {
            if (formMode === 'add') {
                const formData = new FormData();

                formData.append('course_name', data.course_name);
                formData.append('course_description', data.course_description);
                formData.append('course_price', String(data.course_price));
                formData.append('course_slug', data.course_slug);
                formData.append('status', data.status);

                if (data.course_image_profile instanceof File) {
                    if (!data.course_image_profile.type.startsWith('image/')) {
                        throw new Error('Profile image must be an image file');
                    }
                    if (data.course_image_profile.size > 5 * 1024 * 1024) { 
                        throw new Error('Profile image size must be less than 5MB');
                    }
                    formData.append('course_image_profile', data.course_image_profile);
                }

                if (data.course_image_cover instanceof File) {
                    // Validasi file type dan size
                    if (!data.course_image_cover.type.startsWith('image/')) {
                        throw new Error('Cover image must be an image file');
                    }
                    if (data.course_image_cover.size > 5 * 1024 * 1024) {
                        throw new Error('Cover image size must be less than 5MB');
                    }
                    formData.append('course_image_cover', data.course_image_cover);
                }

                const result = await createCourseApi('POST', '/courses', formData);
                if (result) {
                    console.log('Course added successfully:', result);
                    success = true;
                    clearFormAndResetState(); 
                    window.location.reload(); 
                }

            } else if (formMode === 'edit' && selectedCourse) {
                const formData = new FormData();

                if (data.course_name !== undefined && data.course_name !== selectedCourse.course_name) {
                    formData.append('course_name', data.course_name);
                }
                if (data.course_description !== undefined && data.course_description !== selectedCourse.course_description) {
                    formData.append('course_description', data.course_description);
                }
                if (data.course_price !== undefined && data.course_price !== selectedCourse.course_price) {
                    formData.append('course_price', String(data.course_price));
                }
                if (data.course_slug !== undefined && data.course_slug !== selectedCourse.course_slug) {
                    formData.append('course_slug', data.course_slug);
                }
                if (data.status !== undefined && data.status !== selectedCourse.status) {
                    formData.append('status', data.status);
                }

                if (data.course_image_profile instanceof File) {
                    if (!data.course_image_profile.type.startsWith('image/')) {
                        throw new Error('Profile image must be an image file');
                    }
                    if (data.course_image_profile.size > 5 * 1024 * 1024) {
                        throw new Error('Profile image size must be less than 5MB');
                    }
                    formData.append('course_image_profile', data.course_image_profile);
                }

                if (data.course_image_cover instanceof File) {
                    if (!data.course_image_cover.type.startsWith('image/')) {
                        throw new Error('Cover image must be an image file');
                    }
                    if (data.course_image_cover.size > 5 * 1024 * 1024) {
                        throw new Error('Cover image size must be less than 5MB');
                    }
                    formData.append('course_image_cover', data.course_image_cover);
                }

                const result = await updateCourseApi('PUT', `/courses/${selectedCourse.course_id}`, formData);
                if (result) {
                    console.log('Course updated successfully:', result);
                    success = true;
                    clearFormAndResetState(); 
                    window.location.reload(); 
                }
            }

            if (success && !error) {
                clearFormAndResetState();
            }

        } catch (err) {
            console.error('Form save error:', err);
        }
    };

    const handleFormCancel = () => {
        clearFormAndResetState();
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

    return (
        <main className="p-4 min-h-screen bg-[#F9FAFB] dark:bg-gray-900">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <CourseMenu
                        onSearch={handleSearch}
                        onStatusFilter={handleStatusFilter}
                    />

                    <CourseList
                        onCourseSelect={handleCourseSelect}
                        totalColumn={2}
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

                <div className="flex-1 flex flex-col gap-4">
                    <HeaderFormCard
                        judul={formMode === 'add' ? "Tambahkan Course Baru" : formMode === 'edit' ? "Edit Course" : "Course Form"}
                        deskripsi={
                            formMode === 'add'
                                ? "Buat course baru untuk platform pembelajaran"
                                : formMode === 'edit'
                                    ? `Edit course: ${selectedCourse?.course_name || ''}`
                                    : "Pilih course dari daftar atau tambah course baru"
                        }
                        onAddClick={handleAddNewCourse}
                    />

                    <div className="flex-1 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg">
                        <div className="rounded-lg p-6 h-full flex items-center justify-center">
                            <CourseForm
                                courseData={selectedCourse}
                                isActive={isFormActive}
                                mode={formMode}
                                onSave={handleFormSave}
                                onCancel={handleFormCancel}
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
            <LoadingModal isLoading={isLoading} message={createLoading ? "Menambahkan Course..." : "Memperbarui Course..."} />
        </main>
    );
}