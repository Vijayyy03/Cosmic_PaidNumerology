const Footer = () => {
    return (
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
                            <a href="/numerology-form" className="block hover:text-gold transition-colors cursor-pointer">Numerology Report</a>
                            <a onClick={() => alert('Kundli Report coming soon!')} className="block hover:text-gold transition-colors cursor-pointer">Kundli Report</a>
                            <a onClick={() => alert('Astro Mapping coming soon!')} className="block hover:text-gold transition-colors cursor-pointer">Astro Mapping</a>
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
                            <a href="/privacy-policy" className="block hover:text-gold transition-colors cursor-pointer">Privacy Policy</a>
                            <a href="/terms-conditions" className="block hover:text-gold transition-colors cursor-pointer">Terms & Conditions</a>
                            <a href="/refund-policy" className="block hover:text-gold transition-colors cursor-pointer">Refund Policy</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[rgba(201,162,39,0.2)] pt-6 text-center">
                    <div className="sanskrit-accent mb-2">॥ ॐ ॥</div>
                    <p className="text-[var(--text-muted-light)] text-xs">
                        © 2024-{new Date().getFullYear()} Shiv Cosmic Energy Solutions. All rights reserved.
                    </p>
                    <div className="mt-4 text-text-dim text-xs opacity-60">
                        <p>Disclaimer: Numerology is a guidance tool and should be used as insight, not absolute prediction.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
