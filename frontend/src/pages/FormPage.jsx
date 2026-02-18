import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { useReport } from '../context/ReportContext';
import { generateFullReport } from '../utils/numerology';

const FormPage = () => {
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
            // Format DOB for API (DD/MM/YYYY -> DD-MM-YYYY)
            // (Note: The state is already formatted visually, but let's ensure it's what backend expects)
            const apiFormData = {
                ...formData,
                dob: formData.dob.replaceAll('/', '-'),
                coupon_code: isCouponApplied ? couponCode : ''
            };

            // CHECK: IF COUPON APPLIED override payment flow
            if (isCouponApplied) {
                const { generateReportWithCoupon } = await import('../services/api');
                // Verification happens on backend too, but we send the code
                const result = await generateReportWithCoupon(apiFormData);

                saveFormData(apiFormData);

                // Fire Analytics Event (Coupon)
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
                return; // EXIT FUNCTION
            }

            // 1. Create Order
            const { createOrder, verifyPayment } = await import('../services/api');
            // Pass apiFormData to log "PAYMENT_INITIATED"
            const orderData = await createOrder("INR", apiFormData);

            // 2. Initialize Razorpay
            const options = {
                key: orderData.key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Cosmic Numerology",
                description: "Personalized Numerology Report",
                image: "https://numerology.shivcosmic.com/images/logo.png", // Hardcoded secure URL to prevent Mixed Content/Localhost issues
                order_id: orderData.order_id,
                handler: async function (response) {
                    try {
                        // 3. Verify & Generate
                        const verifyData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            form_data: apiFormData
                        };

                        const result = await verifyPayment(verifyData);

                        // 4. Save & Navigate
                        saveFormData(apiFormData);

                        // Fire Analytics Event
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

                        // We can also save the report URL if ReportContext supports it, 
                        // or pass it via navigation state
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
                description="Enter your birth details to generate your comprehensive Vedic Numerology report. Secure payment and instant delivery."
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
                <div className="bg-header py-4 px-4">
                    <div className="container-main flex items-center justify-between">
                        <button
                            onClick={() => navigate('/numerology')}
                            className="flex items-center gap-2 text-[var(--color-cream)] hover:text-gold transition-colors text-sm"
                        >
                            <span>←</span> Back
                        </button>
                        <img src="/images/logo.png" alt="Shiv Cosmic" className="h-10 w-auto" />
                        <div className="w-16"></div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="py-6 px-4 md:py-16 md:px-4">
                    <div className="w-full md:max-w-lg mx-auto">
                        {/* Header */}
                        <div className="text-center py-6 px-4 md:mb-8 md:py-0">
                            <div className="sanskrit-accent mb-2 text-xs">॥ शुभ लाभ ॥</div>
                            <h1 className="heading-vedic text-xl md:text-4xl font-bold text-maroon mb-2">
                                Get Your Numerology Report
                            </h1>
                            <p className="text-[var(--text-muted-dark)] text-xs md:text-sm max-w-xs mx-auto leading-relaxed">
                                Enter your details to reveal your sacred numbers
                            </p>
                        </div>

                        {/* Form Card */}
                        <form
                            onSubmit={handleSubmit}
                            className="vedic-card-light form-card-mobile"
                        >
                            {/* Name */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-maroon">
                                    Full Name <span className="text-[var(--color-orange)]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your full name"
                                    className={`${inputClass} ${touched.name && errors.name ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : ''}`}
                                />
                                {touched.name && errors.name && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.name}</p>
                                )}
                            </div>

                            {/* DOB */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-maroon">
                                    Date of Birth <span className="text-[var(--color-orange)]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleDobChange}
                                    onBlur={handleBlur}
                                    placeholder="DD/MM/YYYY"
                                    className={`${inputClass} ${touched.dob && errors.dob ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : ''}`}
                                    maxLength={10}
                                />
                                {touched.dob && errors.dob && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.dob}</p>
                                )}
                            </div>

                            {/* Mobile */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-maroon">
                                    Mobile Number <span className="text-[var(--color-orange)]">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="10-digit number"
                                    className={`${inputClass} ${touched.mobile && errors.mobile ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : ''}`}
                                />
                                {touched.mobile && errors.mobile && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.mobile}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-maroon">
                                    Email Address <span className="text-[var(--color-orange)]">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="your@email.com"
                                    className={`${inputClass} ${touched.email && errors.email ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' : ''}`}
                                />
                                {touched.email && errors.email && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.email}</p>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="mb-5">
                                <label className={`block text-sm font-medium mb-3 ${touched.gender && errors.gender ? 'text-red-500' : 'text-maroon'}`}>
                                    Gender <span className="text-[var(--color-orange)]">*</span>
                                </label>
                                <div className={`flex gap-3 p-1 rounded-lg ${touched.gender && errors.gender ? 'bg-red-50 border border-red-200' : ''}`}>
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <label
                                            key={option}
                                            className={`flex-1 text-center py-3 rounded-lg cursor-pointer transition-all text-sm font-medium border ${formData.gender === option
                                                ? 'bg-[rgba(201,162,39,0.15)] border-[var(--color-gold)] text-[var(--color-gold-dark)]'
                                                : 'bg-white border-[rgba(107,45,45,0.15)] text-[var(--text-muted-dark)] hover:border-[rgba(107,45,45,0.3)]'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={formData.gender === option}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                {touched.gender && errors.gender && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠️ {errors.gender}</p>
                                )}
                            </div>

                            {/* Report Language */}
                            <div className="mb-7">
                                <label className="block text-sm font-medium mb-3 text-maroon">
                                    Report Language <span className="text-[var(--color-orange)]">*</span>
                                </label>
                                <div className="flex gap-3">
                                    {[
                                        { label: 'English', value: 'English' },
                                        { label: 'हिन्दी', value: 'Hindi' }
                                    ].map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex-1 text-center py-3 rounded-lg cursor-pointer transition-all text-sm font-medium border ${formData.language === option.value
                                                ? 'bg-[rgba(201,162,39,0.15)] border-[var(--color-gold)] text-[var(--color-gold-dark)]'
                                                : 'bg-white border-[rgba(107,45,45,0.15)] text-[var(--text-muted-dark)] hover:border-[rgba(107,45,45,0.3)]'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="language"
                                                value={option.value}
                                                checked={formData.language === option.value}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Coupon Code Section */}
                            <div className="mb-7">
                                <label className="block text-sm font-medium mb-2 text-maroon">
                                    Have a Coupon Code? (Optional)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="coupon"
                                        value={couponCode}
                                        onChange={(e) => {
                                            setCouponCode(e.target.value);
                                            setIsCouponApplied(false); // Reset on change
                                            setCouponError('');
                                        }}
                                        placeholder="Enter code"
                                        className={`${inputClass} py-3`}
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 rounded-lg bg-[var(--color-maroon)] text-[var(--color-cream)] font-medium text-sm hover:opacity-90 transition-opacity"
                                        disabled={isSubmitting || !couponCode.trim()}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {isCouponApplied && (
                                    <p className="text-green-600 text-xs mt-1.5 font-medium">
                                        ✅ Coupon applied! You will get this report for FREE.
                                    </p>
                                )}
                                {couponError && (
                                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                                        {couponError}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 heading-vedic tracking-wide"
                                style={{
                                    background: isFormValid
                                        ? 'linear-gradient(135deg, #c9a227 0%, #d4af37 50%, #c9a227 100%)'
                                        : 'rgba(201,162,39,0.3)',
                                    color: isFormValid ? '#2d1010' : '#5a3a3a',
                                    cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
                                    boxShadow: isFormValid ? '0 4px 15px rgba(201,162,39,0.3)' : 'none',
                                    border: '1px solid rgba(166,138,31,0.5)'
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span>Date fetching...</span>
                                    </>
                                ) : (
                                    <span>
                                        {isCouponApplied ? "Generate Free Report" : "Pay & Generate Report"}
                                    </span>
                                )}
                            </button>

                            <p className="text-center text-[var(--text-muted-dark)] text-xs mt-5">
                                🔒 Your data is private and secure
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormPage;
