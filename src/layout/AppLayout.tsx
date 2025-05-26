import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppBackdrop from "./AppBackdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
    const { isExpanded, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex bg-[#F9FAFB] dark:bg-gray-900">
            <div>
                <AppSidebar />
                <AppBackdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? "lg:ml-[290px]" : "lg:ml-[90px]"
                    } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />

                <div className="p-0 bg-[#F9FAFB] dark:bg-gray-900 mx-auto max-w-[1680px] md:p-0 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const AppLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    );
};

export default AppLayout;
