import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FileSearch, Briefcase, Bot, LineChart, Map, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

const features = [
    {
        title: "Resume Analyzer",
        description: "Get instant AI feedback on your resume and optimize it for Applicant Tracking Systems (ATS).",
        icon: <FileSearch className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
        gradient: "from-indigo-500/10 dark:from-indigo-500/20 to-blue-500/10 dark:to-blue-500/20"
    },
    {
        title: "Job Matcher",
        description: "Our AI finds the perfect roles based on your skills, experience, and career aspirations.",
        icon: <Briefcase className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
        gradient: "from-emerald-500/10 dark:from-emerald-500/20 to-teal-500/10 dark:to-teal-500/20"
    },
    {
        title: "Interview Bot",
        description: "Practice with our AI-driven mock interviews tailored to specific job descriptions.",
        icon: <Bot className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
        gradient: "from-amber-500/10 dark:from-amber-500/20 to-orange-500/10 dark:to-orange-500/20"
    },
    {
        title: "Skill Gap Report",
        description: "Identify exactly what you need to learn to land your dream job with detailed insights.",
        icon: <LineChart className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
        gradient: "from-rose-500/10 dark:from-rose-500/20 to-pink-500/10 dark:to-pink-500/20"
    },
    {
        title: "Career Roadmap",
        description: "A personalized, step-by-step AI generated path to achieve your long-term career goals.",
        icon: <Map className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
        gradient: "from-violet-500/10 dark:from-violet-500/20 to-purple-500/10 dark:to-purple-500/20"
    }
];

function FeatureCard({ feature, index, isCTA = false }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (isCTA) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: features.length * 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="p-6 sm:p-8 rounded-3xl bg-indigo-600 dark:bg-white text-white dark:text-indigo-950 flex flex-col items-center justify-center text-center gap-4 sm:gap-6 shadow-2xl perspective-1000"
            >
                <div style={{ transform: "translateZ(50px)" }} className="p-4 rounded-full bg-white/10 dark:bg-indigo-50 border border-white/20 dark:border-indigo-100 animate-bounce">
                    <TrendingUp className="w-8 sm:w-10 h-8 sm:h-10 text-white dark:text-indigo-600" />
                </div>
                <h3 style={{ transform: "translateZ(40px)" }} className="text-2xl sm:text-3xl font-black">Join the Elite</h3>
                <p style={{ transform: "translateZ(30px)" }} className="text-indigo-50 dark:text-indigo-900/70 font-medium text-sm sm:text-base">
                    Top 1% of candidates are using AI to land offers. Don't fall behind.
                </p>
                <button style={{ transform: "translateZ(50px)" }} className="w-full py-3 sm:py-4 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white rounded-2xl font-bold hover:bg-slate-100 dark:hover:bg-indigo-700 transition-colors shadow-xl text-sm sm:text-base">
                    Start Free Today
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 perspective-1000"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-2xl`} />
            <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function Features() {
    return (
        <section id="features" className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-slate-900 dark:text-white"
                >
                    Revolutionize Your Search
                </motion.h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
                    AI-powered tools designed to give you the unfair advantage in today's competitive job market.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                ))}
                <FeatureCard isCTA={true} />
            </div>
        </section>
    );
}