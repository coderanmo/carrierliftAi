export default function UserDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Welcome, User!</h1>
                <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your career trajectory today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Profile Completion", value: "85%", color: "bg-indigo-500" },
                    { label: "Active Courses", value: "3", color: "bg-emerald-500" },
                    { label: "AI Suggestions", value: "12", color: "bg-purple-500" }
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                        <div className="mt-4 w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${stat.color}`} style={{ width: stat.value }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-8 rounded-3xl bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2">Ready for your next assessment?</h2>
                    <p className="text-indigo-100 mb-6 max-w-md">Our AI has identified new roles that match your growing skill set. Complete a quick checkup to see your new matches.</p>
                    <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">Start Assessment</button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-20 -mt-20 rounded-full" />
            </div>
        </div>
    );
}
