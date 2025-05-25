import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import {
    DashboardIcon,
    CoursesIcon,
    ModuleIcon,
    ContentIcon,
    AddAdminIcon,
    ProfileIcon,
    LogoutIcon
} from "../assets"

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path: string;
};

const navItems: NavItem[] = [
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


const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen } = useSidebar();
    const location = useLocation();

    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
    );


    const renderMenuItems = (items: NavItem[]) => (
        <ul className="flex flex-col gap-4">
            {items.map((nav) => (
                <li key={nav.name}>
                    {nav.path && (
                        <Link
                            to={nav.path}
                            className={`menu-item  ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                                }`}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div
                                    className={`menu-item-icon-container ${isActive(nav.path)
                                        ? "icon-container-active"
                                        : "icon-container-inactive"
                                        }`}
                                >
                                    {nav.icon}
                                </div>
                                {(isExpanded || isMobileOpen) && (
                                    <span className="menu-item-text flex-1">{nav.name}</span>
                                )}
                            </div>
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );


    const LogoutItem = () => {
        const [isHovered, setIsHovered] = useState(false);
        const { isExpanded, isMobileOpen } = useSidebar();

        return (
            <ul className="flex flex-col gap-4">
                <li>
                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="menu-item border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                        <div className="flex items-center gap-3 w-full h-7">
                            <LogoutIcon fill={isHovered ? "#ffffff" : "#fb2c36"} width={30} height={30} />

                            {(isExpanded || isMobileOpen) && (
                                <span className="ml-9 font-bold transition-all duration-200">
                                    Logout
                                </span>
                            )}
                        </div>
                    </button>
                </li>
            </ul>
        );
    };


    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-7 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-300 
                        ${isExpanded || isMobileOpen ? "w-[290px]" : "w-[90px]"}
                        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded}
        >
            <div
                className={`py-8 pl-4 flex ${!isExpanded ? "lg:justify-center" : "justify-start border-b-1 border-gray-300 dark:border-gray-200"
                    }`}
            >
                <Link to="/">
                    {isExpanded || isMobileOpen ? (
                        <>
                            <div className="flex items-center">
                                <img
                                    className="dark:hidden mr-4"
                                    src="/images/logo-ruangilmu.svg"
                                    alt="Logo"
                                    width={50}
                                />
                                <span className="dark:hidden font-bold text-black " >RuangIlmu</span>
                                <span className="dark:hidden font-bold text-secondary">.</span>
                            </div>

                            <div className="flex items-center">
                                <img
                                    className="hidden mr-4 dark:block"
                                    src="/images/logo-ruangilmu.svg"
                                    alt="Logo"
                                    width={50}
                                />
                                <span className="hidden dark:block font-bold text-white " >RuangIlmu</span>
                                <span className="hidden dark:block font-bold text-primary">.</span>
                            </div>
                        </>
                    ) : (
                        <img
                            src="/images/logo-ruangilu.svg"
                            alt="Logo"
                            width={32}
                        />
                    )}
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar h-full">
                <nav className="my-10 h-full">
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            {renderMenuItems(navItems)}
                        </div>
                        <div className="mt-auto">
                            <LogoutItem />
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;