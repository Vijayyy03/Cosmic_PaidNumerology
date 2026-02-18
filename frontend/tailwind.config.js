/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cosmic: {
                    deep: '#2B1C50',
                    indigo: '#3A2E6E',
                    surface: '#1a1530',
                    surfaceLight: '#251f42',
                    dark: '#0d0a1a',
                },
                accent: {
                    gold: '#F5C77A',
                    goldDark: '#e6c200',
                    glow: 'rgba(245, 199, 122, 0.3)',
                },
                text: {
                    primary: '#FFFFFF',
                    muted: '#CFCFD4',
                    dim: '#7a7590',
                },
                status: {
                    success: '#4ade80',
                    error: '#ef4444',
                }
            },
            fontFamily: {
                heading: ['Playfair Display', 'Georgia', 'serif'],
                body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 30px rgba(107, 76, 230, 0.3)',
                'gold': '0 0 20px rgba(245, 199, 122, 0.2)',
                'goldBright': '0 0 40px rgba(245, 199, 122, 0.4)',
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'twinkle': 'twinkle 4s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-30px) scale(1.05)' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(245, 199, 122, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(245, 199, 122, 0.5)' },
                },
            },
        },
    },
    plugins: [],
}
