import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import DashboardHeader from "../common/DashboardHeader";
import DashboardFooter from "../common/DashboardFooter";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4 md:p-8">
                    <Outlet />
                </main>
                <DashboardFooter />
            </div>
        </div>
    );
}