import { motion } from 'framer-motion';

const ReportDisplay = ({ report, userName, onNewReport }) => {
    const downloadPDF = () => {
        // Placeholder for PDF generation
        alert('PDF download feature coming soon!');
    };

    const emailReport = () => {
        // Placeholder for email functionality
        alert('Email feature coming soon!');
    };

    return (
        <section id="report-section" className="section bg-gradient-to-b from-cosmic-surface to-cosmic-dark">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-2">
                            Your Numerology <span className="gold-text">Report</span>
                        </h2>
                        <p className="text-text-muted">
                            Generated for <span className="text-accent-gold font-medium">{userName}</span>
                        </p>
                    </div>

                    {/* Number Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Life Path Number */}
                        <motion.div
                            className="glass-card p-6 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center font-heading text-4xl font-bold text-cosmic-dark bg-gradient-to-br from-accent-gold to-accent-goldDark rounded-full shadow-gold">
                                {report.lifePathNumber}
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Life Path Number</h3>
                            <p className="text-text-muted text-sm">
                                Your Life Path Number {report.lifePathNumber} reveals your core purpose and the journey you are meant to walk in this lifetime.
                            </p>
                        </motion.div>

                        {/* Destiny Number */}
                        <motion.div
                            className="glass-card p-6 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center font-heading text-4xl font-bold text-cosmic-dark bg-gradient-to-br from-accent-gold to-accent-goldDark rounded-full shadow-gold">
                                {report.destinyNumber}
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Destiny Number</h3>
                            <p className="text-text-muted text-sm">
                                Your Destiny Number {report.destinyNumber} shows your talents, abilities, and the goals you are naturally inclined to achieve.
                            </p>
                        </motion.div>
                    </div>

                    {/* Analysis Sections */}
                    <div className="space-y-6">
                        {/* Personality */}
                        <motion.div
                            className="glass-card p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2 text-accent-gold/90">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Personality Analysis
                            </h3>
                            <p className="text-text-muted leading-relaxed">{report.personality}</p>
                        </motion.div>

                        {/* Career & Relationships */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div
                                className="glass-card p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2 text-accent-gold/90">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                    Career Insights
                                </h3>
                                <p className="text-text-muted leading-relaxed text-sm">{report.career}</p>
                            </motion.div>

                            <motion.div
                                className="glass-card p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 }}
                            >
                                <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2 text-accent-gold/90">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    Relationship Insights
                                </h3>
                                <p className="text-text-muted leading-relaxed text-sm">{report.relationships}</p>
                            </motion.div>
                        </div>

                        {/* Future Guidance */}
                        <motion.div
                            className="glass-card p-6 border-accent-gold/20"
                            style={{ background: 'linear-gradient(135deg, rgba(245, 199, 122, 0.08) 0%, rgba(245, 199, 122, 0.02) 100%)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2 text-accent-gold/90">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                                </svg>
                                Future Guidance
                            </h3>
                            <p className="text-text-muted leading-relaxed">{report.futureGuidance}</p>
                        </motion.div>
                    </div>

                    {/* Actions */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <button onClick={downloadPDF} className="btn-secondary">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download PDF
                        </button>
                        <button onClick={emailReport} className="btn-outline">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Email Report
                        </button>
                        <button onClick={onNewReport} className="btn-outline">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 4 23 10 17 10" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                            New Report
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ReportDisplay;
