import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const NumerologyForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        language: 'English',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Generate dropdown options
    const days = useMemo(() =>
        Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')),
        []);

    const months = useMemo(() => [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ], []);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 100 }, (_, i) => String(currentYear - i));
    }, []);

    const languages = ['English', 'Hindi', 'Spanish', 'French', 'German'];

    // Validation
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Full name is required';
                if (value.trim().length < 2) return 'Please enter your full name';
                if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name should only contain letters';
                return '';
            case 'gender':
                return !value ? 'Please select your gender' : '';
            case 'dobDay':
            case 'dobMonth':
            case 'dobYear':
                return !value ? 'Required' : '';
            case 'language':
                return !value ? 'Please select a language' : '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const isFormValid = () => {
        return (
            formData.name.trim().length >= 2 &&
            formData.gender &&
            formData.dobDay &&
            formData.dobMonth &&
            formData.dobYear &&
            formData.language
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        if (Object.keys(newErrors).length === 0) {
            onSubmit({
                name: formData.name.trim(),
                gender: formData.gender,
                dob: `${formData.dobDay}-${formData.dobMonth}-${formData.dobYear}`,
                language: formData.language,
            });
        }
    };

    return (
        <section id="form-section" className="section bg-gradient-to-b from-cosmic-dark via-cosmic-surface to-cosmic-dark">
            <div className="container-custom">
                <motion.div
                    className="max-w-xl mx-auto glass-card p-8 md:p-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-8">
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2">
                            Generate Your <span className="gold-text">Numerology Report</span>
                        </h2>
                        <p className="text-text-muted">Enter your details below to unlock your personalized insights</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your full name (as per birth certificate)"
                                className={`form-input ${errors.name && touched.name ? 'error' : touched.name && !errors.name && formData.name ? 'valid' : ''}`}
                            />
                            {errors.name && touched.name && (
                                <p className="text-status-error text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Gender</label>
                            <div className="relative">
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-input appearance-none cursor-pointer ${errors.gender && touched.gender ? 'error' : ''}`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Date of Birth</label>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="relative">
                                    <select
                                        name="dobDay"
                                        value={formData.dobDay}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-input appearance-none cursor-pointer"
                                    >
                                        <option value="">DD</option>
                                        {days.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>

                                <div className="relative">
                                    <select
                                        name="dobMonth"
                                        value={formData.dobMonth}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-input appearance-none cursor-pointer"
                                    >
                                        <option value="">MM</option>
                                        {months.map(month => (
                                            <option key={month.value} value={month.value}>{month.label}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>

                                <div className="relative">
                                    <select
                                        name="dobYear"
                                        value={formData.dobYear}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-input appearance-none cursor-pointer"
                                    >
                                        <option value="">YYYY</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Report Language</label>
                            <div className="relative">
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="form-input appearance-none cursor-pointer"
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid() || isLoading}
                            className="btn-primary w-full mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                                    </svg>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <span>Generate Report</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-text-dim text-sm flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Your data is secure and never shared
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NumerologyForm;
