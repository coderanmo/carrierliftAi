import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Target, LineChart, BookOpen, Bot, Award, Zap } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const roadmapSteps = [
    {
        stage: "Process 01",
        title: "Profile Assessment",
        desc: "AI scans your skills, history, and goals to build your baseline.",
        icon: <Target className="w-6 h-6" />,
        color: "from-indigo-500 to-blue-600",
        glow: "bg-indigo-500/20",
        position: "lg:col-start-1 lg:row-start-1"
    },
    {
        stage: "Process 02",
        title: "Skill Mapping",
        desc: "Identify critical technical and soft skill gaps for your target role.",
        icon: <LineChart className="w-6 h-6" />,
        color: "from-rose-500 to-pink-600",
        glow: "bg-rose-500/20",
        position: "lg:col-start-3 lg:row-start-1 lg:mt-24"
    },
    {
        stage: "Process 03",
        title: "Learning Path",
        desc: "Personalized course and project recommendations to close gaps.",
        icon: <BookOpen className="w-6 h-6" />,
        color: "from-emerald-500 to-teal-600",
        glow: "bg-emerald-500/20",
        position: "lg:col-start-2 lg:row-start-2 lg:-mt-12"
    },
    {
        stage: "Process 04",
        title: "Mock Interview",
        desc: "AI simulated environments to test your readiness for reality.",
        icon: <Bot className="w-6 h-6" />,
        color: "from-amber-500 to-orange-600",
        glow: "bg-amber-500/20",
        position: "lg:col-start-1 lg:row-start-3"
    },
    {
        stage: "Process 05",
        title: "Job Placement",
        desc: "Automated matched applications and direct referrals to top firms.",
        icon: <Award className="w-6 h-6" />,
        color: "from-violet-500 to-purple-600",
        glow: "bg-violet-500/20",
        position: "lg:col-start-3 lg:row-start-3 lg:mt-12"
    },
];

function SpatialNode({ step, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            className={`relative group ${step.position}`}
        >
            {/* Glow Background */}
            <div className={`absolute -inset-8 ${step.glow} blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

            <div className="relative z-10 p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent border border-white/20 dark:border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:border-white/40 dark:group-hover:border-white/20">
                <div className="bg-white dark:bg-slate-900/40 rounded-[2.3rem] p-8 sm:p-10 h-full">
                    <div className="flex flex-col gap-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg flex items-center justify-center text-white relative`}>
                            {step.icon}
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-white rounded-2xl blur-md"
                            />
                        </div>

                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 mb-2 block">
                                {step.stage}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                                {step.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Roadmap({ roadmapRef }) {
    const { scrollYProgress } = useScroll({
        target: roadmapRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    return (
        <section id="roadmap" ref={roadmapRef} className="relative py-24 sm:py-32 lg:py-48 bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-700">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24 lg:mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Zap size={14} className="fill-current" />
                        <span>Spatial Evolution</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]"
                    >
                        Mapping the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-500 bg-[length:200%_auto] animate-gradient">Professional Grid</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl lg:text-2xl font-medium max-w-3xl mx-auto"
                    >
                        Navigate a non-linear career trajectory powered by recursive AI matching and spatial skills modeling.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* The Snaking Energy Path (Desktop Only for complexity) */}
                    <div className="absolute inset-0 hidden lg:block pointer-events-none z-0">
                        <svg className="w-full h-full" viewBox="0 0 1200 1000" fill="none" preserveAspectRatio="none">
                            <motion.path
                                d="M 200 150 Q 600 0 1000 250 T 600 500 T 200 750 T 1000 900"
                                stroke="url(#energyGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                style={{ pathLength }}
                            />
                            <defs>
                                <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="50%" stopColor="#a855f7" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Nodes Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-x-24 lg:gap-y-48 items-start relative z-10">
                        {roadmapSteps.map((step, idx) => (
                            <SpatialNode key={idx} step={step} index={idx} />
                        ))}
                    </div>
                </div>

                {/* Grid Connection Base */}
                <div className="mt-40 pt-20 border-t border-slate-200 dark:border-white/5 flex flex-col items-center">
                    <div className="w-1.5 h-32 bg-gradient-to-b from-indigo-500 to-transparent rounded-full mb-8" />
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="px-8 py-4 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-white/10 font-black text-sm uppercase tracking-[0.4em] text-slate-500"
                    >
                        System expansion active
                    </motion.div>
                </div>
            </div>
        </section>
    );
}