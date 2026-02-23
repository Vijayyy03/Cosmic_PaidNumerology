import { useNavigate, useSearchParams } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

const ComingSoon = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const service = searchParams.get('service') || 'This Service';

    return (
        <>
            <SeoHead
                title={`${service} — Coming Soon | Shiv Cosmic`}
                description={`${service} is coming soon to Shiv Cosmic Energy Solutions. Stay tuned.`}
                canonicalUrl="/coming-soon"
            />

            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1010 50%, #1a0a0a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
            }}>

                {/* Glow blobs */}
                <div style={{
                    position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: '15%', right: '10%',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(107,45,45,0.25) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '560px', width: '100%' }}>

                    {/* Om symbol */}
                    <div style={{ fontSize: '3rem', color: '#c9a227', marginBottom: '1.5rem' }}>॥ ॐ ॥</div>

                    {/* Coming Soon badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.4)',
                        color: '#c9a227', fontSize: '0.7rem', fontWeight: 700,
                        padding: '0.4rem 1.2rem', borderRadius: '999px', marginBottom: '1.5rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>
                        ✨ Coming Soon
                    </div>

                    {/* Service title */}
                    <h1 style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                        color: '#f5f0e8',
                        marginBottom: '1rem',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textShadow: '0 2px 20px rgba(201,162,39,0.2)',
                    }}>
                        {service}
                    </h1>

                    {/* Gold divider */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
                        <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, #c9a227)' }} />
                        <span style={{ color: '#c9a227', fontSize: '1.1rem' }}>❖</span>
                        <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, #c9a227)' }} />
                    </div>

                    {/* Description */}
                    <p style={{ color: '#c8b8a2', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        We are crafting something extraordinary for you.<br />
                        This service is currently under development and will be available very soon.
                    </p>

                    {/* Notify box */}
                    <div style={{
                        background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.25)',
                        borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '2rem',
                    }}>
                        <p style={{ color: '#b8a882', fontSize: '0.875rem', margin: 0 }}>
                            📩 Want to be notified when it launches? Contact us at{' '}
                            <a href="mailto:info.shivcosmic@gmail.com"
                                style={{ color: '#c9a227', textDecoration: 'underline' }}>
                                info.shivcosmic@gmail.com
                            </a>
                        </p>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate(-1)}
                            style={{
                                padding: '0.75rem 1.5rem', borderRadius: '8px',
                                border: '1px solid rgba(201,162,39,0.5)', background: 'transparent',
                                color: '#c9a227', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => e.target.style.background = 'rgba(201,162,39,0.1)'}
                            onMouseLeave={e => e.target.style.background = 'transparent'}
                        >
                            ← Go Back
                        </button>
                        <button
                            onClick={() => navigate('/numerology')}
                            style={{
                                padding: '0.75rem 1.75rem', borderRadius: '8px',
                                background: 'linear-gradient(135deg, #c9a227, #a07d1a)',
                                color: '#1a0a0a', cursor: 'pointer', fontSize: '0.875rem',
                                fontWeight: 700, border: 'none', letterSpacing: '0.05em',
                                textTransform: 'uppercase', transition: 'opacity 0.2s',
                            }}
                            onMouseEnter={e => e.target.style.opacity = '0.9'}
                            onMouseLeave={e => e.target.style.opacity = '1'}
                        >
                            Explore Numerology Report
                        </button>
                    </div>

                    {/* Footer */}
                    <p style={{ color: '#6b5a3a', fontSize: '0.75rem', marginTop: '3rem', opacity: 0.7 }}>
                        Shiv Cosmic Energy Solutions • www.shivcosmic.com
                    </p>
                </div>
            </div>
        </>
    );
};

export default ComingSoon;
