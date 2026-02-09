import { motion } from 'framer-motion';

const Hero = () => {
    const scrollToForm = () => {
        document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Cosmic Background */}
            <div className="absolute inset-0 cosmic-gradient">
                {/* Animated Stars */}
                <div className="stars-bg absolute inset-0 animate-twinkle opacity-60" />
                <div className="stars-bg absolute inset-0 animate-twinkle opacity-40" style={{ backgroundPosition: '50px 50px', animationDelay: '-1s' }} />
                <div className="stars-bg absolute inset-0 animate-twinkle opacity-30" style={{ backgroundPosition: '100px 100px', animationDelay: '-2s' }} />

                {/* Floating Orbs */}
                <div className="floating-orb w-72 h-72 bg-cosmic-indigo/30 top-[10%] left-[-5%]" />
                <div className="floating-orb w-52 h-52 bg-accent-gold/15 top-[60%] right-[-5%]" style={{ animationDelay: '-3s' }} />
                <div className="floating-orb w-64 h-64 bg-cosmic-indigo/20 bottom-[5%] left-[30%]" style={{ animationDelay: '-5s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <motion.h1
                    className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Unlock Your Personalized
                    <br />
                    <span className="gold-text">Numerology Report</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-text-muted mb-10 max-w-xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Discover your life path, destiny number, strengths, challenges, and future guidance using accurate numerology calculations.
                </motion.p>

                <motion.button
                    onClick={scrollToForm}
                    className="btn-primary animate-pulse-glow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span>Generate My Report</span>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
