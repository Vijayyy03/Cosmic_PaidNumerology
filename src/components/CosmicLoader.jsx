import { motion } from 'framer-motion';

const CosmicLoader = ({ message = "Calculating your numbers..." }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cosmic-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Cosmic background */}
            <div className="absolute inset-0 cosmic-gradient">
                <div className="stars-bg absolute inset-0 animate-twinkle opacity-40" />
            </div>

            {/* Mandala / Spinner */}
            <div className="relative z-10">
                {/* Outer ring */}
                <motion.div
                    className="w-32 h-32 rounded-full border-4 border-accent-gold/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                        <div
                            key={angle}
                            className="absolute w-3 h-3 rounded-full bg-accent-gold"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60px)`
                            }}
                        />
                    ))}
                </motion.div>

                {/* Middle ring */}
                <motion.div
                    className="absolute inset-4 rounded-full border-2 border-cosmic-indigo/50"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <div
                            key={angle}
                            className="absolute w-2 h-2 rounded-full bg-cosmic-indigo"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-44px)`
                            }}
                        />
                    ))}
                </motion.div>

                {/* Inner glow */}
                <motion.div
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-accent-gold/20 to-cosmic-indigo/20"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Center symbol */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-4xl">✨</span>
                </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
                className="relative z-10 mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-xl text-accent-gold font-heading mb-2">{message}</p>
                <motion.div className="flex justify-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-accent-gold"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent-gold/50"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </motion.div>
    );
};

export default CosmicLoader;
