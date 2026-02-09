import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { getInterpretation } from '../data/interpretations';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const NumberCard = ({ number, title, subtitle, delay = 0 }) => (
    <motion.div
        className="vedic-card-gold text-center relative overflow-hidden group hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="text-[var(--text-muted-dark)] text-sm mb-2 relative z-10 font-medium tracking-wide">{subtitle}</div>
        <div className="relative z-10 my-2">
            <span className="text-5xl md:text-6xl heading-vedic font-bold text-maroon">{number}</span>
        </div>
        <h3 className="heading-vedic text-lg font-semibold mt-2 relative z-10 text-[var(--color-gold-dark)]">{title}</h3>

        {/* Decorative corners */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--color-gold)] opacity-50"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[var(--color-gold)] opacity-50"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[var(--color-gold)] opacity-50"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--color-gold)] opacity-50"></div>
    </motion.div>
);

const InterpretationSection = ({ title, icon, children, delay = 0 }) => (
    <motion.div
        className="vedic-card-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="flex items-center gap-4 mb-6 border-b border-[var(--border-maroon)] pb-4">
            <span className="text-3xl">{icon}</span>
            <h3 className="heading-vedic text-xl md:text-2xl font-semibold text-maroon">{title}</h3>
        </div>
        {children}
    </motion.div>
);

const ReportPage = () => {
    const navigate = useNavigate();
    const { report, formData, clearReport } = useReport();

    // Redirect if no report data
    useEffect(() => {
        if (!report) {
            navigate('/numerology-form');
        }
    }, [report, navigate]);

    if (!report) return null;

    const lifePathData = getInterpretation(report.lifePath, 'lifePath');
    const destinyText = getInterpretation(report.destiny, 'destiny');
    const soulUrgeText = getInterpretation(report.soulUrge, 'soulUrge');
    const personalityText = getInterpretation(report.personality, 'personality');

    const handleNewReport = () => {
        clearReport();
        navigate('/numerology-form');
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-header border-b border-[var(--color-gold)] shadow-md">
                <div className="container-main py-3 flex items-center justify-between">
                    <motion.button
                        onClick={() => navigate('/numerology')}
                        className="flex items-center gap-2 text-[var(--color-cream)] hover:text-gold transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Home</span>
                    </motion.button>

                    <motion.button
                        onClick={handleNewReport}
                        className="btn-outline-gold text-xs py-2 px-4 !text-[var(--color-cream)] !border-[var(--color-cream)] hover:!bg-[var(--color-cream)] hover:!text-maroon"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        New Report
                    </motion.button>
                </div>
            </header>

            <main className="relative z-10 py-12 px-4">
                <div className="container-main">
                    {/* Title Section */}
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <div className="sanskrit-accent mb-4 text-xl">॥ भाग्यं फलति सर्वत्र ॥</div>

                        <motion.div
                            className="inline-flex items-center gap-2 px-6 py-2 mb-6 text-sm font-medium text-maroon bg-[var(--color-gold-pale)] rounded-full border border-[var(--color-gold)]"
                            variants={fadeInUp}
                        >
                            <span>✨</span>
                            <span className="heading-vedic tracking-wider">Vedic Numerology Report</span>
                            <span>✨</span>
                        </motion.div>

                        <motion.h1
                            className="heading-vedic text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-maroon"
                            variants={fadeInUp}
                        >
                            {formData?.name || 'Your'}'s <span className="text-gold">Cosmic Chart</span>
                        </motion.h1>

                        <motion.div className="flex items-center justify-center gap-2 text-[var(--text-muted-dark)]" variants={fadeInUp}>
                            <span className="text-gold">❖</span>
                            <span>Born: {formData?.dob || report.dob}</span>
                            <span className="text-gold">❖</span>
                        </motion.div>
                    </motion.div>

                    {/* Numbers Grid */}
                    <section className="mb-20">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            <NumberCard
                                number={report.lifePath}
                                title="Life Path"
                                subtitle="Your Purpose"
                                delay={0.1}
                            />
                            <NumberCard
                                number={report.destiny}
                                title="Destiny"
                                subtitle="Your Mission"
                                delay={0.2}
                            />
                            <NumberCard
                                number={report.soulUrge}
                                title="Soul Urge"
                                subtitle="Your Desire"
                                delay={0.3}
                            />
                            <NumberCard
                                number={report.personality}
                                title="Personality"
                                subtitle="Your Image"
                                delay={0.4}
                            />
                        </div>
                    </section>

                    {/* Life Path Section */}
                    <section className="mb-12">
                        <InterpretationSection
                            title={`Life Path ${report.lifePath}: ${lifePathData.title}`}
                            icon="🛤️"
                            delay={0.1}
                        >
                            <p className="text-[var(--text-dark)] leading-relaxed mb-8 text-lg">{lifePathData.description}</p>

                            {/* Strengths & Challenges */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-[var(--color-parchment)] p-6 rounded-lg border border-[var(--border-gold)]">
                                    <h4 className="heading-vedic font-semibold mb-4 flex items-center gap-2 text-maroon">
                                        <span>💪</span> Strengths
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {lifePathData.strengths.map((strength, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm bg-white text-[var(--text-dark)] rounded-md border border-[var(--color-gold-pale)] shadow-sm"
                                            >
                                                {strength}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[var(--color-parchment)] p-6 rounded-lg border border-[var(--border-gold)]">
                                    <h4 className="heading-vedic font-semibold mb-4 flex items-center gap-2 text-[var(--color-orange-burnt)]">
                                        <span>⚡</span> Challenges
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {lifePathData.challenges.map((challenge, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm bg-white text-[var(--text-dark)] rounded-md border border-[var(--color-orange)] shadow-sm"
                                            >
                                                {challenge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </InterpretationSection>
                    </section>

                    {/* Destiny Section */}
                    <section className="mb-12">
                        <InterpretationSection
                            title={`Destiny Number ${report.destiny}`}
                            icon="⭐"
                            delay={0.15}
                        >
                            <p className="text-[var(--text-dark)] leading-relaxed text-lg">{destinyText}</p>
                        </InterpretationSection>
                    </section>

                    {/* Soul Urge Section */}
                    <section className="mb-12">
                        <InterpretationSection
                            title={`Soul Urge Number ${report.soulUrge}`}
                            icon="❤️"
                            delay={0.2}
                        >
                            <p className="text-[var(--text-dark)] leading-relaxed text-lg">{soulUrgeText}</p>
                        </InterpretationSection>
                    </section>

                    {/* Personality Section */}
                    <section className="mb-12">
                        <InterpretationSection
                            title={`Personality Number ${report.personality}`}
                            icon="🎭"
                            delay={0.25}
                        >
                            <p className="text-[var(--text-dark)] leading-relaxed text-lg">{personalityText}</p>
                        </InterpretationSection>
                    </section>

                    {/* Career Guidance */}
                    <section className="mb-12">
                        <InterpretationSection
                            title="Career Guidance"
                            icon="💼"
                            delay={0.3}
                        >
                            <p className="text-[var(--text-dark)] leading-relaxed text-lg">{lifePathData.career}</p>
                        </InterpretationSection>
                    </section>

                    {/* Lucky Elements */}
                    <section className="mb-20">
                        <InterpretationSection
                            title="Your Auspicious Elements"
                            icon="🍀"
                            delay={0.35}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-6 bg-[var(--color-parchment)] rounded-lg border border-[var(--border-gold)]">
                                    <div
                                        className="w-16 h-16 rounded-full mx-auto mb-3 shadow-md border-2 border-white"
                                        style={{ backgroundColor: lifePathData.luckyColor }}
                                    />
                                    <p className="heading-vedic text-sm text-[var(--text-muted-dark)] mb-1">Lucky Color</p>
                                    <p className="font-bold text-maroon">{lifePathData.luckyColorName}</p>
                                </div>
                                <div className="text-center p-6 bg-[var(--color-parchment)] rounded-lg border border-[var(--border-gold)]">
                                    <div className="text-4xl font-heading font-bold text-gold mb-3">
                                        {lifePathData.luckyNumber}
                                    </div>
                                    <p className="heading-vedic text-sm text-[var(--text-muted-dark)] mb-1">Lucky Number</p>
                                    <p className="font-bold text-maroon">Primary</p>
                                </div>
                                <div className="text-center p-6 bg-[var(--color-parchment)] rounded-lg border border-[var(--border-gold)]">
                                    <div className="text-4xl mb-3">📅</div>
                                    <p className="heading-vedic text-sm text-[var(--text-muted-dark)] mb-1">Lucky Day</p>
                                    <p className="font-bold text-maroon">{lifePathData.luckyDay}</p>
                                </div>
                                <div className="text-center p-6 bg-[var(--color-parchment)] rounded-lg border border-[var(--border-gold)]">
                                    <div className="text-4xl mb-3">🔢</div>
                                    <p className="heading-vedic text-sm text-[var(--text-muted-dark)] mb-1">Birthday Number</p>
                                    <p className="font-bold text-maroon">{report.birthday}</p>
                                </div>
                            </div>
                        </InterpretationSection>
                    </section>

                    {/* CTA Section */}
                    <motion.section
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div className="vedic-card-dark relative overflow-hidden p-10 md:p-14" variants={fadeInUp}>
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #c9a227 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                            <h2 className="heading-vedic text-2xl md:text-3xl font-bold mb-6 text-[var(--color-cream)]">
                                Seek <span className="text-gold">Deeper Guidance</span>?
                            </h2>
                            <p className="text-[var(--text-muted-light)] mb-10 max-w-2xl mx-auto text-lg">
                                Consult with our expert Vedic numerologists for a detailed analysis of your chart, relationships, and future timeline.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <motion.button
                                    className="btn-gold flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.print()}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12l7 7 7-7" />
                                    </svg>
                                    Download Chart
                                </motion.button>
                                <motion.button
                                    className="btn-maroon border border-[var(--color-gold)]"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Book Consultation
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-header py-8 border-t border-[var(--color-gold)]">
                <div className="container-main text-center">
                    <div className="sanskrit-accent mb-2">॥ ॐ तत् सत् ॥</div>
                    <p className="text-[var(--text-muted-light)] text-sm">
                        © {new Date().getFullYear()} Shiv Cosmic Energy Solutions. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ReportPage;
