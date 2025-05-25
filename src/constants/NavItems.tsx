import React from 'react';
import {
    DashboardIcon,
    CoursesIcon,
    ModuleIcon,
    ContentIcon,
    AddAdminIcon,
    ProfileIcon,
} from "../assets"; // Ensure these imports are correct and point to actual SVG/React components

export type NavItem = {
    name: string;
    icon: React.ReactNode;
    path: string;
};

export const navItems: NavItem[] = [
    {
        name: "Default",
        icon: <DashboardIcon fill="currentColor" width={20} height={20} />,
        path: "/"
    },
    {
        name: "Courses",
        icon: <CoursesIcon fill="currentColor" width={20} height={20} />,
        path: "/courses"
    },
    {
        name: "Modules",
        icon: <ModuleIcon fill="currentColor" width={20} height={20} />,
        path: "/modules"
    },
    {
        name: "Contents",
        icon: <ContentIcon fill="currentColor" width={20} height={20} />,
        path: "/contents"
    },
    {
        name: "Admin",
        icon: <AddAdminIcon fill="currentColor" width={20} height={20} />,
        path: "/admin"
    },
    {
        name: "Profile",
        icon: <ProfileIcon fill="currentColor" width={25} height={25} />,
        path: "/profile"
    },
];
