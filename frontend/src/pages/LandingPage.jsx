import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import SkeletonImage from '../components/SkeletonImage';

const LandingPage = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [countersVisible, setCountersVisible] = useState(false);
    const [counts, setCounts] = useState({ reports: 0, users: 0, rating: 0, languages: 0 });
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const statsRef = useRef(null);

    // Scroll-to-top visibility
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        entry.target.style.opacity = '1';
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Stats counter animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !countersVisible) {
                    setCountersVisible(true);
                    const targets = { reports: 10000, users: 5000, rating: 48, languages: 3 };
                    const duration = 2000;
                    const steps = 60;
                    const interval = duration / steps;
                    let step = 0;
                    const timer = setInterval(() => {
                        step++;
                        const progress = step / steps;
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCounts({
                            reports: Math.round(targets.reports * eased),
                            users: Math.round(targets.users * eased),
                            rating: Math.round(targets.rating * eased),
                            languages: Math.round(targets.languages * eased)
                        });
                        if (step >= steps) clearInterval(timer);
                    }, interval);
                }
            },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, [countersVisible]);

    const testimonials = [
        {
            name: "Priya Sharma",
            location: "Mumbai",
            text: "The accuracy of my Professional Numerology report was truly astonishing! It revealed aspects of my personality and career path that I had always sensed but never understood. Highly recommended!",
            rating: 5
        },
        {
            name: "Rajesh Patel",
            location: "Ahmedabad",
            text: "I was skeptical at first, but the detailed analysis of my ruling numbers and their planetary influences completely changed my perspective. The report helped me make an important career decision.",
            rating: 5
        },
        {
            name: "Ananya Desai",
            location: "Pune",
            text: "What sets this apart from other numerology services is the depth of Vedic knowledge. My report covers everything — from karmic patterns to health insights. Worth every rupee!",
            rating: 5
        },
        {
            name: "Vikram Singh",
            location: "Delhi",
            text: "I got reports for my entire family. The personalized insights were incredibly detailed and relevant. The multi-language support is a great feature — my parents loved reading it in Hindi!",
            rating: 4
        }
    ];

    // Mobile testimonial carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const faqs = [
        {
            question: "What is Numerology?",
            answer: "Numerology is an ancient system that interprets the cosmic energy of numbers based on your birth date. It closely integrates with planetary influences to provide deep insights into your soul's purpose and destiny."
        },
        {
            question: "How is this different from Western Numerology?",
            answer: "While both systems analyze numbers, this system places greater emphasis on the 'Psychic' (Birthday) and 'Destiny' (Life Path) numbers and their relationship with the nine planets (Navagraha), offering a more karmic and spiritual perspective."
        },
        {
            question: "What information do I need to provide?",
            answer: "You only need your full date of birth, time of birth (optional but recommended for precision), and your full name as it appears on official documents."
        },
        {
            question: "Is my personal data secure?",
            answer: "Absolutely. We value your privacy. Your birth details are used solely for generating your chart and are never shared with third parties."
        },
        {
            question: "How long does it take to get my report?",
            answer: "Your comprehensive Professional Numerology report is generated instantly! Once you submit your details, the report is ready for download within seconds as a professionally formatted PDF."
        },
        {
            question: "In which languages is the report available?",
            answer: "We currently offer reports in English, Hindi (हिन्दी), and Marathi (मराठी). You can select your preferred language while filling in your details."
        },
        {
            question: "How accurate is Numerology?",
            answer: "Numerology has been practiced for thousands of years and is deeply rooted in the mathematical patterns of the universe. While results are based on ancient principles and planetary influences, the insights should be used as guidance rather than absolute predictions."
        },
        {
            question: "Can I generate reports for my family members?",
            answer: "Yes! You can generate individual reports for any family member or friend. Each report is unique and based on the specific birth details provided, so you can create as many reports as you need."
        }
    ];

    const features = [
        {
            title: "Life Path Analysis",
            description: "Discover your core purpose and the journey your soul has chosen for this lifetime.",
            icon: "🛤️"
        },
        {
            title: "Planetary Influences",
            description: "Understand how the ruling planets of your numbers shape your personality and destiny.",
            icon: "🪐"
        },
        {
            title: "Karmic Insights",
            description: "Reveal the karmic lessons and strengths you brought into this life.",
            icon: "🔮"
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Enter Details",
            description: "Provide your birth date and name."
        },
        {
            step: "02",
            title: "Analyze",
            description: "Our system calculates your unique chart."
        },
        {
            step: "03",
            title: "Reveal",
            description: "Receive your comprehensive Numerology report."
        }
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://shivcosmic.com/#organization",
                "name": "Shiv Cosmic Energy Solutions",
                "url": "https://shivcosmic.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://shivcosmic.com/images/logo.png"
                },
                "sameAs": [
                    "https://www.instagram.com/shivcosmic",
                    "https://www.facebook.com/shivcosmic"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9876543210", // Replace with actual if known, or generic
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": ["en", "hi", "mr"]
                }
            },
            {
                "@type": "Person",
                "@id": "https://shivcosmic.com/#person",
                "name": "Dr. Shivsharan Manshetti",
                "image": "https://shivcosmic.com/images/shivsharan.jpg", // Placeholder, user can update
                "jobTitle": "Vedic Numerologist & Vastu Expert",
                "description": "Renowned expert in Vedic Numerology and Vastu Shastra with over 15 years of experience.",
                "worksFor": { "@id": "https://shivcosmic.com/#organization" }
            },
            {
                "@type": "Product",
                "@id": "https://shivcosmic.com/#product",
                "name": "Professional Numerology Report",
                "description": "A comprehensive 25+ page personalized report analyzing your life path, destiny numbers, and karmic patterns based on ancient Vedic wisdom.",
                "image": "https://shivcosmic.com/images/Numerology_Banner.jpg",
                "brand": { "@id": "https://shivcosmic.com/#organization" },
                "offers": {
                    "@type": "Offer",
                    "price": "699",
                    "priceCurrency": "INR",
                    "priceValidUntil": "2026-12-31",
                    "availability": "https://schema.org/InStock",
                    "url": "https://shivcosmic.com/numerology-form"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "12540"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://shivcosmic.com/#website",
                "url": "https://shivcosmic.com",
                "name": "Shiv Cosmic Numerology",
                "publisher": { "@id": "https://shivcosmic.com/#organization" }
            },
            {
                "@type": "FAQPage",
                "@id": "https://shivcosmic.com/#faq",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }
        ]
    };

    return (
        <div className="min-h-screen bg-cream relative overflow-hidden">
            <SeoHead
                title="Professional Numerology Report | Discover Your Destiny"
                description="Unlock the secrets of your life path, career, and relationships with a personalized Professional Numerology report. Instant PDF download."
                keywords="Vedic Numerology, Life Path Number, Destiny Number, Astrology Report, Vastu Shastra, Online Numerology"
                canonicalUrl="/"
                schema={structuredData}
            />
            {/* Discount Banner */}
            <div className="bg-gradient-to-r from-[var(--color-maroon)] via-[rgba(201,162,39,0.9)] to-[var(--color-maroon)] text-white text-center py-2.5 px-4 text-xs md:text-sm font-medium relative overflow-hidden z-50">
                <div className="relative z-10">
                    🔥 <strong>Limited Time Offer:</strong> Get your complete Professional Numerology Report at <span className="line-through opacity-70">₹1,499</span> <strong className="text-white text-base ml-1">₹699</strong> — <span className="underline cursor-pointer" onClick={() => navigate('/numerology-form')}>Claim Now!</span>
                </div>
            </div>

            {/* Header */}
            <header className="bg-header py-4 px-4 shadow-md sticky top-0 z-40">
                <div className="container-main flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <img
                            src="/images/logo.png"
                            alt="Shiv Cosmic"
                            className="h-10 md:h-12 w-auto"
                        />
                        <nav className="hidden md:flex gap-6 text-[var(--color-cream)] text-sm font-medium">
                            <a href="#" className="hover:text-gold transition-colors">Home</a>
                            <a href="#features" className="hover:text-gold transition-colors">Features</a>
                            <a href="#how-it-works" className="hover:text-gold transition-colors">How It Works</a>
                            <a href="#faq" className="hover:text-gold transition-colors">FAQ</a>
                        </nav>
                    </div>
                    <button onClick={() => navigate('/numerology-form')} className="hidden md:block btn-gold text-xs py-2.5 px-5">
                        Get Report
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-hero py-12 md:py-20 px-4 relative overflow-hidden">
                {/* Mobile Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.6)] md:hidden pointer-events-none z-0"></div>

                <div className="container-main relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Left Content */}
                        <div className="relative z-10">
                            <div className="sanskrit-accent mb-4 text-xs md:text-sm tracking-wide text-[var(--color-gold)] opacity-90">॥ ॐ नमः शिवाय ॥</div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-cream)] mb-6 leading-tight font-heading drop-shadow-lg">
                                Reveal the
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe58f] via-[#d4af37] to-[#aa7c11] block mt-1 drop-shadow-md">
                                    Hidden Blueprint
                                </span>
                                of Your Life
                            </h1>

                            <p className="text-lg md:text-xl text-[var(--text-muted-light)] mb-8 max-w-xl leading-relaxed font-light opacity-90">
                                Stop guessing. Uncover the exact path you were meant to walk with a <strong className="text-gold font-medium tracking-wide">100+ page premium personalized reading</strong> detailing your career, relationships, and ultimate destiny.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">

                                <button onClick={() => navigate('/numerology-form')} className="btn-gold">

                                    🔥 Get Your Report Now

                                </button>

                                <button onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} className="btn-outline-gold hover:bg-[rgba(201,162,39,0.1)]">

                                    Learn More

                                </button>

                            </div>


                            {/* Click Here — desktop only, shown above stats */}
                            <div className="hidden md:flex items-center gap-4 mb-6 pointer-events-none select-none">
                                {/* Thin elegant upward arrow */}
                                <div className="flex flex-col items-center gap-1 animate-bounce">
                                    <svg width="18" height="48" viewBox="0 0 18 52" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        style={{ filter: 'drop-shadow(0 0 6px rgba(201,162,39,0.8))' }}>
                                        <line x1="9" y1="50" x2="9" y2="14" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M2 22 L9 6 L16 22" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        <circle cx="9" cy="50" r="2" fill="#d4af37" opacity="0.7" />
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span style={{
                                        fontFamily: "'Italianno', cursive",
                                        fontSize: '2.6rem',
                                        lineHeight: '1',
                                        color: '#e8c84a',
                                        textShadow: '0 0 16px rgba(212,175,55,0.7), 0 2px 4px rgba(0,0,0,0.3)'
                                    }}>
                                        Click Here
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-[var(--text-muted-light)]">
                                <span className="flex items-center gap-1">
                                    <span className="text-gold">★</span> 4.9/5 Average Rating
                                </span>
                                <span className="w-1 h-1 bg-[var(--text-muted-light)] rounded-full"></span>
                                <span>10,000+ Charts Generated</span>
                            </div>
                        </div>

                        {/* Right Image + Indicator */}
                        <div className="hidden md:flex flex-row items-center justify-end gap-4">
                            {/* Click Here indicator — in-flow, never overlaps banner */}
                            <div className="flex flex-col items-center gap-2 pointer-events-none select-none shrink-0">
                                {/* Calligraphic text */}
                                <span style={{
                                    fontFamily: "'Italianno', cursive",
                                    fontSize: 'clamp(1.8rem, 2vw, 2.6rem)',
                                    lineHeight: '1',
                                    color: '#e8c84a',
                                    textShadow: '0 0 16px rgba(212,175,55,0.7), 0 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    Click Here
                                </span>
                                {/* Thin horizontal arrow → pointing at banner */}
                                <div className="animate-bounce self-end">
                                    <svg width="44" height="16" viewBox="0 0 52 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        style={{ filter: 'drop-shadow(0 0 6px rgba(201,162,39,0.8))' }}>
                                        <circle cx="2" cy="9" r="2" fill="#d4af37" opacity="0.7" />
                                        <line x1="4" y1="9" x2="38" y2="9" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M30 2 L46 9 L30 16" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg>
                                </div>
                            </div>

                            {/* Banner image */}
                            <div
                                onClick={() => navigate('/numerology-form')}
                                className="relative z-10 rounded-2xl overflow-hidden border-4 border-[var(--color-gold)] shadow-[0_0_50px_rgba(201,162,39,0.3)] w-64 lg:w-80 h-[420px] lg:h-[500px] cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_70px_rgba(201,162,39,0.5)] transition-all duration-300 group shrink-0"
                            >
                                <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                <SkeletonImage
                                    src="/images/Numerology_Banner.jpg"
                                    alt="Vedic Mandala"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Report Cards — infinite right-to-left marquee */}
            <section className="bg-cream py-16 overflow-hidden">
                <div className="container-main mb-8">
                    <div className="text-center">
                        <h2 className="heading-vedic text-2xl md:text-3xl font-bold text-maroon mb-2">
                            What You'll Get In Your <span className="text-gold">Report 2026</span>
                        </h2>
                        <div className="divider-vedic"><span className="text-gold">❖</span></div>
                    </div>
                </div>

                <div className="relative w-full">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-[#f5f0e1] to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-[#f5f0e1] to-transparent pointer-events-none" />

                    <div className="flex gap-6 md:gap-8 w-max animate-marquee-cards">
                        {[
                            '/images/cards/Love-Relationship.png',
                            '/images/cards/Money-Career.png',
                            '/images/cards/Health.png',
                            '/images/cards/Talents.png',
                            '/images/cards/Potential-Challenges.png',
                            /* duplicate for seamless loop */
                            '/images/cards/Love-Relationship.png',
                            '/images/cards/Money-Career.png',
                            '/images/cards/Health.png',
                            '/images/cards/Talents.png',
                            '/images/cards/Potential-Challenges.png',
                        ].map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-72 md:w-[28rem] rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-[rgba(201,162,39,0.18)] shadow-[0_6px_24px_rgba(107,45,45,0.08)] hover:shadow-[0_12px_36px_rgba(201,162,39,0.18)] hover:-translate-y-2 transition-all duration-400 cursor-pointer" onClick={() => navigate('/numerology-form')}>
                                <img src={src} alt="Report chapter" className="w-full h-auto object-contain mix-blend-multiply" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* How It Works */}
            < section id="how-it-works" className="bg-section-dark py-20 px-4" >
                <div className="container-main">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <h2 className="heading-vedic text-3xl md:text-4xl font-bold text-[var(--color-cream)] mb-3">
                            How It <span className="text-gold">Works</span>
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                    </div>

                    {/* Step Cards with Connectors */}
                    <div className="relative grid md:grid-cols-3 gap-8 mb-12">
                        {/* Connecting line behind cards (desktop only) */}
                        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] z-0">
                            <div className="w-full h-full border-t-2 border-dashed border-[var(--color-gold)] opacity-30"></div>
                        </div>

                        {/* Connecting line (mobile only) */}
                        <div className="md:hidden absolute top-8 bottom-8 left-8 w-[2px] z-0">
                            <div className="w-full h-full border-l-2 border-dashed border-[var(--color-gold)] opacity-30"></div>
                        </div>

                        {[
                            { step: '01', title: 'Enter Details', description: 'Provide your birth date, name, and basic details for an accurate Vedic analysis.', icon: '📝' },
                            { step: '02', title: 'Analyze', description: 'Our system applies ancient Vedic numerology principles to calculate your unique cosmic chart.', icon: '🔮' },
                            { step: '03', title: 'Reveal', description: 'Receive your comprehensive Vedic report with detailed insights about your life path and destiny.', icon: '📜' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="relative z-10 group"
                            >
                                <div className="bg-white rounded-2xl p-8 border border-[rgba(107,45,45,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(201,162,39,0.18)] transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
                                    {/* Decorative corner ornament */}
                                    <div className="absolute top-3 right-3 text-[rgba(201,162,39,0.12)] text-2xl select-none pointer-events-none">❋</div>
                                    <div className="absolute bottom-3 left-3 text-[rgba(201,162,39,0.08)] text-xl select-none pointer-events-none rotate-180">❋</div>

                                    {/* Background step number watermark */}
                                    <div className="absolute -top-2 -right-1 text-[8rem] font-bold text-[rgba(201,162,39,0.05)] font-heading leading-none select-none pointer-events-none group-hover:text-[rgba(201,162,39,0.1)] transition-all duration-700">
                                        {item.step}
                                    </div>

                                    {/* Gold top accent bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-maroon)] via-[var(--color-gold)] to-[var(--color-maroon)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Step icon + number circle */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-maroon)] to-[rgba(107,45,45,0.85)] flex items-center justify-center text-gold font-bold font-heading text-lg shadow-[0_4px_15px_rgba(107,45,45,0.3)] group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(201,162,39,0.3)] transition-all duration-300">
                                            {item.step}
                                        </div>
                                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-maroon mb-3 font-heading group-hover:text-[var(--color-gold-dark)] transition-colors duration-300">{item.title}</h3>
                                    <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">{item.description}</p>

                                    {/* Bottom gold line */}
                                    <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-[var(--color-gold)] to-transparent group-hover:w-24 transition-all duration-700"></div>
                                </div>

                                {/* Arrow connector (between cards, desktop only) */}
                                {index < 2 && (
                                    <div className="hidden md:flex absolute -right-5 top-16 z-20 text-[var(--color-gold)] opacity-60">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <button onClick={() => navigate('/numerology-form')} className="btn-gold">
                            Get Your Report Now
                        </button>
                    </div>
                </div>
            </section >

            {/* How Does Numerology Work? */}
            < section className="bg-cream py-20 px-4 relative overflow-hidden" >
                {/* Floating background numbers — particle field */}
                < div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true" >
                    {
                        [
                            { n: '1', top: '8%', left: '4%', size: '5rem', op: 0.04, delay: '0s' },
                            { n: '9', top: '15%', left: '88%', size: '7rem', op: 0.05, delay: '1.2s' },
                            { n: '3', top: '70%', left: '6%', size: '6rem', op: 0.04, delay: '2.5s' },
                            { n: '7', top: '80%', left: '85%', size: '8rem', op: 0.05, delay: '0.8s' },
                            { n: '5', top: '45%', left: '1%', size: '4rem', op: 0.03, delay: '3.1s' },
                            { n: '2', top: '50%', left: '92%', size: '5rem', op: 0.04, delay: '1.8s' },
                            { n: '8', top: '25%', left: '50%', size: '9rem', op: 0.03, delay: '2.0s' },
                            { n: '4', top: '88%', left: '45%', size: '5rem', op: 0.04, delay: '0.4s' },
                            { n: '6', top: '5%', left: '60%', size: '4rem', op: 0.03, delay: '3.5s' },
                        ].map(({ n, top, left, size, op, delay }) => (
                            <span key={n + top} style={{
                                position: 'absolute', top, left,
                                fontSize: size, opacity: op,
                                color: '#d4af37',
                                fontFamily: "'Cinzel', serif",
                                fontWeight: 700,
                                animation: `float-num 8s ease-in-out infinite`,
                                animationDelay: delay,
                            }}>{n}</span>
                        ))
                    }
                </div >

                <div className="container-main relative z-10">
                    <div className="grid md:grid-cols-5 gap-12 items-start">

                        {/* Left Content - 3 cols */}
                        <div className="md:col-span-3">
                            <div className="sanskrit-accent mb-2 text-maroon">अंकशास्त्र</div>
                            <h2 className="heading-vedic text-3xl md:text-4xl font-bold text-maroon mb-3 leading-tight">
                                How does Numerology <span className="text-gold">Work?</span>
                            </h2>
                            <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--color-gold)] to-transparent mb-8"></div>

                            {/* 3 Step Cards */}
                            <div className="space-y-4 mb-8">
                                {[
                                    {
                                        step: '01',
                                        icon: '🔢',
                                        title: 'Calculate Your Numbers',
                                        badge: '✦ Road Map For Your Life',
                                        desc: 'Your ruling number is derived by adding the digits of your birth date. This sacred number serves as the foundation of your entire numerology chart.',
                                    },
                                    {
                                        step: '02',
                                        icon: '🌟',
                                        title: 'Reveal Your Karmic Path',
                                        badge: '✦ Karmic Pathway',
                                        desc: 'Numerology maps your relationships, career, health, and purpose using a mathematical formula rooted in Vedic wisdom — pinpointing your chosen mission.',
                                    },
                                    {
                                        step: '03',
                                        icon: '📜',
                                        title: 'Get Your Cosmic Report',
                                        badge: '✦ Vedic Principles',
                                        desc: 'Shiv Cosmic delivers a complete Vedic Numerology report — a universal language of numbers that reveals who you are and what the cosmos has planned for you.',
                                    },
                                ].map(({ step, icon, title, badge, desc }) => (
                                    <div key={step} className="flex gap-4 p-5 rounded-xl border border-[rgba(201,162,39,0.15)] bg-[rgba(201,162,39,0.04)] hover:bg-[rgba(201,162,39,0.08)] hover:border-[rgba(201,162,39,0.3)] transition-all duration-300 group">
                                        {/* Step number */}
                                        <div className="shrink-0 w-10 h-10 rounded-full border border-[rgba(201,162,39,0.4)] flex items-center justify-center text-gold text-xs font-bold" style={{ fontFamily: "'Cinzel',serif" }}>
                                            {step}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="text-base">{icon}</span>
                                                <h3 className="text-maroon font-semibold text-sm md:text-base">{title}</h3>
                                                {/* Pill badge */}
                                                <span className="text-[10px] px-2 py-0.5 rounded-full border border-[rgba(201,162,39,0.4)] text-gold opacity-80" style={{ fontFamily: "'Cinzel',serif", letterSpacing: '0.1em' }}>
                                                    {badge}
                                                </span>
                                            </div>
                                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>



                            <button onClick={() => navigate('/numerology-form')} className="btn-gold">
                                Get Your Numerology Report Now
                            </button>
                        </div>

                        {/* Right — Numerology Portrait Card (Option B) */}
                        <div className="hidden md:flex md:col-span-2 items-center justify-center py-4">
                            <div className="flex flex-col items-center gap-4 w-full max-w-[340px]">

                                {/* Header label */}
                                <p className="text-[#8B5E3C] text-[11px] tracking-[0.3em]" style={{ fontFamily: "'Cinzel',serif" }}>✦ YOUR NUMEROLOGY PORTRAIT ✦</p>

                                {/* Card */}
                                <div className="relative w-full rounded-2xl border border-[rgba(139,94,60,0.3)] bg-gradient-to-b from-[#fdf5e8] to-[#f5e4c4] shadow-[0_8px_40px_rgba(139,94,60,0.15),inset_0_0_30px_rgba(201,162,39,0.06)] overflow-hidden">

                                    {/* Top radiant glow */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-28 bg-[rgba(201,162,39,0.12)] blur-3xl rounded-full pointer-events-none"></div>

                                    {/* Slow-spin decorative orbit ring */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[rgba(139,94,60,0.12)] pointer-events-none" style={{ animation: 'spin-slower 40s linear infinite' }}></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-[rgba(139,94,60,0.08)] pointer-events-none" style={{ animation: 'spin-slower 25s linear infinite reverse' }}></div>

                                    <div className="relative z-10 px-8 pt-10 pb-8 flex flex-col items-center gap-5">

                                        {/* Life Path number with aura */}
                                        <div className="relative flex items-center justify-center">
                                            {/* Outer aura */}
                                            <div className="absolute w-44 h-44 rounded-full bg-[rgba(201,162,39,0.08)] blur-2xl"></div>
                                            {/* Outer ring */}
                                            <div className="absolute w-36 h-36 rounded-full border border-[rgba(139,94,60,0.2)]"></div>
                                            {/* Middle ring */}
                                            <div className="absolute w-28 h-28 rounded-full border border-[rgba(139,94,60,0.3)]"></div>
                                            {/* Inner ring */}
                                            <div className="absolute w-22 h-22 rounded-full border border-[rgba(139,94,60,0.4)]"></div>
                                            {/* Number circle */}
                                            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#a07830] border-2 border-[#8B5E3C] flex items-center justify-center shadow-[0_4px_20px_rgba(139,94,60,0.4),inset_0_0_12px_rgba(255,255,255,0.15)]">
                                                <span
                                                    className="text-5xl font-bold text-white animate-pulse-subtle"
                                                    style={{ fontFamily: "'Cinzel',serif", textShadow: '0 1px 4px rgba(80,40,10,0.5)' }}
                                                >7</span>
                                            </div>
                                        </div>

                                        {/* Label */}
                                        <div className="text-center">
                                            <p className="text-[10px] text-[#8B5E3C] tracking-[0.3em] uppercase opacity-70" style={{ fontFamily: "'Cinzel',serif" }}>Life Path Number</p>
                                            <p className="text-xl font-bold text-[#5C2D0A] mt-1" style={{ fontFamily: "'Cinzel',serif" }}>The Seeker</p>
                                            <p className="text-xs text-[#8B5E3C] italic mt-1 opacity-80">Introspective · Wise · Spiritual</p>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full flex items-center gap-3">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(139,94,60,0.4)]"></div>
                                            <span className="text-[#8B5E3C] text-xs">✦</span>
                                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(139,94,60,0.4)]"></div>
                                        </div>

                                        {/* Sub numbers */}
                                        <div className="grid grid-cols-3 gap-3 w-full">
                                            {[
                                                { label: 'Destiny', num: '3', sub: 'Creator' },
                                                { label: 'Expression', num: '8', sub: 'Achiever' },
                                                { label: 'Soul Urge', num: '9', sub: 'Idealist' },
                                            ].map(({ label, num, sub }) => (
                                                <div key={label} className="flex flex-col items-center py-3 px-2 rounded-xl bg-white/50 border border-[rgba(139,94,60,0.2)] hover:border-[rgba(139,94,60,0.45)] hover:bg-white/70 transition-all duration-300">
                                                    <span className="text-2xl font-bold text-[#5C2D0A]" style={{ fontFamily: "'Cinzel',serif" }}>{num}</span>
                                                    <span className="text-[10px] text-[#8B5E3C] font-semibold mt-1">{label}</span>
                                                    <span className="text-[9px] text-[#8B5E3C] italic opacity-70">{sub}</span>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>

                                {/* Sample disclaimer */}
                                <p className="text-[#8B5E3C] text-[10px] tracking-wider text-center italic opacity-60" style={{ fontFamily: "'Cinzel',serif" }}>
                                    Sample · Your numbers are unique to you
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section >


            {/* Stats Counter */}
            < section ref={statsRef} className="bg-section-dark py-12 md:py-14 px-4" >
                <div className="container-main">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-6 text-center">
                        <div className="scroll-animate" style={{ opacity: 0 }}>
                            <div className="text-3xl md:text-5xl font-bold text-gold font-heading mb-2">
                                {counts.reports.toLocaleString()}+
                            </div>
                            <p className="text-[var(--text-muted-light)] text-xs md:text-sm">Reports Generated</p>
                        </div>
                        <div className="scroll-animate" style={{ opacity: 0 }}>
                            <div className="text-3xl md:text-5xl font-bold text-gold font-heading mb-2">
                                {counts.users.toLocaleString()}+
                            </div>
                            <p className="text-[var(--text-muted-light)] text-xs md:text-sm">Happy Users</p>
                        </div>
                        <div className="scroll-animate" style={{ opacity: 0 }}>
                            <div className="text-3xl md:text-5xl font-bold text-gold font-heading mb-2">
                                {(counts.rating / 10).toFixed(1)}★
                            </div>
                            <p className="text-[var(--text-muted-light)] text-xs md:text-sm">Average Rating</p>
                        </div>
                        <div className="scroll-animate" style={{ opacity: 0 }}>
                            <div className="text-3xl md:text-5xl font-bold text-gold font-heading mb-2">
                                Multi
                            </div>
                            <p className="text-[var(--text-muted-light)] text-xs md:text-sm">Language Support</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Testimonials */}
            < section className="bg-cream py-20 px-4" >
                <div className="container-main">
                    <div className="text-center mb-14 scroll-animate" style={{ opacity: 0 }}>
                        <h2 className="heading-vedic text-3xl md:text-4xl font-bold text-maroon mb-3">
                            What Our <span className="text-gold">Users Say</span>
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                        <p className="text-[var(--text-muted-dark)] mt-4 max-w-lg mx-auto text-sm">
                            Thousands of satisfied users trust Shiv Cosmic for their numerology insights
                        </p>
                    </div>

                    <div className="relative w-full mt-4">
                        <div className="flex gap-4 md:gap-6 w-max animate-marquee-cards">
                            {[
                                '/images/whatsapp/w1.png',
                                '/images/whatsapp/w2.png',
                                '/images/whatsapp/w3.png',
                                '/images/whatsapp/w4.png',
                                '/images/whatsapp/w5.png',
                                '/images/whatsapp/w6.png',
                                '/images/whatsapp/w7.png',
                                /* duplicate for seamless loop */
                                '/images/whatsapp/w1.png',
                                '/images/whatsapp/w2.png',
                                '/images/whatsapp/w3.png',
                                '/images/whatsapp/w4.png',
                                '/images/whatsapp/w5.png',
                                '/images/whatsapp/w6.png',
                                '/images/whatsapp/w7.png',
                            ].map((src, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-64 md:w-80 scroll-animate bg-white rounded-2xl p-2 border border-[rgba(107,45,45,0.08)] shadow-sm hover:shadow-[0_12px_30px_rgba(201,162,39,0.15)] transition-all duration-500 hover:-translate-y-1 relative group"
                                >
                                    <img
                                        src={src}
                                        alt={`WhatsApp Testimonial ${index + 1}`}
                                        className="w-full h-auto rounded-xl object-contain mix-blend-multiply"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* Pricing Section */}
            < section id="pricing" className="bg-section-dark py-20 px-4" >
                <div className="container-main max-w-3xl">
                    <div className="text-center mb-14 scroll-animate" style={{ opacity: 0 }}>
                        <h2 className="heading-vedic text-3xl md:text-4xl font-bold text-[var(--color-cream)] mb-3">
                            Choose Your <span className="text-gold">Report</span>
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                    </div>

                    <div className="scroll-animate relative bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.02)] rounded-2xl p-8 md:p-10 border border-[rgba(201,162,39,0.25)] shadow-[0_0_40px_rgba(201,162,39,0.08)] overflow-hidden" style={{ opacity: 0 }}>
                        {/* Popular badge */}
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-[var(--color-gold)] to-[rgba(201,162,39,0.8)] text-[var(--color-maroon)] text-xs font-bold py-1.5 px-6 rounded-bl-xl">
                            MOST POPULAR
                        </div>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                            {/* Left - Price */}
                            <div className="text-center md:text-left flex-shrink-0">
                                <p className="text-[var(--text-muted-light)] text-sm mb-1">Complete Vedic Report</p>
                                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                                    <span className="text-[var(--text-muted-light)] line-through text-lg opacity-60">₹1,499</span>
                                    <span className="text-5xl md:text-6xl font-bold text-gold font-heading">₹699</span>
                                </div>
                                <p className="text-[rgba(201,162,39,0.7)] text-xs mt-2">53% OFF — Limited Time</p>

                                <button onClick={() => navigate('/numerology-form')} className="btn-gold mt-6 w-full md:w-auto">
                                    Get Your Report Now
                                </button>
                            </div>

                            {/* Right - Features */}
                            <div className="flex-1">
                                <p className="text-gold font-semibold text-sm mb-4 font-heading">WHAT'S INCLUDED:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        'Love and Relationship Compatibility',
                                        'Money and Career Guidance',
                                        'Health and Wellness Insights',
                                        'Potential and Challenges Analysis',
                                        'Innate Talents & Hidden Abilities',
                                        'Core Numbers (Life Path & Destiny)',
                                        'Personality & Expression Numbers',
                                        'Soul Urge & Subconscious Self',
                                        'Lo Shu Grid (Magical & Chinese)',
                                        'Your Future Forecast & Predictions'
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm">
                                            <span className="text-gold flex-shrink-0">✓</span>
                                            <span className="text-[var(--text-muted-light)]">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-[rgba(201,162,39,0.15)]">
                            <span className="text-[var(--text-muted-light)] text-xs flex items-center gap-1.5">🔒 Secure Payment</span>
                            <span className="text-[var(--text-muted-light)] text-xs flex items-center gap-1.5">⚡ Instant Delivery</span>
                            <span className="text-[var(--text-muted-light)] text-xs flex items-center gap-1.5">📄 PDF Download</span>
                            <span className="text-[var(--text-muted-light)] text-xs flex items-center gap-1.5">🌐 Multi-Language</span>
                        </div>
                    </div>
                </div>
            </section >

            {/* Report Contents Detail Section */}
            <section className="bg-cream py-20 px-4">
                <div className="container-main max-w-4xl">
                    <div className="text-center mb-14 scroll-animate" style={{ opacity: 0 }}>
                        <h2 className="heading-vedic text-3xl md:text-4xl font-bold text-maroon mb-3">
                            Comprehensive <span className="text-gold">Report Contents</span>
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                        <p className="text-[var(--text-muted-dark)] mt-4 max-w-2xl mx-auto text-sm">
                            A detailed breakdown of everything you will discover in your 100+ page personalized numerology reading.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Your Core Numbers", desc: "These are the main numbers that shape who you are. They come from your birth date and name." },
                            { title: "Life Path Number", desc: "This number shows your main purpose in life. It's based on your birth date." },
                            { title: "The Day You Were Born", desc: "Find out about your personality based on the day you were born." },
                            { title: "The Magical Lo Shu Grid", desc: "An old number system that shows balance and energy in your life." },
                            { title: "Your Chinese Lo Shu Grid", desc: "See how this Chinese number square applies to your personal numbers." },
                            { title: "Western phenomenon of Lo Shu Grid", desc: "Learn how Western numerology uses this Eastern concept." },
                            { title: "Love and Relationship", desc: "Learn how numbers affect your love life and how you connect with others." },
                            { title: "Potential and Challenges", desc: "Find out what you're good at and what might be hard for you, based on your numbers." },
                            { title: "Money and Career", desc: "See how your numbers are tied to work and money in your life." },
                            { title: "Your Health", desc: "Learn how your numbers might be linked to your body and mind." },
                            { title: "Your Talent", desc: "Learn about the innate skills and hidden abilities revealed by your numbers." },
                            { title: "Your Personality Number", desc: "Learn about how others see you based on your numbers." },
                            { title: "Your Expression Number", desc: "Discover your skills and talents through this number." },
                            { title: "Your Soul Urge Number", desc: "Find out what drives you deep down inside." },
                            { title: "Your Subconscious Self Number", desc: "See the hidden parts of yourself through this number." },
                            { title: "Your Challenge Number", desc: "Learn about the obstacles you might face in life." },
                            { title: "Your Destiny Number", desc: "Understand the big goals you're meant to reach." },
                            { title: "Your Future Forecast", desc: "Get a peek at what might be coming up for you, based on your numbers." }
                        ].map((item, i) => (
                            <div key={i} className="scroll-animate relative bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[rgba(201,162,39,0.2)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(201,162,39,0.25)] hover:-translate-y-3 hover:border-[rgba(201,162,39,0.8)] hover:bg-white/90 transition-all duration-500 overflow-hidden group cursor-pointer" style={{ opacity: 0 }}>
                                {/* Decorative top gradient edge */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[rgba(201,162,39,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Watermark Number */}
                                <div className="absolute -right-2 -bottom-4 text-[9rem] font-serif font-bold text-[rgba(201,162,39,0.06)] leading-none select-none pointer-events-none group-hover:text-[rgba(201,162,39,0.18)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 z-0 drop-shadow-sm group-hover:drop-shadow-md">
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-[var(--color-cream)] to-white flex items-center justify-center border border-[rgba(201,162,39,0.3)] shadow-[0_2px_10px_rgba(0,0,0,0.05)] group-hover:bg-[rgba(201,162,39,0.15)] group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all duration-500">
                                        <span className="text-gold text-xl drop-shadow-md">✧</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-maroon font-heading mb-3 group-hover:text-gold transition-colors duration-300 drop-shadow-sm">{item.title}</h3>
                                    <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed mt-auto relative z-10 font-medium group-hover:text-maroon transition-colors duration-300">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center scroll-animate" style={{ opacity: 0 }}>
                        <button onClick={() => navigate('/numerology-form')} className="btn-gold">
                            Unlock Your Full Report
                        </button>
                    </div>
                </div>
            </section>

            {/* Sample Report Preview */}
            < section className="bg-section-dark py-20 px-4" >
                <div className="container-main max-w-4xl">
                    <div className="text-center mb-14 scroll-animate" style={{ opacity: 0 }}>
                        <h2 className="heading-vedic text-3xl md:text-4xl font-bold text-[var(--color-cream)] mb-3">
                            Sample <span className="text-gold">Report Preview</span>
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                        <p className="text-[var(--text-muted-light)] mt-4 max-w-lg mx-auto text-sm">
                            Here's a glimpse of what your personalized Professional Numerology report looks like
                        </p>
                    </div>

                    <div className="scroll-animate relative" style={{ opacity: 0 }}>
                        <div className="bg-white rounded-2xl border border-[rgba(107,45,45,0.1)] shadow-xl overflow-hidden">
                            {/* Fake PDF Header */}
                            <div className="bg-gradient-to-r from-[var(--color-maroon)] to-[rgba(107,45,45,0.9)] px-8 py-6 text-center">
                                <p className="text-gold font-heading text-xs tracking-widest mb-1">SHIV COSMIC ENERGY SOLUTIONS</p>
                                <h3 className="heading-vedic text-xl font-bold text-[var(--color-cream)]">Professional Numerology Report</h3>
                                <p className="text-[var(--text-muted-light)] text-xs mt-1">Personalized for: ██████ ████████</p>
                            </div>

                            {/* Blurred content preview */}
                            <div className="p-8 relative">
                                <div className="space-y-6" style={{ filter: 'blur(1.5px)', userSelect: 'none' }}>
                                    <div>
                                        <h4 className="font-bold text-maroon mb-2">Your Core Numbers</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-[rgba(201,162,39,0.08)] rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-gold">7</p>
                                                <p className="text-xs text-[var(--text-muted-dark)]">Life Path</p>
                                            </div>
                                            <div className="bg-[rgba(201,162,39,0.08)] rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-gold">3</p>
                                                <p className="text-xs text-[var(--text-muted-dark)]">Destiny</p>
                                            </div>
                                            <div className="bg-[rgba(201,162,39,0.08)] rounded-lg p-4 text-center">
                                                <p className="text-2xl font-bold text-gold">5</p>
                                                <p className="text-xs text-[var(--text-muted-dark)]">Soul Urge</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-maroon mb-2">Personality Analysis</h4>
                                        <p className="text-sm text-[var(--text-muted-dark)]">You are a deeply intuitive individual with a strong connection to the spiritual realm. Your ruling planet Ketu blesses you with extraordinary wisdom and insight. Your life path suggests a journey of self-discovery and inner growth...</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-maroon mb-2">Career & Financial Outlook</h4>
                                        <p className="text-sm text-[var(--text-muted-dark)]">Your destiny number indicates excellence in fields requiring analytical thinking and creativity. The planetary alignment suggests favorable periods for financial growth in the coming year...</p>
                                    </div>
                                </div>

                                {/* Overlay CTA */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-[rgba(255,255,255,0.9)] to-transparent flex items-end justify-center pb-8">
                                    <div className="text-center">
                                        <p className="text-maroon font-semibold mb-3">🔒 Unlock Your Full Report</p>
                                        <button onClick={() => navigate('/numerology-form')} className="btn-gold">
                                            Get Your Report — ₹699
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* FAQs */}
            < section id="faq" className="bg-cream py-20 px-4" >
                <div className="container-main max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="heading-vedic text-3xl font-bold text-maroon mb-3">
                            Frequently Asked Questions
                        </h2>
                        <div className="divider-vedic">
                            <span className="text-gold">❖</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`rounded-xl overflow-hidden transition-all duration-500 border ${openFaq === index
                                    ? 'bg-[rgba(201,162,39,0.12)] border-[rgba(201,162,39,0.4)] shadow-[0_4px_20px_rgba(201,162,39,0.15)]'
                                    : 'bg-white/70 border-[rgba(201,162,39,0.15)] hover:bg-white hover:border-[rgba(201,162,39,0.3)]'
                                    }`}
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 md:p-5 text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-block w-1.5 h-1.5 rounded-full transition-all duration-500 ${openFaq === index ? 'bg-[var(--color-gold)] scale-150 shadow-[0_0_8px_rgba(201,162,39,0.5)]' : 'bg-[rgba(201,162,39,0.4)]'
                                            }`}></span>
                                        <span className={`heading-vedic text-sm font-medium transition-colors duration-300 ${openFaq === index ? 'text-gold' : 'text-maroon group-hover:text-gold'
                                            }`}>{faq.question}</span>
                                    </div>
                                    <span className={`text-gold text-xl font-light transition-all duration-500 flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-45 scale-125' : 'rotate-0 group-hover:rotate-90'
                                        }`}>
                                        +
                                    </span>
                                </button>
                                <div
                                    className="transition-all duration-500 ease-in-out"
                                    style={{
                                        maxHeight: openFaq === index ? '200px' : '0px',
                                        opacity: openFaq === index ? 1 : 0
                                    }}
                                >
                                    <div className="px-5 pb-5 pl-9">
                                        <div className="border-t border-[rgba(201,162,39,0.15)] pt-4">
                                            <p className="text-[var(--text-muted-dark)] text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="bg-section-dark py-16 px-4 text-center" >
                <div className="container-main">
                    <h2 className="heading-vedic text-2xl md:text-3xl font-bold text-[var(--color-cream)] mb-4">
                        Ready to Discover Your Numbers?
                    </h2>
                    <p className="text-[var(--text-muted-light)] mb-8 max-w-xl mx-auto">
                        Begin your journey into the ancient wisdom of Vedic Numerology today.
                    </p>
                    <button onClick={() => navigate('/numerology-form')} className="btn-gold">
                        Get Your Free Report
                    </button>
                </div>
            </section >



            {/* WhatsApp Floating Button */}
            < a
                href="https://wa.me/917030127129?text=Hi%2C%20I%27m%20interested%20in%20a%20Vedic%20Numerology%20Report"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-24 md:bottom-6 left-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] transition-all duration-300"
                title="Chat with us on WhatsApp"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="md:w-[28px] md:h-[28px]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a >

            {/* Mobile Fixed CTA Bar */}
            < div className="fixed bottom-0 md:bottom-6 left-0 right-0 md:left-auto md:right-6 z-50 p-3 md:p-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.6)] to-transparent md:bg-none" >
                {/* Pulse-ring wrapper */}
                < div className="relative rounded-xl md:rounded-lg" >
                    {/* Animated outer ring */}
                    < div className="absolute inset-0 rounded-xl md:rounded-lg animate-ping opacity-40" style={{ background: 'transparent', border: '2px solid #f0c940' }}></div >
                    <button
                        onClick={() => navigate('/numerology-form')}
                        className="relative w-full md:w-auto btn-gold text-sm py-4 md:py-3 rounded-xl md:rounded-lg font-bold tracking-wide"
                    >
                        🔥 Get Personal Report Now
                    </button>
                </div >
            </div >

            {/* Scroll to Top */}
            < button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-24 right-6 z-50 w-11 h-11 rounded-full bg-[var(--color-maroon)] text-gold flex items-center justify-center shadow-lg hover:bg-[rgba(107,45,45,0.9)] transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                title="Scroll to top"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button >
            {/* Mobile Spacer for Fixed Buttons */}
            < div className="h-24 md:h-0 w-full block md:hidden" ></div >
        </div >
    );
};

export default LandingPage;
