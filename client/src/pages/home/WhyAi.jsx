import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Zap, TrendingUp, Users } from 'lucide-react';
import { useRef } from 'react';

export default function WhyAi() {
    const dashboardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        if (!dashboardRef.current) return;
        const rect = dashboardRef.current.getBoundingClientRect();
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

    return (
        <section id="why-ai" className="relative py-20 sm:py-28 lg:py-32 bg-slate-50 dark:bg-slate-950/20 perspective-1000">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">

                {/* AI Dashboard mockup */}
                <motion.div
                    ref={dashboardRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative order-2 lg:order-1"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="aspect-video md:aspect-square rounded-2xl sm:rounded-[3rem] bg-gradient-to-tr from-indigo-500/5 to-emerald-500/5 border border-black/5 dark:border-white/5 p-1 relative overflow-hidden group shadow-2xl"
                    >
                        <div style={{ transform: "translateZ(60px)" }} className="absolute inset-4 sm:inset-8 rounded-xl sm:rounded-[2rem] bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 backdrop-blur-2xl">
                            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center font-black text-base sm:text-xl italic text-white">CL</div>
                                    <div>
                                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">AI Engine v4.0</div>
                                        <div className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-500 font-mono flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-pulse" /> Live Analysis
                                        </div>
                                    </div>
                                </div>
                                <Users className="text-slate-400 dark:text-slate-600" size={16} />
                            </div>
                            <div className="space-y-4 sm:space-y-6">
                                {[
                                    { label: "Precision Score", value: "94.8%", color: "bg-indigo-600 dark:bg-indigo-500" },
                                    { label: "Market Volatility", value: "Low", color: "bg-emerald-600 dark:bg-emerald-500" },
                                    { label: "Competitive Intensity", value: "High", color: "bg-rose-600 dark:bg-rose-500" },
                                ].map((metric, i) => (
                                    <div key={i} style={{ transform: "translateZ(30px)" }}>
                                        <div className="flex justify-between text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-2">
                                            <span>{metric.label}</span>
                                            <span className="text-slate-900 dark:text-white font-bold">{metric.value}</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "70%" }}
                                                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                                                className={`h-full ${metric.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ transform: "translateZ(40px)" }} className="mt-auto p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[9px] sm:text-[10px] text-slate-500 font-mono leading-relaxed">
                                [SYSTEM]: Analyzing 450,000 data points... <br />
                                [RESULT]: Shift focus to AI Integration → +22% salary ceiling.
                            </div>
                        </div>
                        {/* Decorative background elements for depth */}
                        <div style={{ transform: "translateZ(-20px)" }} className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />
                        <div style={{ transform: "translateZ(-40px)" }} className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
                    </motion.div>
                </motion.div>

                {/* Text column */}
                <div className="space-y-8 sm:space-y-10 order-1 lg:order-2">
                    <div>
                        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black mb-4 sm:mb-6 tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                            <Zap size={16} className="fill-indigo-600 dark:fill-indigo-400" />
                            <span>Modern Advantage</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.1] text-slate-900 dark:text-white">
                            Execution <br /> over <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">Optimization</span>.
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                            We don't just optimize your resume. We map your entire professional trajectory using data normally reserved for Fortune 500 recruiters.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:gap-6">
                        {[
                            { title: "Real-time Matching", desc: "Our algorithms connect you to opportunities minutes after they go live.", icon: <Zap size={18} /> },
                            { title: "Trajectory Predictions", desc: "Estimate your potential salary growth based on current upskilling efforts.", icon: <TrendingUp size={18} /> },
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex gap-4 sm:gap-6 items-center group hover:bg-slate-50 dark:hover:bg-white/[0.08] transition-all cursor-default shadow-sm hover:shadow-md">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 shadow-xl group-hover:scale-110 transition-transform shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base lg:text-lg">{item.title}</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}