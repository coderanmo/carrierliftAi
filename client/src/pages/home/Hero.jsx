import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
    const containerRef = useRef(null);

    // Mouse movement values for spatial 3D effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth movement with springs
    const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    // Perspective transforms
    const rotateX = useTransform(smoothY, [-300, 300], [10, -10]);
    const rotateY = useTransform(smoothX, [-300, 300], [-10, 10]);

    // Z-axis layers for depth
    const layer1Z = useTransform(smoothY, [-300, 300], [20, -20]);
    const layer2Z = useTransform(smoothY, [-300, 300], [40, -40]);

    function handleMouseMove(event) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
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
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10 perspective-1000"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="text-center"
            >
                {/* Badge - Layer 1 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{ translateZ: layer1Z }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-[10px] sm:text-xs font-black mb-8 backdrop-blur-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase shadow-xl"
                >
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-indigo-500 dark:fill-indigo-400" />
                    <span>AI-Powered Career Transformation</span>
                </motion.div>

                {/* Headline - Layer 2 */}
                <motion.h1
                    style={{ translateZ: layer2Z }}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 sm:mb-10 leading-[0.95] text-slate-900 dark:text-white"
                >
                    Elevate Your <br />
                    <span className="bg-gradient-to-r from-indigo-600 via-emerald-500 to-indigo-600 dark:from-indigo-400 dark:via-emerald-400 dark:to-indigo-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                        Professional Future
                    </span>
                </motion.h1>

                {/* Subtitle - Layer 1 */}
                <motion.p
                    style={{ translateZ: layer1Z }}
                    className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 sm:mb-14 font-medium leading-relaxed"
                >
                    Unlock your full potential with personalized AI guidance. From resume optimization to interview preparation, we provide the tools you need to land your dream job.
                </motion.p>

                {/* CTA Buttons - Layer 2 */}
                <motion.div
                    style={{ translateZ: layer2Z }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, translateZ: 20 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <span>Get Started Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, translateZ: 20 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span>Explore Features</span>
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}