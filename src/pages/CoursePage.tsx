import { useState } from 'react';
import CourseMenu from "../components/ui/CourseMenu";
import CourseList from "../components/ui/CourseList";
import PaginationCard from "../components/card/PaginationCard";
import HeaderFormCard from "../components/card/HeaderFormCard";
import CourseForm from "../components/form/CourseForm";

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

export default function CoursePage() {
    const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('view');
    const [isFormActive, setIsFormActive] = useState(true);

    // Handler ketika CourseCard diklik
    const handleCourseSelect = (courseData: CourseData) => {
        setSelectedCourse(courseData);
        setFormMode('edit');
        setIsFormActive(true);
    };

    // Handler ketika tombol "Tambah" di HeaderFormCard diklik
    const handleAddNewCourse = () => {
        setSelectedCourse(null);
        setFormMode('add');
        setIsFormActive(true);
    };

    // Handler ketika form disimpan
    const handleFormSave = (data: CourseData) => {
        if (formMode === 'add') {
            console.log('Adding new course:', data);
            // TODO: Implement add course logic
        } else {
            console.log('Updating course:', data);
            // TODO: Implement update course logic
        }

        // Reset form setelah save
        setSelectedCourse(null);
        setFormMode('view');
        setIsFormActive(false);
    };

    // Handler ketika form dibatalkan (hanya untuk mode add)
    const handleFormCancel = () => {
        setSelectedCourse(null);
        setFormMode('view');
        setIsFormActive(false);
    };

    return (
        <main className="p-4 min-h-screen bg-[#F9FAFB] dark:bg-gray-900">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <CourseMenu />

                    <CourseList onCourseSelect={handleCourseSelect} totalColumn={2} />

                    <PaginationCard />
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <HeaderFormCard
                        judul={formMode === 'add' ? "Tambahkan Course Baru" : formMode === 'edit' ? "Edit Course" : "Course Form"}
                        deskripsi={
                            formMode === 'add'
                                ? "Buat course baru untuk platform pembelajaran"
                                : formMode === 'edit'
                                    ? `Edit course: ${selectedCourse?.name || ''}`
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
                </div>
            </div>
        </main>
    );
}