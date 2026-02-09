const Footer = () => {
    return (
        <footer className="py-12 bg-cosmic-surface border-t border-white/5">
            <div className="container-custom">
                {/* Trust Elements */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="flex gap-4 p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                        <svg className="w-5 h-5 text-cosmic-indigo flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <p className="text-sm text-text-muted">
                            <strong className="text-text-primary">Disclaimer:</strong> Numerology is a guidance tool and should be used as insight, not absolute prediction.
                        </p>
                    </div>
                    <div className="flex gap-4 p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                        <svg className="w-5 h-5 text-cosmic-indigo flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <p className="text-sm text-text-muted">
                            <strong className="text-text-primary">Privacy:</strong> Your personal data is encrypted and never shared with third parties.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-6 border-t border-white/5">
                    <p className="text-text-dim text-sm">
                        © {new Date().getFullYear()} Numerology Report. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
