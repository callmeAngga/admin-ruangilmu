export interface CourseData {
    course_id: number;
    course_name: string;
    course_description: string;
    course_image_profile?: string;
    course_image_cover?: string;
    course_price: string;
    course_slug: string;
    status: 'published' | 'pending';
    enrollment_count: string;
    module_count: string;
    created_at: string;
    updated_at: string;
}


export interface CourseFormData {
    course_id?: number;
    course_name: string;
    course_description: string;
    course_image_profile?: File | null;
    course_image_cover?: File | null;
    course_price: string;
    course_slug: string;
    status: 'published' | 'pending' | '';
    enrollment_count?: string;
    module_count?: string;
    created_at?: string;
    updated_at?: string;
}