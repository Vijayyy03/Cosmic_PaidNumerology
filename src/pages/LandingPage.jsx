import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        { question: "How to find numerology numbers?", answer: "Take the numerical value of your date of birth, add all the digits together by category (year, month, day), and keep adding each digit until you reach a single digit." },
        { question: "How does numerology work?", answer: "Your ruling number is calculated by adding the numbers from your birth date. This serves as a roadmap for your life." },
        { question: "Which is the most powerful number in numerology?", answer: "According to numerology experts, the number 22 is the most powerful. Master numbers 11, 22, and 33 are the pinnacle of numerology power." },
        { question: "What is an enemy number in numerology?", answer: "Numbers become hostile when they are in vibration with one another in certain combinations. Each number has friendly, enemy, and neutral numbers." },
        { question: "How do I find friendly numbers?", answer: "Numerology can determine compatibility between two people with different numbers. Use our calculator to find which number is friendly to yours." },
        { question: "Is numerology really effective?", answer: "Numerology can be helpful if you apply it to your daily life. It has the potential to lead to personal fulfillment and enjoyment." },
    ];

    return (
        <div className="min-h-screen bg-cream">
            {/* Header */}
            <header className="bg-header py-4 px-4">
                <div className="container-main flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <img
                            src="/images/logo.png"
                            alt="Shiv Cosmic"
                            className="h-12 w-auto"
                        />
                        <nav className="hidden md:flex items-center gap-6 text-[var(--color-cream)] text-sm">
                            <a href="#" className="hover:text-gold transition-colors">Home</a>
                            <a href="#" className="hover:text-gold transition-colors">Services</a>
                            <a href="#" className="hover:text-gold transition-colors">Reports</a>
                            <a href="#" className="hover:text-gold transition-colors">Contact</a>
                        </nav>
                    </div>
                    <button onClick={() => navigate('/numerology-form')} className="btn-gold text-xs py-2.5 px-5">
                        Get Report
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-hero py-20 px-4 relative">
                <div className="container-main relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="sanskrit-accent mb-4">॥ श्री गणेशाय नमः ॥</div>

                            <h1 className="heading-vedic text-4xl md:text-5xl font-bold text-[var(--color-cream)] mb-6 leading-tight">
                                Discover Your
                                <span className="text-gold block">Cosmic Destiny</span>
                                Through Numbers
                            </h1>

                            <p className="text-[var(--text-muted-light)] mb-8 leading-relaxed">
                                Unlock the ancient wisdom of Vedic Numerology. Your birth date holds the secrets to your personality, relationships, career, and life purpose.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <button onClick={() => navigate('/numerology-form')} className="btn-gold">
                                    Get Your Report
                                </button>
                                <button className="btn-outline-gold">
                                    Learn More
                                </button>
                            </div>

                            <div className="flex items-center gap-6 text-[var(--color-cream)] text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-gold">✓</span>
                                    <span>Vedic Principles</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gold">✓</span>
                                    <span>Personalized Report</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="image-vedic overflow-hidden" style={{ maxWidth: '380px' }}>
                                <img
                                    src="/images/Numerology_Banner.jpg"
                                    alt="Numerology Report"
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section - Light Background */}
            <section className="bg-section-light py-20 px-4">
                <div className="container-main">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="heading-vedic text-3xl font-bold text-maroon mb-3">
                            The Ancient Science of Numbers
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="vedic-card-light"
                        >
                            <div className="text-gold text-2xl mb-3">॥ १ ॥</div>
                            <h3 className="heading-vedic text-xl font-semibold text-maroon mb-3">What is Numerology?</h3>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Numerology is the ancient science of numbers, derived from the Latin "numerus" and Greek "logos." It is a sacred method of divination where numerical vibrations reveal patterns and trends that guide your future path.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="vedic-card-light"
                        >
                            <div className="text-gold text-2xl mb-3">॥ २ ॥</div>
                            <h3 className="heading-vedic text-xl font-semibold text-maroon mb-3">Why Numerology?</h3>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Numerology guides you toward personal fulfillment. Use it to find compatible partners, choose the right career, determine your destiny, and take advantage of auspicious days aligned with your cosmic vibrations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works - Dark Background */}
            <section className="bg-section-dark py-20 px-4">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <div className="image-vedic p-4 bg-[var(--color-cream)]" style={{ maxWidth: '300px' }}>
                                <img
                                    src="/images/image.jpg"
                                    alt="Numerology Chart"
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="sanskrit-accent mb-3">॥ विद्या ॥</div>
                            <h2 className="heading-vedic text-3xl font-bold text-cream mb-6">
                                How Does <span className="text-gold">Numerology</span> Work?
                            </h2>

                            <div className="space-y-4 text-[var(--text-muted-light)] text-sm leading-relaxed">
                                <p>
                                    Your <span className="text-gold font-semibold">ruling number</span> is calculated by adding the digits of your birth date. This sacred number serves as a roadmap for your entire life journey.
                                </p>
                                <p>
                                    Through Vedic Numerology, gain insights about relationships, health, career, and your <span className="text-gold font-semibold">Karmic Pathway</span>. The day of your birth reveals your chosen mission.
                                </p>
                                <p>
                                    Shiv Cosmic provides complete numerology reports based on ancient <span className="text-gold font-semibold">Vedic Principles</span>, helping you understand yourself and your place in the universe.
                                </p>
                            </div>

                            <button onClick={() => navigate('/numerology-form')} className="btn-gold mt-8">
                                Get Your Report Now
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQs - Light Background */}
            <section className="bg-section-light py-20 px-4">
                <div className="container-main max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="heading-vedic text-3xl font-bold text-maroon mb-3">
                            Frequently Asked Questions
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="vedic-card-light !p-0 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-4 text-left"
                                >
                                    <span className="heading-vedic text-sm font-medium text-maroon">{faq.question}</span>
                                    <span className="text-gold text-lg transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                                        +
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-4 pb-4 text-[var(--text-muted-dark)] text-sm leading-relaxed border-t border-[var(--border-maroon)]">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-maroon py-16 px-4 text-center">
                <div className="container-main">
                    <div className="sanskrit-accent mb-4 text-gold">॥ शुभारंभ ॥</div>
                    <h2 className="heading-vedic text-2xl md:text-3xl font-bold text-cream mb-4">
                        Ready to Discover Your Numbers?
                    </h2>
                    <p className="text-[var(--text-muted-light)] mb-8 max-w-xl mx-auto">
                        Begin your journey into the ancient wisdom of Vedic Numerology today.
                    </p>
                    <button onClick={() => navigate('/numerology-form')} className="btn-gold">
                        Get Your Free Report
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-header py-12 px-4">
                <div className="container-main">
                    <div className="grid md:grid-cols-4 gap-8 mb-10">
                        <div>
                            <img
                                src="/images/logo.png"
                                alt="Shiv Cosmic"
                                className="h-14 w-auto mb-4"
                            />
                            <p className="text-[var(--text-muted-light)] text-xs">
                                Guiding souls through ancient Vedic wisdom
                            </p>
                        </div>

                        <div>
                            <h4 className="heading-vedic text-gold font-semibold mb-4 text-sm">Services</h4>
                            <div className="space-y-2 text-sm text-[var(--text-muted-light)]">
                                <a href="#" className="block hover:text-gold transition-colors">Numerology Report</a>
                                <a href="#" className="block hover:text-gold transition-colors">Kundli Report</a>
                                <a href="#" className="block hover:text-gold transition-colors">Astro Mapping</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="heading-vedic text-gold font-semibold mb-4 text-sm">Contact</h4>
                            <div className="space-y-2 text-sm text-[var(--text-muted-light)]">
                                <p>📞 +91 7030127129</p>
                                <p>✉️ info.shivcosmic@gmail.com</p>
                                <p>📍 Pune, Maharashtra</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="heading-vedic text-gold font-semibold mb-4 text-sm">Legal</h4>
                            <div className="space-y-2 text-sm text-[var(--text-muted-light)]">
                                <a href="#" className="block hover:text-gold transition-colors">Privacy Policy</a>
                                <a href="#" className="block hover:text-gold transition-colors">Terms & Conditions</a>
                                <a href="#" className="block hover:text-gold transition-colors">Refund Policy</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[rgba(201,162,39,0.2)] pt-6 text-center">
                        <div className="sanskrit-accent mb-2">॥ ॐ ॥</div>
                        <p className="text-[var(--text-muted-light)] text-xs">
                            © 2024-2026 Shiv Cosmic Energy Solutions. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Fixed CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <button onClick={() => navigate('/numerology-form')} className="btn-maroon shadow-lg">
                    Get Report
                </button>
            </motion.div>
        </div>
    );
};

export default LandingPage;
