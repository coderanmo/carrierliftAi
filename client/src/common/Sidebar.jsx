import { LayoutDashboard, Users, Settings, BookOpen, BarChart, LogOut, Zap, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Profile assessment', icon: <Users size={20} />, path: '/dashboard/profile' },
    { name: 'Learning Path', icon: <BookOpen size={20} />, path: '/dashboard/learning' },
    { name: 'Analytics', icon: <BarChart size={20} />, path: '/dashboard/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
                flex flex-col transition-transform duration-300 transform lg:relative lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-black text-slate-900 dark:text-white">CareerLift</span>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 lg:hidden text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => {
                            if (window.innerWidth < 1024) toggleSidebar();
                        }}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                            ${isActive
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white'
                            }
                        `}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl font-medium transition-all group">
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}