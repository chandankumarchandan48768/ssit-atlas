import { useState, useEffect } from 'react';

/**
 * Custom hook for intersection observer to detect when element enters viewport
 * Useful for triggering animations on scroll
 */
const useInView = (options = {}) => {
    const [ref, setRef] = useState(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, {
            threshold: 0.1,
            ...options,
        });

        observer.observe(ref);

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        };
    }, [ref, options]);

    return [setRef, isInView];
};

export default useInView;
