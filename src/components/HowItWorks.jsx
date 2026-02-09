import { motion } from 'framer-motion';

const steps = [
    {
        number: 1,
        title: 'Enter Your Details',
        description: 'Provide your name, date of birth, and preferred language',
    },
    {
        number: 2,
        title: 'We Calculate',
        description: 'Our numerology engine analyzes your numbers using precise methods',
    },
    {
        number: 3,
        title: 'Receive Your Report',
        description: 'Get your personalized numerology report instantly',
    },
];

const HowItWorks = () => {
    return (
        <section className="section bg-gradient-to-b from-cosmic-dark via-cosmic-surface to-cosmic-dark">
            <div className="container-custom">
                <motion.h2
                    className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    How It <span className="gold-text">Works</span>
                </motion.h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <motion.div
                                className="flex flex-col items-center text-center max-w-[250px] px-4 md:px-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 * index }}
                            >
                                <div className="w-14 h-14 mb-4 flex items-center justify-center font-heading text-2xl font-bold text-cosmic-dark bg-gradient-to-br from-accent-gold to-accent-goldDark rounded-full shadow-gold">
                                    {step.number}
                                </div>
                                <h3 className="font-heading text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-text-muted text-sm">{step.description}</p>
                            </motion.div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-accent-gold to-transparent flex-shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
