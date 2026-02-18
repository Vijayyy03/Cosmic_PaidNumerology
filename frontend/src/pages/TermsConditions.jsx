import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
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
                        Terms & <span className="text-gold">Conditions</span>
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
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">1. Acceptance of Terms</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                By accessing and using the Shiv Cosmic Numerology platform ("Service"), operated by Shiv Cosmic Energy Solutions ("we," "our," or "us"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">2. Description of Service</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Shiv Cosmic provides digital Vedic Numerology reports generated based on user-provided birth details. Our Service uses ancient Vedic numerology principles combined with modern technology to create personalized reports in multiple languages (English, Hindi, and Marathi). Reports are generated instantly as downloadable PDF documents.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">3. User Responsibilities</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                By using our Service, you agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li>Provide accurate and truthful personal information required for report generation.</li>
                                <li>Use the Service only for lawful purposes and in accordance with these Terms.</li>
                                <li>Not attempt to reverse-engineer, decompile, or disassemble any part of the Service.</li>
                                <li>Not use the Service to generate reports for commercial redistribution without prior written consent.</li>
                                <li>Be at least 18 years of age or have parental/guardian consent to use the Service.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">4. Intellectual Property Rights</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                All content on the Service, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Shiv Cosmic Energy Solutions or its content suppliers and is protected by Indian and international copyright, trademark, and other intellectual property laws. The generated numerology reports are provided for personal use only and may not be reproduced, distributed, or commercially exploited without our prior written consent.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">5. Disclaimer of Warranties</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                <strong className="text-maroon">Important:</strong> The numerology reports and insights provided through our Service are based on ancient Vedic principles and are intended for informational and entertainment purposes only.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li>Reports should not be considered as professional financial, medical, legal, or psychological advice.</li>
                                <li>We do not guarantee the accuracy, completeness, or applicability of the information provided in reports.</li>
                                <li>Users should exercise their own judgment and seek professional advice for important life decisions.</li>
                                <li>The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">6. Limitation of Liability</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                To the fullest extent permitted by applicable law, Shiv Cosmic Energy Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Service; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any decisions made based on the content of numerology reports.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">7. Payment Terms</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                For paid services:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
                                <li>Payment must be completed before the report is generated and delivered.</li>
                                <li>We accept payments through secure payment gateways. We do not store your payment card details.</li>
                                <li>A valid receipt or confirmation will be provided for every successful transaction.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">8. Account Termination</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                We reserve the right to suspend or terminate your access to the Service, without prior notice or liability, for any reason, including but not limited to a breach of these Terms. Upon termination, your right to use the Service will immediately cease.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">9. Governing Law</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">10. Indemnification</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                You agree to indemnify, defend, and hold harmless Shiv Cosmic Energy Solutions, its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from your use of the Service or your violation of these Terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">11. Severability</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole. Such provisions shall be deleted without affecting the remaining provisions herein.
                            </p>
                        </div>

                        <div className="border-t border-[rgba(107,45,45,0.1)] pt-6">
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">12. Contact Us</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsConditions;
