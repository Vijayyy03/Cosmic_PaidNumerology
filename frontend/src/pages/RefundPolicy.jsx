import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            {/* Header */}
            <header className="bg-header py-4 px-4 shadow-md sticky top-0 z-40">
                <div className="container-main flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/numerology')}>
                        <img src="/images/logo.png" alt="Shiv Cosmic" className="h-12 w-auto" />
                    </div>
                    <button onClick={() => navigate('/numerology')} className="btn-outline-gold text-xs py-2 px-4">
                        ← Back to Home
                    </button>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="bg-section-dark py-14 px-4 text-center">
                <div className="container-main">
                    <h1 className="heading-vedic text-3xl md:text-4xl font-bold text-[var(--color-cream)] mb-3">
                        Refund <span className="text-gold">Policy</span>
                    </h1>
                    <div className="divider-vedic">
                        <span className="text-gold">❖</span>
                    </div>
                    <p className="text-[var(--text-muted-light)] text-sm mt-4">Last Updated: February 10, 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-4">
                <div className="container-main max-w-4xl">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[rgba(107,45,45,0.08)] space-y-8">

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">1. Overview</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                At Shiv Cosmic Energy Solutions, we strive to provide the highest quality Vedic Numerology reports and ensure customer satisfaction. This Refund Policy outlines the circumstances under which refunds may be issued for our digital products and services. By purchasing our services, you acknowledge that you have read, understood, and agree to be bound by this Refund Policy.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">2. Digital Product Nature</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Our numerology reports are digital products delivered electronically in PDF format. Due to the instant-delivery nature of digital products, and because the report is generated and delivered immediately upon payment, refunds are generally not available once a report has been successfully generated and delivered.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">3. Eligible Refund Scenarios</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                We will consider refund requests in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-[var(--text-muted-dark)] text-sm">
                                <li>
                                    <strong className="text-maroon">Technical Failure:</strong> If you were charged but did not receive your report due to a technical error on our end. We will first attempt to re-deliver the report, and if that is not possible, a full refund will be issued.
                                </li>
                                <li>
                                    <strong className="text-maroon">Duplicate Payment:</strong> If you were accidentally charged more than once for the same report, the duplicate charge will be fully refunded.
                                </li>
                                <li>
                                    <strong className="text-maroon">Incorrect Report:</strong> If the report generated contains significant errors due to a system malfunction (not due to incorrect information provided by the user), we will re-generate the report at no additional cost or issue a refund.
                                </li>
                                <li>
                                    <strong className="text-maroon">Service Unavailability:</strong> If the service was unavailable for an extended period after payment and you no longer wish to receive the report.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">4. Non-Refundable Scenarios</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                Refunds will not be provided in the following cases:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-[var(--text-muted-dark)] text-sm">
                                <li>
                                    <strong className="text-maroon">Change of Mind:</strong> Refunds are not available if you simply change your mind after the report has been generated and delivered.
                                </li>
                                <li>
                                    <strong className="text-maroon">Incorrect User Input:</strong> If the report was generated based on incorrect information provided by you (e.g., wrong date of birth or name), a refund will not be issued. However, we may offer a discounted re-generation with corrected details at our discretion.
                                </li>
                                <li>
                                    <strong className="text-maroon">Dissatisfaction with Predictions:</strong> As numerology reports are based on ancient Vedic principles and are for informational/entertainment purposes, dissatisfaction with the content or predictions does not qualify for a refund.
                                </li>
                                <li>
                                    <strong className="text-maroon">Partial Usage:</strong> If the report has been downloaded or accessed, it is considered fully delivered.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">5. Refund Request Process</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                To request a refund, please follow these steps:
                            </p>
                            <div className="space-y-3">
                                <div className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(107,45,45,0.1)] border border-[var(--color-maroon)] flex items-center justify-center text-gold font-bold text-xs">1</div>
                                    <p className="text-[var(--text-muted-dark)] text-sm pt-1">Send an email to <strong className="text-maroon">info.shivcosmic@gmail.com</strong> with the subject line "Refund Request".</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(107,45,45,0.1)] border border-[var(--color-maroon)] flex items-center justify-center text-gold font-bold text-xs">2</div>
                                    <p className="text-[var(--text-muted-dark)] text-sm pt-1">Include your full name, email address, payment transaction ID, date of purchase, and a detailed reason for the refund request.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(107,45,45,0.1)] border border-[var(--color-maroon)] flex items-center justify-center text-gold font-bold text-xs">3</div>
                                    <p className="text-[var(--text-muted-dark)] text-sm pt-1">Our team will review your request and respond within <strong className="text-maroon">3-5 business days</strong>.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">6. Refund Timeline</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                Once a refund is approved:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li>Refunds will be processed to the original payment method within <strong>5-7 business days</strong>.</li>
                                <li>Bank processing times may vary, and it may take an additional 3-10 business days for the refund to reflect in your account.</li>
                                <li>You will receive an email confirmation once the refund has been initiated.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">7. Cancellation Policy</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Since our reports are generated and delivered instantly, there is no cancellation window once payment is confirmed and the report generation process has started. If you wish to cancel before completing payment, simply close the payment window or do not complete the transaction.
                            </p>
                        </div>

                        <div className="bg-[rgba(201,162,39,0.08)] rounded-xl p-6 border border-[rgba(201,162,39,0.2)]">
                            <h2 className="heading-vedic text-lg font-bold text-maroon mb-3">⚠️ Important Note</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                We value our customers and aim to resolve all concerns amicably. Before requesting a refund, we encourage you to contact us with any issues — in many cases, we can resolve problems by re-generating your report or addressing technical issues directly.
                            </p>
                        </div>

                        <div className="border-t border-[rgba(107,45,45,0.1)] pt-6">
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">8. Contact Us</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                For refund requests or any questions about this policy, please reach out to us:
                            </p>
                            <div className="bg-[rgba(201,162,39,0.05)] rounded-lg p-4 text-sm text-[var(--text-muted-dark)] space-y-1">
                                <p><strong className="text-maroon">Shiv Cosmic Energy Solutions</strong></p>
                                <p>📧 Email: info.shivcosmic@gmail.com</p>
                                <p>📞 Phone: +91 7030127129</p>
                                <p>📍 Address: Pune, Maharashtra, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-header py-6 px-4 text-center">
                <p className="text-[var(--text-muted-light)] text-xs">
                    © 2024-2026 Shiv Cosmic Energy Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default RefundPolicy;
