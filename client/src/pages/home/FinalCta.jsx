import { motion } from 'framer-motion';

export default function FinalCta() {
    return (
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-8 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-5 sm:mb-8 text-slate-900 dark:text-white">
                        Ready to Lift Off?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-xl max-w-sm sm:max-w-lg mx-auto leading-relaxed">
                        Join the private beta today and secure your early-adopter advantage.
                    </p>
                </motion.div>
                <button className="px-8 sm:px-12 py-4 sm:py-6 bg-slate-900 dark:bg-white text-white dark:text-[#020617] rounded-2xl sm:rounded-3xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] text-base sm:text-xl">
                    Reserve My Access Now
                </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[300px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[100px] sm:blur-[150px] -z-10 rounded-full rotate-12" />
        </section>
    );
}