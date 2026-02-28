export default function DashboardFooter() {
    return (
        <footer className="px-8 py-6 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-300">
            <p>© 2026 CareerLift AI. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</a>
            </div>
        </footer>
    );
}