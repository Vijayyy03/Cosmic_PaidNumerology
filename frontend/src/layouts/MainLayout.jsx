import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Lenis from 'lenis';
import RouteLoader from '../components/RouteLoader';

import Footer from '../components/Footer';

const MainLayout = () => {
    const location = useLocation();

    useEffect(() => {
        // Initialize Lenis for Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Reset scroll on route change (Lenis handles this better than window.scrollTo)
        lenis.scrollTo(0, { immediate: true });

        return () => {
            lenis.destroy();
        };
    }, [location.pathname]);

    return (
        <div className="font-body text-text-dark bg-cream min-h-screen flex flex-col relative overflow-hidden">
            <RouteLoader />
            <div className="bg-mandala-overlay"></div>
            <div className="flex-grow">
                <Outlet />
            </div>

            {/* Global Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
