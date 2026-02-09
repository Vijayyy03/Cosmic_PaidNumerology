import { motion } from 'framer-motion';

const benefits = [
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4M12 16h.01" />
            </svg>
        ),
        title: 'Personalized Calculation',
        description: 'Your report is uniquely generated based on your exact birth details and full name.',
    },
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        title: 'Accurate Number Mapping',
        description: 'Precise algorithms based on traditional Pythagorean and Chaldean numerology systems.',
    },
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        title: 'Actionable Insights',
        description: 'Practical guidance for career, relationships, and personal growth — not vague predictions.',
    },
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        title: 'Instant Digital Report',
        description: 'Receive your complete numerology report within seconds of submission.',
    },
];

const WhyThisReport = () => {
    return (
        <section className="section">
            <div className="container-custom">
                <motion.h2
                    className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Why Choose <span className="gold-text">Our Report?</span>
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl text-center hover:border-accent-gold hover:shadow-gold transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 rounded-xl text-accent-gold">
                                {benefit.icon}
                            </div>
                            <h3 className="font-heading text-lg font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyThisReport;
