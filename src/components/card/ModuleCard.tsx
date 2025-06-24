import React, { useState } from 'react';
import { ModuleNameIcon, DeskripsiIcon } from "../../assets";
import type { ModuleData } from "../../types/module";

interface ModuleCardProps {
    module: ModuleData;
    onEditClick: (module: ModuleData) => void;
    isEditing?: boolean;
    onSave?: (moduleData: Partial<ModuleData>) => void;
    onCancelEdit?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
    module,
    onEditClick,
    isEditing = false,
    onSave,
    onCancelEdit
}) => {
    const [editFormData, setEditFormData] = useState({
        title: module.title,
        description: module.description,
        module_order: module.module_order
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: name === 'module_order' ? parseInt(value) || 0 : value
        }));
    };

    const handleSave = () => {
        if (onSave) {
            onSave({
                ...module,
                ...editFormData
            });
        }
    };

    const handleCancel = () => {
        setEditFormData({
            title: module.title,
            description: module.description,
            module_order: module.module_order
        });
        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                    <h3 className="text-md font-normal text-gray-800 dark:text-white">
                        Module : {module.module_order}
                    </h3>
                </div>

                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="p-2 text-white rounded-xl bg-green-600 hover:bg-green-700 transition-colors"
                                aria-label="Save module"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-2 text-white rounded-xl bg-gray-500 hover:bg-gray-600 transition-colors"
                                aria-label="Cancel edit"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => onEditClick(module)}
                            className="p-2 text-white rounded-xl bg-secondary hover:bg-[#435e74] transition-colors"
                            aria-label="Edit module"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="p-4 space-y-4 dark:bg-gray-800">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <ModuleNameIcon width={18} height={18} />
                    </div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Masukkan nama module"
                        className="w-full pl-10 pr-4 py-2.5 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none disabled:opacity-70"
                        value={isEditing ? editFormData.title : module.title}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        readOnly={!isEditing}
                    />
                </div>

                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <DeskripsiIcon width={18} height={18} />
                    </div>
                    <input
                        type="text"
                        name="description"
                        placeholder="Masukkan deskripsi module"
                        className="w-full pl-10 pr-4 py-2.5 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none disabled:opacity-70"
                        value={isEditing ? editFormData.description : module.description}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        readOnly={!isEditing}
                    />
                </div>

                {isEditing && (
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Urutan Module
                        </label>
                        <input
                            type="number"
                            name="module_order"
                            min="1"
                            className="w-full px-3 py-2.5 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none"
                            value={editFormData.module_order}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModuleCard;