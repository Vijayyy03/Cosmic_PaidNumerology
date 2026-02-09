import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { generateFullReport } from '../utils/numerology';
import CosmicLoader from '../components/CosmicLoader';

const FormPage = () => {
    const navigate = useNavigate();
    const { saveFormData, saveReport, setIsLoading } = useReport();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        mobile: '',
        email: '',
        gender: ''
    });

    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

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
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
                return '';
            case 'mobile':
                if (value && !/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'Enter a valid 10-digit number';
                return '';
            default:
                return '';
        }
    };

    const errors = useMemo(() => ({
        name: validateField('name', formData.name),
        dob: validateField('dob', formData.dob),
        email: validateField('email', formData.email),
        mobile: validateField('mobile', formData.mobile)
    }), [formData]);

    const isFormValid = useMemo(() => {
        return ['name', 'dob'].every(field => !errors[field] && formData[field]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, dob: true });
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        setShowLoader(true);
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2500));
            const report = generateFullReport(formData.name, formData.dob);
            saveFormData(formData);
            saveReport(report);
            navigate('/numerology-report');
        } catch (error) {
            console.error('Error generating report:', error);
            setShowLoader(false);
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3.5 rounded-lg bg-white border border-[rgba(107,45,45,0.2)] text-[var(--text-dark)] placeholder-[var(--text-muted-dark)] focus:outline-none focus:border-[var(--color-gold)] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.15)] transition-all";

    return (
        <>
            <AnimatePresence>
                {showLoader && <CosmicLoader message="Calculating your cosmic numbers..." />}
            </AnimatePresence>

            <div className="min-h-screen bg-section-light">
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
                <div className="py-12 px-4">
                    <motion.div
                        className="max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="sanskrit-accent mb-3">॥ शुभ लाभ ॥</div>
                            <h1 className="heading-vedic text-2xl md:text-3xl font-bold text-maroon mb-2">
                                Get Your Numerology Report
                            </h1>
                            <p className="text-[var(--text-muted-dark)] text-sm">
                                Enter your details to reveal your sacred numbers
                            </p>
                        </div>

                        {/* Form Card */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="vedic-card-light"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
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
                                    className={inputClass}
                                />
                                {touched.name && errors.name && (
                                    <p className="text-[var(--color-terracotta)] text-xs mt-1.5">{errors.name}</p>
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
                                    className={inputClass}
                                    maxLength={10}
                                />
                                {touched.dob && errors.dob && (
                                    <p className="text-[var(--color-terracotta)] text-xs mt-1.5">{errors.dob}</p>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-6">
                                <div className="flex-1 h-px bg-[rgba(107,45,45,0.15)]"></div>
                                <span className="text-[var(--text-muted-dark)] text-xs">Optional</span>
                                <div className="flex-1 h-px bg-[rgba(107,45,45,0.15)]"></div>
                            </div>

                            {/* Mobile */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-[var(--text-muted-dark)]">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="10-digit number"
                                    className={inputClass}
                                />
                                {touched.mobile && errors.mobile && (
                                    <p className="text-[var(--color-terracotta)] text-xs mt-1.5">{errors.mobile}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium mb-2 text-[var(--text-muted-dark)]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="your@email.com"
                                    className={inputClass}
                                />
                                {touched.email && errors.email && (
                                    <p className="text-[var(--color-terracotta)] text-xs mt-1.5">{errors.email}</p>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="mb-7">
                                <label className="block text-sm font-medium mb-3 text-[var(--text-muted-dark)]">
                                    Gender
                                </label>
                                <div className="flex gap-3">
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
                            </div>

                            {/* Submit */}
                            <motion.button
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
                                whileHover={isFormValid && !isSubmitting ? { scale: 1.01 } : {}}
                                whileTap={isFormValid && !isSubmitting ? { scale: 0.99 } : {}}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <span>Generate My Report</span>
                                )}
                            </motion.button>

                            <p className="text-center text-[var(--text-muted-dark)] text-xs mt-5">
                                🔒 Your data is private and secure
                            </p>
                        </motion.form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default FormPage;
