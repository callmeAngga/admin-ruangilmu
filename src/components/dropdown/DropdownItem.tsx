
import type React from "react";
import { Link } from "react-router";

interface DropdownItemProps {
    tag?: "a" | "button";
    to?: string;
    onClick?: () => void;
    onItemClick?: () => void;
    baseClassName?: string;
    className?: string;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    time?: string;
    icon?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
    tag = "button",
    to,
    onClick,
    onItemClick,
    baseClassName = "block w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0",
    className = "",
    children,
    title,
    description,
    time,
    icon,
}) => {
    const combinedClasses = `${baseClassName} ${className}`.trim();

    const handleClick = (event: React.MouseEvent) => {
        if (tag === "button") {
            event.preventDefault();
        }
        if (onClick) onClick();
        if (onItemClick) onItemClick();
    };

    const renderContent = () => {
        if (title || description || time || icon) {
            return (
                <div className="flex items-start gap-3">
                    {icon && (
                        <div className="flex-shrink-0 text-lg mt-0.5">
                            {icon}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        {title && (
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {title}
                            </h4>
                        )}
                        {description && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                {description}
                            </p>
                        )}
                        {time && (
                            <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 block">
                                {time}
                            </span>
                        )}
                    </div>
                </div>
            );
        }
        return children;
    };

    if (tag === "a" && to) {
        return (
            <Link to={to} className={combinedClasses} onClick={handleClick}>
                {renderContent()}
            </Link>
        );
    }

    return (
        <button onClick={handleClick} className={combinedClasses}>
            {renderContent()}
        </button>
    );
};