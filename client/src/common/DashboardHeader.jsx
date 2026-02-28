import { Bell, Search, User, Moon, Sun, Menu } from 'lucide-react';
import useTheme from '../hooks/useTheme';

export default function DashboardHeader({ toggleSidebar }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
            <div className="flex items-center gap-4 flex-1 max-w-md">
                <button
                    onClick={toggleSidebar}
                    className="p-2 lg:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all"
                >
                    <Menu size={24} />
                </button>

                <div className="relative group flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white transition-all text-sm md:text-base"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 md:p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="hidden sm:block p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                </button>

                <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 md:mx-2" />

                <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        <User size={18} />
                    </div>
                </button>
            </div>
        </header>
    );
}
