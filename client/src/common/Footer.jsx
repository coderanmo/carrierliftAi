import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const categories = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#features" },
                { name: "Resume Analyzer", href: "#" },
                { name: "Job Matcher", href: "#" },
                { name: "Interview Bot", href: "#" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Career Roadmap", href: "#roadmap" },
                { name: "Skill Gap Report", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Documentation", href: "#" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "#" },
                { name: "Success Stories", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
            ]
        }
    ];

    return (
        <footer className="border-t border-black/5 dark:border-white/5 pt-14 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-sm transition-colors duration-500">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
                {/* Branding Column */}
                <div className="sm:col-span-2 lg:col-span-2 space-y-6 sm:space-y-8">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            <Zap className="w-6 h-6 text-white fill-white" />
                        </div>
                        <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">CareerLift AI</span>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xs sm:max-w-sm leading-relaxed font-light">
                        The definitive platform for recursive AI career trajectory mapping. Join the elite 1% who navigate their profession with data intelligence.
                    </p>
                    <div className="flex gap-4">
                        {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="w-12 h-12 rounded-2xl border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-sm hover:shadow-indigo-500/20"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation Columns */}
                {categories.map((cat) => (
                    <div key={cat.title} className="space-y-8">
                        <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] sm:tracking-[0.3em]">{cat.title}</h4>
                        <ul className="space-y-4">
                            {cat.links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all font-medium inline-block hover:translate-x-1">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-8 sm:pt-10 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                <p className="text-xs sm:text-sm font-medium text-slate-500 text-center sm:text-left">© 2026 CareerLift AI. Built with recursive intelligence.</p>
                <div className="flex flex-wrap justify-center gap-5 sm:gap-10">
                    {['Privacy', 'Terms', 'Security', 'Status'].map(item => (
                        <a key={item} href="#" className="text-xs sm:text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest">{item}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
