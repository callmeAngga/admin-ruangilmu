import {
    DashboardIcon,
    CoursesIcon,
    ModuleIcon,
    ContentIcon,
    AddAdminIcon,
    ProfileIcon,
} from "../assets";

export type NavItem = {
    name: string;
    icon: React.ReactNode;
    path: string;
};

export const navItems: NavItem[] = [
    {
        name: "Dashboard",
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
        icon: <ModuleIcon fill="currentColor" width={22} height={22} />,
        path: "/modules"
    },
    {
        name: "Contents",
        icon: <ContentIcon fill="currentColor" width={20} height={20} />,
        path: "/contents"
    },
    {
        name: "Admin",
        icon: <AddAdminIcon fill="currentColor" width={22} height={22} />,
        path: "/admin"
    },
    {
        name: "Profile",
        icon: <ProfileIcon fill="currentColor" width={27} height={27} />,
        path: "/profile"
    },
];
