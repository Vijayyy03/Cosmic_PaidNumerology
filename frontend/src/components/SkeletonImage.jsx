import { useState } from 'react';

const SkeletonImage = ({ src, alt, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton Loader */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-0">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                </div>
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                onLoad={() => setIsLoaded(true)}
                {...props}
            />
        </div>
    );
};

export default SkeletonImage;
