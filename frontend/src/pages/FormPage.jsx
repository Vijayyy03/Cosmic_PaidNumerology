import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ScrollText, Compass, Sparkles, Lock, ShieldCheck, Fingerprint } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { useReport } from '../context/ReportContext';
import { generateFullReport } from '../utils/numerology';

const FormPage = () => {
    // ... logic remains same ...
    const navigate = useNavigate();
    const { saveFormData, saveReport, setIsLoading } = useReport();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        mobile: '',
        email: '',
        gender: '',
        language: 'English'
    });

    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState('');

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Full name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters';
                return '';
            case 'dob':
                if (!value) return 'Date of birth is required';
                const parts = value.split('/');
                if (parts.length !== 3) return 'Use DD/MM/YYYY format';
                const [day, month, year] = parts.map(Number);
                if (isNaN(day) || isNaN(month) || isNaN(year)) return 'Invalid date format';
                if (day < 1 || day > 31) return 'Invalid day';
                if (month < 1 || month > 12) return 'Invalid month';
                if (year < 1900 || year > new Date().getFullYear()) return 'Invalid year';
                const date = new Date(year, month - 1, day);
                if (date.getDate() !== day) return 'Invalid date for this month';
                return '';
            case 'email':
                if (!value || !value.trim()) return 'Email address is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
                return '';
            case 'mobile':
                if (!value || !value.trim()) return 'Mobile number is required';
                if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'Enter a valid 10-digit number';
                return '';
            case 'gender':
                if (!value) return 'Please select your gender';
                return '';
            default:
                return '';
        }
    };

    const errors = useMemo(() => ({
        name: validateField('name', formData.name),
        dob: validateField('dob', formData.dob),
        email: validateField('email', formData.email),
        mobile: validateField('mobile', formData.mobile),
        gender: validateField('gender', formData.gender)
    }), [formData]);

    const isFormValid = useMemo(() => {
        return ['name', 'dob', 'email', 'mobile', 'gender'].every(field => !errors[field] && formData[field]);
    }, [errors, formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDobChange = (e) => {
        const digits = e.target.value.replace(/\D/g, '');
        let formatted = '';
        if (digits.length > 0) formatted = digits.substring(0, 2);
        if (digits.length > 2) formatted += '/' + digits.substring(2, 4);
        if (digits.length > 4) formatted += '/' + digits.substring(4, 8);
        setFormData(prev => ({ ...prev, dob: formatted }));
    };

    const handleBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase().trim() === 'vijay') {
            setIsCouponApplied(true);
            setCouponError('');
        } else {
            setCouponError('❌ Invalid coupon code');
            setIsCouponApplied(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, dob: true, email: true, mobile: true, gender: true });
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        setShowLoader(true);
        setIsLoading(true);

        try {
            const apiFormData = {
                ...formData,
                dob: formData.dob.replaceAll('/', '-'),
                coupon_code: isCouponApplied ? couponCode : ''
            };

            if (isCouponApplied) {
                const { generateReportWithCoupon } = await import('../services/api');
                const result = await generateReportWithCoupon(apiFormData);
                saveFormData(apiFormData);
                if (window.gtag) {
                    window.gtag('event', 'purchase', {
                        transaction_id: `COUPON_${couponCode}_${Date.now()}`,
                        value: 0,
                        currency: "INR",
                        coupon: couponCode,
                        items: [{
                            item_name: "Numerology Report",
                            item_category: "Consultation",
                            price: 0
                        }]
                    });
                }
                navigate('/numerology-report', { state: { pdfUrl: result.pdf_url.replace('http://', 'https://') } });
                return;
            }

            const { createOrder, verifyPayment } = await import('../services/api');
            const orderData = await createOrder("INR", apiFormData);

            const options = {
                key: orderData.key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Cosmic Numerology",
                description: "Personalized Numerology Report",
                image: "https://numerology.shivcosmic.com/images/logo.png",
                order_id: orderData.order_id,
                handler: async function (response) {
                    try {
                        const verifyData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            form_data: apiFormData
                        };
                        const result = await verifyPayment(verifyData);
                        saveFormData(apiFormData);
                        if (window.gtag) {
                            window.gtag('event', 'purchase', {
                                transaction_id: response.razorpay_payment_id,
                                value: 699.00,
                                currency: "INR",
                                items: [{
                                    item_name: "Numerology Report",
                                    item_category: "Consultation",
                                    price: 699.00
                                }]
                            });
                        }
                        navigate('/numerology-report', { state: { pdfUrl: result.pdf_url.replace('http://', 'https://') } });
                    } catch (err) {
                        console.error("Verification Failed", err);
                        alert("Payment successful but report generation failed. Please contact support.");
                        setShowLoader(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.mobile
                },
                theme: {
                    color: "#c9a227"
                },
                modal: {
                    ondismiss: function () {
                        setIsSubmitting(false);
                        setShowLoader(false);
                        setIsLoading(false);
                    }
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error('Error initiating payment/generation:', error);
            const msg = error.response?.data?.detail || error.message || "Failed to process request";
            alert(`Error: ${msg}`);
            setShowLoader(false);
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3.5 rounded-lg bg-white border border-[rgba(107,45,45,0.2)] text-[var(--text-dark)] placeholder-[var(--text-muted-dark)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.15)] transition-all";

    return (
        <>
            <SeoHead
                title="Get Your Numerology Report | Shiv Cosmic"
                description="Enter your birth details to generate your comprehensive Professional Numerology report. Secure payment and instant delivery."
                canonicalUrl="/numerology-form"
            />
            {showLoader && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,15,26,0.95)] backdrop-blur-sm text-white">
                    <div className="text-center max-w-sm px-6">
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-2 border-4 border-[rgba(201,162,39,0.3)] border-b-[var(--color-gold)] rounded-full animate-spin-reverse"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">✨</div>
                        </div>
                        <h3 className="heading-vedic text-xl md:text-2xl text-[var(--color-gold)] mb-2 animate-fade-in">
                            Aligning Cosmic Vibrations...
                        </h3>
                        <p className="text-[var(--text-muted-light)] text-sm animate-pulse">
                            Please wait while we calculate your destiny numbers.
                        </p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-texture-paper relative overflow-hidden">
                {/* Header Bar */}
                <div className="bg-header py-4 px-4 sticky top-0 z-40 backdrop-blur-md">
                    <div className="container-main flex items-center justify-between">
                        <button
                            onClick={() => navigate('/numerology')}
                            className="flex items-center gap-2 text-[var(--color-cream)] hover:text-gold transition-colors text-sm font-medium"
                        >
                            <span>←</span> Back
                        </button>
                        <img src="/images/logo.png" alt="Shiv Cosmic" className="h-10 w-auto" />
                        <div className="w-16"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-8 px-4 md:py-20">
                    <div className="container-main">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                            {/* Left: Value Reinforcement */}
                            <div className="hidden lg:block space-y-10 pt-4">
                                <div className="space-y-4">
                                    <div className="text-gold text-sm tracking-[0.3em] uppercase font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>✦ The Ultimate Guide ✦</div>
                                    <h1 className="heading-vedic text-4xl xl:text-5xl font-bold text-maroon leading-tight">
                                        Your Journey of Self-Discovery Starts Here
                                    </h1>
                                    <p className="text-[var(--text-muted-dark)] text-lg leading-relaxed max-w-xl">
                                        Join over 15,000+ souls who have found clarity and purpose through our comprehensive Professional Numerology reports.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-8">
                                    {[
                                        {
                                            icon: <User className="w-6 h-6" />,
                                            title: "Professional Portrait",
                                            desc: "A complete breakdown of your Life Path, Destiny, and Soul Urge numbers."
                                        },
                                        {
                                            icon: <ScrollText className="w-6 h-6" />,
                                            title: "97 Pages of Core Insight",
                                            desc: "Extensive analysis of your personality, strengths, and hidden potential."
                                        },
                                        {
                                            icon: <Compass className="w-6 h-6" />,
                                            title: "1-Year Monthly Roadmap",
                                            desc: "In-depth monthly guidance for Career, Wealth, Health, and Relationships."
                                        },
                                        {
                                            icon: <Sparkles className="w-6 h-6" />,
                                            title: "Lucky Essentials",
                                            desc: "Discover your personalized lucky colors, gems, and auspicious dates."
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="w-12 h-12 rounded-full bg-[rgba(201,162,39,0.1)] border border-[rgba(201,162,39,0.2)] flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-maroon transition-all duration-300">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-maroon text-lg mb-1" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h4>
                                                <p className="text-[var(--text-muted-dark)] text-base">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-[rgba(107,45,45,0.1)]">
                                    <p className="text-maroon/60 text-sm italic">
                                        "This report completely changed how I view my professional path. The accuracy is startling." — Preeti S.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Form Section */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0">
                                {/* Mobile Header only */}
                                <div className="lg:hidden text-center mb-10">
                                    <div className="sanskrit-accent mb-2 text-xs">॥ शुभ लाभ ॥</div>
                                    <h2 className="heading-vedic text-3xl font-bold text-maroon mb-2">
                                        Get Your Report
                                    </h2>
                                    <p className="text-[var(--text-muted-dark)] text-sm">
                                        Enter your details to reveal your sacred roadmap
                                    </p>
                                </div>

                                {/* Form Card */}
                                <div className="relative">
                                    {/* Background ambient glow */}
                                    <div className="absolute -inset-4 bg-[rgba(201,162,39,0.05)] blur-2xl rounded-[2rem] pointer-events-none"></div>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="relative vedic-card-light p-6 md:p-8 rounded-2xl shadow-xl border border-[rgba(201,162,39,0.2)]"
                                    >
                                        <div className="hidden lg:block mb-8 pb-4 border-b border-[rgba(107,45,45,0.05)]">
                                            <div className="sanskrit-accent mb-1 text-[10px]">॥ शुभ लाभ ॥</div>
                                            <h3 className="heading-vedic text-2xl text-maroon font-bold">Registration Details</h3>
                                        </div>

                                        <div className="space-y-5">
                                            {/* Name */}
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-maroon">
                                                    Full Name <span className="text-[var(--color-orange)]">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Enter your full messenger name"
                                                    className={`${inputClass} ${touched.name && errors.name ? 'border-red-500 bg-red-50 focus:border-red-500' : ''}`}
                                                />
                                                {touched.name && errors.name && (
                                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.name}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {/* DOB */}
                                                <div>
                                                    <label className="block text-sm font-semibold mb-2 text-maroon">
                                                        Date of Birth <span className="text-[var(--color-orange)]">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={handleDobChange}
                                                        onBlur={handleBlur}
                                                        placeholder="DD/MM/YYYY"
                                                        className={`${inputClass} ${touched.dob && errors.dob ? 'border-red-500 bg-red-50 focus:border-red-500' : ''}`}
                                                        maxLength={10}
                                                    />
                                                    {touched.dob && errors.dob && (
                                                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.dob}</p>
                                                    )}
                                                </div>

                                                {/* Mobile */}
                                                <div>
                                                    <label className="block text-sm font-semibold mb-2 text-maroon">
                                                        Mobile Number <span className="text-[var(--color-orange)]">*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="mobile"
                                                        value={formData.mobile}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="10-digit number"
                                                        maxLength={10}
                                                        className={`${inputClass} ${(touched.mobile || formData.mobile.length > 10) && errors.mobile ? 'border-red-500 bg-red-50 focus:border-red-500' : ''}`}
                                                    />
                                                    {(touched.mobile || formData.mobile.length > 10) && errors.mobile && (
                                                        <p className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 font-medium">⚠️ {errors.mobile}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-maroon">
                                                    Email Address <span className="text-[var(--color-orange)]">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="your@email.com"
                                                    className={`${inputClass} ${touched.email && errors.email ? 'border-red-500 bg-red-50 focus:border-red-500' : ''}`}
                                                />
                                                {touched.email && errors.email && (
                                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.email}</p>
                                                )}
                                            </div>

                                            {/* Gender */}
                                            <div>
                                                <label className="block text-sm font-semibold mb-3 text-maroon">
                                                    Gender <span className="text-[var(--color-orange)]">*</span>
                                                </label>
                                                <div className="flex gap-2">
                                                    {['Male', 'Female', 'Other'].map((option) => (
                                                        <label
                                                            key={option}
                                                            className={`flex-1 text-center py-3 rounded-lg cursor-pointer transition-all text-sm font-medium border ${formData.gender === option
                                                                ? 'bg-[rgba(201,162,39,0.15)] border-[var(--color-gold)] text-[var(--color-gold-dark)]'
                                                                : 'bg-white border-[rgba(107,45,45,0.15)] text-[var(--text-muted-dark)] hover:border-[rgba(107,45,45,0.3)]'
                                                                }`}
                                                        >
                                                            <input type="radio" name="gender" value={option} checked={formData.gender === option} onChange={handleChange} className="sr-only" />
                                                            {option}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Language & Coupon (compact) */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-semibold mb-3 text-maroon">Language</label>
                                                    <div className="flex gap-2">
                                                        {[{ l: 'English', v: 'English' }, { l: 'हिन्दी', v: 'Hindi' }].map((option) => (
                                                            <label key={option.v} className={`flex-1 text-center py-3 rounded-lg cursor-pointer transition-all text-sm font-medium border ${formData.language === option.v ? 'bg-[rgba(201,162,39,0.15)] border-gold text-gold-dark' : 'bg-white border-maroon/15 text-muted-dark hover:border-maroon/30'}`}>
                                                                <input type="radio" name="language" value={option.v} checked={formData.language === option.v} onChange={handleChange} className="sr-only" />
                                                                {option.l}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold mb-3 text-maroon">Coupon?</label>
                                                    <div className="flex gap-2">
                                                        <input type="text" value={couponCode} onChange={(e) => { setCouponCode(e.target.value); setIsCouponApplied(false); setCouponError(''); }} placeholder="Code" className={`${inputClass} flex-1 !py-[11px]`} disabled={isSubmitting} />
                                                        <button
                                                            type="button"
                                                            onClick={handleApplyCoupon}
                                                            className="whitespace-nowrap px-6 py-2 rounded-lg font-bold text-xs transition-all shadow-sm active:scale-95 disabled:opacity-40"
                                                            style={{
                                                                backgroundColor: !couponCode.trim() || isSubmitting ? 'rgba(107, 45, 45, 0.1)' : '#6b2d2d',
                                                                color: !couponCode.trim() || isSubmitting ? '#6b2d2d' : '#ffffff',
                                                                cursor: !couponCode.trim() || isSubmitting ? 'not-allowed' : 'pointer',
                                                                border: '1px solid #6b2d2d'
                                                            }}
                                                            disabled={isSubmitting || !couponCode.trim()}
                                                        >
                                                            Apply Code
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {isCouponApplied && <p className="text-green-600 text-[10px] font-bold">✅ Coupon applied! Report is FREE.</p>}
                                            {couponError && <p className="text-red-500 text-[10px] font-medium">{couponError}</p>}

                                            {/* Submit */}
                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={!isFormValid || isSubmitting}
                                                    className="w-full py-5 rounded-xl font-bold transition-all flex flex-col items-center justify-center gap-0.5 heading-vedic tracking-wide shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
                                                    style={{
                                                        background: isFormValid ? 'linear-gradient(135deg, #c9a227 0%, #d4af37 50%, #b88e1e 100%)' : 'rgba(201,162,39,0.2)',
                                                        color: isFormValid ? '#2d1010' : '#8a6a6a',
                                                        cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
                                                        opacity: isFormValid ? 1 : 0.6
                                                    }}
                                                >
                                                    <span className="text-lg">
                                                        {isSubmitting ? "Generating..." : isCouponApplied ? "Get Free Report" : "Get My Report Now"}
                                                    </span>
                                                    {!isCouponApplied && <span className="text-[10px] opacity-70 font-sans tracking-normal">🔒 Secure Checkout · ₹699 only</span>}
                                                </button>
                                            </div>

                                            {/* Trust Signals */}
                                            <div className="pt-6 grid grid-cols-3 gap-2">
                                                <div className="flex flex-col items-center text-center space-y-1">
                                                    <Lock className="w-4 h-4 text-maroon opacity-40" />
                                                    <span className="text-[9px] text-maroon/60 font-medium uppercase tracking-tighter">Secure<br />Payment</span>
                                                </div>
                                                <div className="flex flex-col items-center text-center space-y-1">
                                                    <ShieldCheck className="w-4 h-4 text-maroon opacity-40" />
                                                    <span className="text-[9px] text-maroon/60 font-medium uppercase tracking-tighter">Satisfaction<br />Guarantee</span>
                                                </div>
                                                <div className="flex flex-col items-center text-center space-y-1">
                                                    <Fingerprint className="w-4 h-4 text-maroon opacity-40" />
                                                    <span className="text-[9px] text-maroon/60 font-medium uppercase tracking-tighter">Privacy<br />Protected</span>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormPage;
