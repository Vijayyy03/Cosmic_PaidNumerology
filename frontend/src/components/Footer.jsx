import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-header py-12 px-4 border-t border-[rgba(201,162,39,0.1)]">
            <div className="container-main">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-12">
                    <div className="space-y-4">
                        <img
                            src="/images/logo.png"
                            alt="Shiv Cosmic"
                            className="h-12 w-auto"
                        />
                        <p className="text-[var(--text-muted-light)] text-xs leading-relaxed max-w-[240px]">
                            Empowering your life journey through Professional Numerology & Cosmic Wisdom.
                        </p>
                    </div>

                    <div>
                        <h4 className="heading-vedic text-gold font-bold mb-6 text-xs uppercase tracking-widest">Services</h4>
                        <div className="space-y-3 text-sm text-[var(--text-muted-light)]">
                            <a href="/numerology-form" className="block hover:text-gold transition-all duration-300">Numerology Report</a>
                            <Link to="/coming-soon?service=Kundli+Report" className="block hover:text-gold transition-all duration-300">Kundli Report</Link>
                            <Link to="/coming-soon?service=Astro+Mapping" className="block hover:text-gold transition-all duration-300">Astro Mapping</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="heading-vedic text-gold font-bold mb-6 text-xs uppercase tracking-widest">Contact</h4>
                        <div className="space-y-4 text-sm text-[var(--text-muted-light)]">
                            <a href="tel:+917030127129" className="flex items-center gap-3 hover:text-gold transition-all">
                                <Phone size={14} className="text-gold opacity-70" />
                                <span>+91 7030127129</span>
                            </a>
                            <a href="mailto:info.shivcosmic@gmail.com" className="flex items-center gap-3 hover:text-gold transition-all">
                                <Mail size={14} className="text-gold opacity-70" />
                                <span>info.shivcosmic@gmail.com</span>
                            </a>
                            <div className="flex items-start gap-3">
                                <MapPin size={14} className="mt-1 text-gold opacity-70" />
                                <span>Pune, Maharashtra</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="heading-vedic text-gold font-bold mb-6 text-xs uppercase tracking-widest">Legal</h4>
                        <div className="space-y-3 text-sm text-[var(--text-muted-light)]">
                            <Link to="/privacy-policy" className="block hover:text-gold transition-all duration-300">Privacy Policy</Link>
                            <Link to="/terms-conditions" className="block hover:text-gold transition-all duration-300">Terms & Conditions</Link>
                            <Link to="/refund-policy" className="block hover:text-gold transition-all duration-300">Refund Policy</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[rgba(201,162,39,0.1)] pt-8 text-center text-[10px]">
                    <div className="sanskrit-accent mb-4 text-xs opacity-50">॥ ॐ ॥</div>
                    <p className="text-[var(--text-muted-light)] opacity-70 mb-2">
                        © 2024-{new Date().getFullYear()} Shiv Cosmic Energy Solutions. All rights reserved.
                    </p>
                    <p className="max-w-2xl mx-auto text-[rgba(255,255,255,0.3)] leading-relaxed px-4">
                        Disclaimer: Numerology is a guidance tool intended for self-discovery and insight. It should not be used as an absolute prediction of future events or a substitute for professional legal, medical, or financial advice.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
