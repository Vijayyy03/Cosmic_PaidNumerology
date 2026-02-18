import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[rgba(107,45,45,0.1)] shadow-xl relative overflow-hidden">
                {/* Decorative background logo */}
                <img
                    src="/images/logo.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 opacity-5 pointer-events-none"
                />

                <div className="relative z-10">
                    <h1 className="text-8xl font-heading font-bold text-[rgba(201,162,39,0.2)] mb-2">404</h1>
                    <h2 className="heading-vedic text-2xl font-bold text-maroon mb-4">Page Not Found</h2>

                    <div className="w-16 h-0.5 bg-gold mx-auto mb-6"></div>

                    <p className="text-[var(--text-muted-dark)] mb-8 text-sm leading-relaxed">
                        The cosmic path you're looking for seems to be misaligned.
                        Let's guide you back to your destiny.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="btn-gold w-full flex items-center justify-center gap-2"
                    >
                        <span>Return Home</span>
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center opacity-60">
                <div className="sanskrit-accent text-maroon text-lg mb-1">॥ ॐ ॥</div>
                <p className="text-xs text-[var(--text-muted-dark)]">Shiv Cosmic Energy Solutions</p>
            </div>
        </div>
    );
};

export default NotFound;
