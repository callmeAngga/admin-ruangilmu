import { useState } from 'react';
import CourseMenu from "../components/ui/CourseMenu";
import CourseList from "../components/ui/CourseList";
import PaginationCard from "../components/card/PaginationCard";
import HeaderFormCard from "../components/card/HeaderFormCard";
import ContentForm from '../components/form/ContentForm';
import LoadingModal from '../components/LoadingModal'; // Pastikan path ini benar
import useMutation from "../hooks/useMutation"; // Import useMutation
import type { CourseData, CourseFormData } from "../types/course"; // Gunakan CourseData dari types

// NOTE: interface CourseData di sini akan dihapus karena sudah diimport dari types/course

export default function ContentPage() {
    const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('view');
    const [isFormActive, setIsFormActive] = useState(false); // Set to false initially

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Inisialisasi hook useMutation untuk create
    // Ganti CourseData dengan tipe data yang relevan untuk content jika berbeda
    // Contoh: ContentData atau FormContentData
    const { loading: createLoading, error: createError, execute: createContentApi, reset: resetCreateState } = useMutation<CourseData, CourseFormData | FormData>();
    // Inisialisasi hook useMutation untuk update
    const { loading: updateLoading, error: updateError, execute: updateContentApi, reset: resetUpdateState } = useMutation<CourseData, CourseFormData | FormData>();

    const isLoading = createLoading || updateLoading; // Menggabungkan status loading
    const error = createError || updateError; // Menggabungkan status error

    const clearFormAndResetState = () => {
        setSelectedCourse(null);
        setFormMode('view');
        setIsFormActive(false);
        resetCreateState(); // Reset state mutation saat memilih course baru
        resetUpdateState(); // Reset state mutation saat memilih course baru
    };

    const handleCourseSelect = (courseData: CourseData) => {
        setSelectedCourse(courseData);
        setFormMode('edit');
        setIsFormActive(true);
        resetCreateState(); // Reset state mutation saat memilih course baru
        resetUpdateState(); // Reset state mutation saat memilih course baru
    };

    const handleAddNewCourse = () => {
        setSelectedCourse(null);
        setFormMode('add');
        setIsFormActive(true);
        resetCreateState(); // Reset state mutation saat akan menambah course baru
        resetUpdateState(); // Reset state mutation saat akan menambah course baru
    };

    const handleFormSave = async (data: CourseFormData) => { // Gunakan CourseFormData atau tipe yang sesuai
        let success = false;
        try {
            if (formMode === 'add') {
                const formData = new FormData();
                // TODO: Sesuaikan append data dengan field yang relevan untuk ContentForm
                // Ini hanya contoh, sesuaikan dengan struktur data ContentForm Anda
                formData.append('name', data.course_name); // Contoh: data.name jika ContentForm memiliki field 'name'
                formData.append('description', data.course_description);
                // ... tambahkan field lainnya
                if (data.course_image_profile instanceof File) {
                    formData.append('profile', data.course_image_profile);
                }
                if (data.course_image_cover instanceof File) {
                    formData.append('cover', data.course_image_cover);
                }

                const result = await createContentApi('POST', '/contents', formData); // TODO: Sesuaikan endpoint API
                if (result) {
                    console.log('Content added successfully:', result);
                    success = true;
                }

            } else if (formMode === 'edit' && selectedCourse) {
                const formData = new FormData();
                // TODO: Sesuaikan append data dengan field yang relevan untuk ContentForm
                // Pastikan hanya field yang berubah yang di-append, mirip CoursePage
                if (data.course_name !== undefined && data.course_name !== selectedCourse.course_name) {
                    formData.append('name', data.course_name);
                }
                // ... tambahkan field lainnya
                if (data.course_image_profile instanceof File) {
                    formData.append('profile', data.course_image_profile);
                }
                if (data.course_image_cover instanceof File) {
                    formData.append('cover', data.course_image_cover);
                }

                const result = await updateContentApi('PUT', `/contents/${selectedCourse.course_id}`, formData); // TODO: Sesuaikan endpoint API dan ID
                if (result) {
                    console.log('Content updated successfully:', result);
                    success = true;
                }
            }

            if (success && !error) {
                clearFormAndResetState();
                window.location.reload(); // Refresh the page to show changes
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
                <div className="w-full lg:w-2/5 flex flex-col gap-4">
                    <CourseMenu // TODO: Jika menu ini spesifik untuk "Course", mungkin perlu ganti namanya
                        onSearch={handleSearch}
                        onStatusFilter={handleStatusFilter}
                    />

                    <CourseList // TODO: Jika list ini spesifik untuk "Course", mungkin perlu ganti namanya
                        onCourseSelect={handleCourseSelect}
                        totalColumn={2} // Sesuaikan dengan jumlah kolom yang ditampilkan
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

                <div className="flex-1 lg:w-3/5 flex flex-col gap-4">
                    <HeaderFormCard
                        judul={formMode === 'add' ? "Tambahkan Konten Baru" : formMode === 'edit' ? "Edit Konten" : "Konten Form"} // Judul disesuaikan
                        deskripsi={
                            formMode === 'add'
                                ? "Buat konten baru untuk platform pembelajaran"
                                : formMode === 'edit'
                                    ? `Edit konten: ${selectedCourse?.course_name || ''}` // Sesuaikan dengan field nama konten (menggunakan course_name sebagai placeholder)
                                    : "Pilih konten dari daftar atau tambah konten baru"
                        }
                        onAddClick={handleAddNewCourse}
                    />

                    <div className="flex-1 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg">
                        <div className="rounded-lg p-6 h-full flex items-center justify-center">
                            <ContentForm
                                courseData={selectedCourse} // TODO: Rename to contentData jika tipenya berbeda
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
            {/* LoadingModal diletakkan di akhir main seperti di CoursePage */}
            <LoadingModal isLoading={isLoading} message={createLoading ? "Menambahkan Konten..." : "Memperbarui Konten..."} />
        </main>
    );
}