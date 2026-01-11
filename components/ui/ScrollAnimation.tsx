'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

type AnimationType =
    | 'fade-in-up'
    | 'fade-in-left'
    | 'fade-in-right'
    | 'scale-in'
    | 'zoom-in'
    | 'rotate-in'
    | 'none';

interface ScrollAnimationProps {
    children: ReactNode;
    animation?: AnimationType;
    duration?: number;
    delay?: number;
    className?: string;
    threshold?: number;
}

export function ScrollAnimation({
    children,
    animation = 'fade-in-up',
    duration = 0.6,
    delay = 0,
    className = '',
    threshold = 0.1
}: ScrollAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -100px 0px', // Trigger slightly earlier for smoother entry
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
            observer.disconnect();
        };
    }, [threshold]);

    // Map animation types to utility classes
    const getAnimationClass = () => {
        switch (animation) {
            case 'fade-in-up': return 'animate-fade-in-up';
            case 'fade-in-left': return 'animate-fade-in-left';
            case 'fade-in-right': return 'animate-fade-in-right';
            case 'scale-in': return 'animate-scale-in';
            case 'zoom-in': return 'animate-zoom-in';
            case 'rotate-in': return 'animate-rotate-in';
            default: return '';
        }
    };

    const style = {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        opacity: isVisible ? undefined : 0, // initially hidden
    };

    return (
        <div
            ref={elementRef}
            className={`${className} ${isVisible && animation !== 'none' ? getAnimationClass() : 'opacity-0'}`}
            style={isVisible ? style : { opacity: 0 }}
        >
            {children}
        </div>
    );
}
