export interface ModuleData {
    module_id?: number;
    course_id: number; 
    title: string;
    description: string;
    module_order: number;
    created_at?: string;
    updated_at?: string;
}

export interface ModuleFormData {
    module_id?: number;
    course_id: number;
    title: string;
    description: string;
    module_order: string | number;
}