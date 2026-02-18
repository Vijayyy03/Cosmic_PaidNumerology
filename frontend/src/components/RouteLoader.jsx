import { useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RouteLoader = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading" || navigation.state === "submitting";
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval;
        if (isLoading) {
            setProgress(10); // Start
            interval = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + Math.random() * 10;
                    return next > 90 ? 90 : next; // Cap at 90% until done
                });
            }, 200);
        } else {
            setProgress(100); // Finish
            setTimeout(() => setProgress(0), 500); // Hide
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    if (!isLoading && progress === 0) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-gold-light)] to-[var(--color-gold)] shadow-[0_0_10px_var(--color-gold)] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default RouteLoader;
