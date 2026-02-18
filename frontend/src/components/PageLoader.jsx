const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-cream)]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-[var(--color-gold-light)] border-t-[var(--color-gold)] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl">✨</span>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
