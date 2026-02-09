import { motion } from 'framer-motion';

const features = [
    {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        title: 'Life Path Number',
        description: 'Your core life purpose and the journey you\'re destined to walk',
    },
    {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: 'Destiny / Expression Number',
        description: 'Your talents, abilities, and the goals you\'re meant to achieve',
    },
    {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
        title: 'Personality Traits',
        description: 'Understand your strengths, challenges, and inner motivations',
    },
    {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        title: 'Career & Relationships',
        description: 'Actionable insights for work success and meaningful connections',
    },
];

const WhatIsNumerology = () => {
    return (
        <section className="section bg-gradient-to-b from-cosmic-surface to-cosmic-dark">
            <div className="container-custom">
                <motion.h2
                    className="font-heading text-3xl md:text-4xl font-semibold text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    What is <span className="gold-text">Numerology?</span>
                </motion.h2>

                <motion.p
                    className="text-lg text-text-muted text-center max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Numerology is an ancient science that reveals deep insights about your personality,
                    life purpose, and destiny through the power of numbers. By analyzing your birth date
                    and name, numerology uncovers patterns that shape your experiences and guide your path forward.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex gap-4 p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-cosmic-indigo/40 hover:bg-cosmic-indigo/5 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ y: -2 }}
                        >
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-cosmic-indigo to-cosmic-deep rounded-lg text-white">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-heading text-lg font-semibold mb-1">{feature.title}</h3>
                                <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatIsNumerology;
