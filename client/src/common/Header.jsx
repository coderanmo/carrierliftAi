import { motion } from 'framer-motion';
import { Zap, Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import useTheme from '../hooks/useTheme';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Roadmap', href: '#roadmap' },
        { name: 'Why AI', href: '#why-ai' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-black/5 dark:border-white/5'
                : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent transition-colors">
                        CareerLift AI
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA & Theme Toggle */}
                <div className="hidden md:flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all border border-transparent hover:border-indigo-500/20"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 text-center">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 bg-white dark:bg-[#0f172a] border-b border-black/5 dark:border-white/5 p-6 md:hidden flex flex-col gap-4 shadow-xl"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-slate-700 dark:text-slate-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-px bg-slate-200 dark:bg-white/5 my-2" />
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-slate-700 dark:text-slate-300 font-medium text-center">Login</Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 text-center flex items-center justify-center gap-2 group">
                        Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}
