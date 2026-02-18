import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import { generateNumerologyReport } from '../services/api';

const ReportPage = () => {
    const { formData } = useReport();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [iframeLoading, setIframeLoading] = useState(true);

    // Redirect if no form data
    useEffect(() => {
        if (!formData || !formData.name) {
            navigate('/numerology-form');
        }
    }, [formData, navigate]);

    const location = useLocation(); // Import useLocation

    // Fetch Report on Mount
    useEffect(() => {
        const fetchReport = async () => {
            if (!formData || !formData.name) return;

            // CHECK: If PDF URL passed from Payment Success, use it directly!
            if (location.state?.pdfUrl) {
                setPdfUrl(location.state.pdfUrl.replace('http://', 'https://'));
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setIframeLoading(true);
                setError(null);
                // Fallback to legacy generation (or we can block it if strict payment required)
                // For now, let's keep it to handle "refresh" if context persists but state is lost?
                // Actually, if we refresh, location.state is lost but formData is in context. 
                // We should probably prompt to pay again or check if we have a saved URL in context.

                // For now, DEFAULT TO PAY-AGAIN if strictly paid, but let's allow generation for testing
                // OR we can make generateNumerologyReport fail if valid payment not found (backend enforced)

                const data = await generateNumerologyReport(formData);
                if (data.pdf_url) {
                    setPdfUrl(data.pdf_url.replace('http://', 'https://'));
                } else {
                    throw new Error("Received invalid response from server");
                }
            } catch (err) {
                console.error("Report Generation Error:", err);

                let errorMessage = "Failed to generate report";

                if (err.response?.data?.detail) {
                    const detail = err.response.data.detail;
                    if (typeof detail === 'string') {
                        errorMessage = detail;
                    } else if (Array.isArray(detail)) {
                        // Handle Pydantic validation errors (array of objects)
                        errorMessage = detail.map(e => e.msg || JSON.stringify(e)).join(', ');
                    } else if (typeof detail === 'object') {
                        errorMessage = detail.msg || JSON.stringify(detail);
                    }
                } else if (err.message) {
                    errorMessage = err.message;
                }

                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [formData, location.state]);

    if (!formData) return null;

    return (
        <div className="min-h-screen bg-texture-paper relative overflow-hidden flex flex-col">
            {/* Header Bar */}
            <div className="bg-header py-4 px-4 sticky top-0 z-50 shadow-md">
                <div className="container-main flex items-center justify-between">
                    <button
                        onClick={() => navigate('/numerology-form')}
                        className="flex items-center gap-2 text-[var(--color-cream)] hover:text-gold transition-colors text-sm"
                    >
                        <span>←</span> Back
                    </button>
                    <img src="/images/logo.png" alt="Shiv Cosmic" className="h-10 w-auto" />
                    <div className="w-10"></div> {/* Spacer for alignment */}
                </div>
            </div>

            <main className="flex-grow relative z-10 py-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="container-main w-full max-w-4xl">

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-maroon mx-auto mb-6"></div>
                            <h2 className="heading-vedic text-2xl font-bold text-maroon mb-2">Generating Your Cosmic Chart...</h2>
                            <p className="text-[var(--text-muted-dark)]">Connecting with the stars to reveal your destiny.</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-red-200 text-center max-w-2xl mx-auto">
                            <div className="text-5xl mb-4">⚠️</div>
                            <h2 className="heading-vedic text-2xl font-bold text-red-800 mb-4">Report Generation Failed</h2>
                            <p className="text-red-700 mb-6 text-lg">{error}</p>

                            {error.includes("Plan") ? (
                                <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-left text-sm text-yellow-800 mb-6">
                                    <strong>Admin Action Required:</strong> The current API plan does not support Numerology PDF reports. Please upgrade your subscription at <a href="https://vedicrishi.in/" target="_blank" rel="noopener noreferrer" className="underline">AstrologyAPI / Vedic Rishi</a>.
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 mb-6">Please try again later or contact support.</p>
                            )}

                            <button
                                onClick={() => navigate('/numerology-form')}
                                className="px-6 py-2 bg-maroon text-white rounded hover:bg-opacity-90 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    )}

                    {/* Success State - PDF Display */}
                    {pdfUrl && (
                        <div className="flex flex-col items-center w-full h-full">
                            <div className="text-center mb-8 animate-slide-up">
                                <div className="sanskrit-accent mb-3 text-xl">॥ श्री गणेशाय नमः ॥</div>
                                <h1 className="heading-vedic text-3xl md:text-4xl font-bold mb-2 text-maroon">
                                    {formData.name}'s <span className="text-gold">Cosmic Chart</span>
                                </h1>
                            </div>

                            {/* PDF Display */}
                            <div className="w-full h-[800px] bg-gray-100 rounded-lg shadow-xl overflow-hidden border border-[var(--border-gold)] mt-8 relative">
                                <iframe
                                    src={pdfUrl}
                                    className="w-full h-full"
                                    title="Numerology Report PDF"
                                ></iframe>
                            </div>

                            <div className="mt-8 flex gap-4 animate-slide-up animate-delay-300">
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gold flex items-center gap-2 px-8 py-3 rounded text-lg hover:scale-105 transition-transform duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-header py-8 border-t border-[var(--color-gold)] mt-auto">
                <div className="container-main text-center">
                    <p className="text-[var(--text-muted-light)] text-sm">
                        © {new Date().getFullYear()} Shiv Cosmic Energy Solutions. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ReportPage;
