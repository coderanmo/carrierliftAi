import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Hero from './Hero';
import Features from './Features';
import Roadmap from './Roadmap';
import WhyAi from './WhyAi';
import FinalCta from './FinalCta';

export default function Home() {
    const roadmapRef = useRef(null);

    return (
        <div className="flex flex-col min-h-screen">

            {/* ── Mesh Background ─────────────────────── */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] rounded-full bg-emerald-500/10 dark:bg-emerald-600/15 blur-[120px]"
                />
            </div>

            {/* ── HERO ────────────────────────────────── */}
            <Hero />

            {/* ── FEATURES ─────────────────────────────── */}
            <Features />

            {/* ── ROADMAP ──────────────────────────────── */}
            <Roadmap roadmapRef={roadmapRef} />

            {/* ── WHY AI ──────────────────────────────── */}
            <WhyAi />

            {/* ── FINAL CTA ────────────────────────────── */}
            <FinalCta />
        </div>
    );
}
