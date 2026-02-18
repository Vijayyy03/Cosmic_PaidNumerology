import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
                        Privacy <span className="text-gold">Policy</span>
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
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">1. Introduction</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Shiv Cosmic Energy Solutions ("we," "our," or "us") operates the Shiv Cosmic Numerology platform (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">2. Information We Collect</h2>
                            <h3 className="font-semibold text-maroon mb-2 text-sm">Personal Information</h3>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                We may collect personally identifiable information that you voluntarily provide when using our Service, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li>Full name</li>
                                <li>Date of birth</li>
                                <li>Email address</li>
                                <li>Mobile phone number</li>
                                <li>Gender</li>
                                <li>Language preference</li>
                            </ul>

                            <h3 className="font-semibold text-maroon mb-2 mt-4 text-sm">Automatically Collected Information</h3>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                When you access our Service, we may automatically collect certain information about your device, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed. We may also use cookies and similar tracking technologies to collect information about your browsing activities.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">3. How We Use Your Information</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li><strong>Report Generation:</strong> Your birth date and name are used to calculate and generate your personalized Vedic Numerology report.</li>
                                <li><strong>Communication:</strong> Your email and phone number may be used to deliver your report and send service-related notifications.</li>
                                <li><strong>Service Improvement:</strong> Aggregated, anonymized data helps us improve our platform and user experience.</li>
                                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">4. Data Sharing and Disclosure</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li><strong>Service Providers:</strong> We use third-party APIs (such as AstrologyAPI) to generate reports. Only necessary data (name, date of birth, gender) is shared with these providers for report generation.</li>
                                <li><strong>Legal Requirements:</strong> If required by law, court order, or governmental regulation.</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">5. Data Security</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">6. Data Retention</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Your report data is processed in real-time and is not permanently stored on our servers beyond the generation session.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">7. Your Rights</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                Depending on your location, you may have the following rights regarding your personal data:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted-dark)] text-sm">
                                <li>Right to access the personal information we hold about you.</li>
                                <li>Right to request correction of inaccurate personal information.</li>
                                <li>Right to request deletion of your personal information.</li>
                                <li>Right to withdraw consent at any time.</li>
                                <li>Right to lodge a complaint with a data protection authority.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">8. Cookies</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Our Service may use cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some features of our Service.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">9. Third-Party Links</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Our Service may contain links to third-party websites. We are not responsible for the privacy practices or the content of these third-party sites. We encourage you to review the privacy policy of every site you visit.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">10. Children's Privacy</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us to have it removed.
                            </p>
                        </div>

                        <div>
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">11. Changes to This Policy</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </div>

                        <div className="border-t border-[rgba(107,45,45,0.1)] pt-6">
                            <h2 className="heading-vedic text-xl font-bold text-maroon mb-4">12. Contact Us</h2>
                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mb-3">
                                If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;
