import React from 'react';
import { motion } from 'motion/react';

// STAGGERED GRID/CONTAINER
export const AnimateStaggerContainer = ({ children, delay = 0.05, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="show"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: delay,
                        delayChildren: 0.1
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

// INDIVIDUAL STAGGER ITEM (Elegant lift-up and fade-in)
export const AnimateStaggerItem = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { y: 20, opacity: 0 },
                show: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

// SLIDE AND FADE IN wrapper (Ideal for single blocks or section headers)
export const AnimateIn = ({ children, direction = "up", delay = 0, duration = 0.5, className = "" }) => {
    const directions = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: -30, y: 0 },
        right: { x: 30, y: 0 },
        scale: { scale: 0.92, opacity: 0 }
    };

    const initial = direction === "scale" ? { scale: 0.92, opacity: 0 } : { ...directions[direction], opacity: 0 };
    const animate = direction === "scale" ? { scale: 1, opacity: 1 } : { x: 0, y: 0, opacity: 1 };

    return (
        <motion.div
            className={className}
            initial={initial}
            animate={animate}
            transition={{
                delay: delay,
                duration: duration,
                type: "spring",
                stiffness: 90,
                damping: 14
            }}
        >
            {children}
        </motion.div>
    );
};

// SPECIAL PULSATING REVELATION FOR IMPORTANT STATISTICS
export const AnimateReveal = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay: delay,
                type: "spring",
                stiffness: 110,
                damping: 12
            }}
        >
            {children}
        </motion.div>
    );
};

// LUXURY TEXT CHAR-BY-CHAR WRITER (For high-impact display headers like AboutPage/Welcome back)
export const AnimatedText = ({ text, className = "" }) => {
    const words = text.split(" ");
    
    return (
        <motion.span
            className={`inline-block ${className}`}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.04
                    }
                }
            }}
        >
            {words.map((word, idx) => (
                <motion.span 
                    key={idx} 
                    className="inline-block mr-1.5"
                    variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
};
