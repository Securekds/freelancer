import React, { useState, useEffect, useRef } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FiArrowLeft } from "react-icons/fi";
import Typography from '@mui/material/Typography';
import i18n from 'i18next';

import { useTranslation } from 'react-i18next';
import {
    useMotionTemplate,
    useMotionValue,
    motion,
    animate,
} from "framer-motion";
import { borderRadius } from '@mui/system';
import AnimatedSellersCards from "./AnimatedSellersCards";

const styles = {
    container: {
        width: '96%',
        height: 'auto',
        marginTop: '50px',
        border: '1px solid #000',
        borderRadius: '16px',
        backgroundClip: 'border-box',
        background: 'rgba(0, 0, 0, 0.3)',
    },
    section: {
        borderRadius: '16px',
        display: 'grid',
        placeContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#020617',
        padding: '6rem 1rem',
        color: '#e5e7eb',
        position: 'relative',
    },
    contentWrapper: {
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    badge: {
        marginBottom: '0.375rem',
        display: 'inline-block',
        borderRadius: '9999px',
        backgroundColor: 'rgba(75, 85, 99, 0.5)',
        padding: '0.375rem 0.75rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
    },
    heading: {
        maxWidth: '48rem',
        background: 'linear-gradient(to bottom right, #ffffff, #9ca3af)',
        backgroundClip: 'text',
        textAlign: 'center',
        fontSize: '1.875rem',
        fontWeight: 500,
        lineHeight: 1.2,
        color: 'transparent',
        '@media (min-width: 640px)': {
            fontSize: '3rem',
        },
        '@media (min-width: 768px)': {
            fontSize: '4.5rem',
        },
    },
    description: {
        margin: '1.5rem 0',
        maxWidth: '36rem',
        textAlign: 'center',
        fontSize: '1rem',
        lineHeight: 1.625,
        '@media (min-width: 768px)': {
            fontSize: '1.125rem',
        },
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        width: 'fit-content',
        borderRadius: '9999px',
        backgroundColor: 'rgba(3, 7, 18, 0.1)',
        padding: '0.5rem 1rem',
        color: '#f9fafb',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(3, 7, 18, 0.5)',
        },
    },
    arrow: {
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'rotate(-45deg)',
        },
        '&:active': {
            transform: 'rotate(-12deg)',
        },
    },
    canvas: {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
    },
};

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function HireAFreelancer() {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    const { t } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    const toggleLanguage = (language) => {
        localStorage.setItem('language', language);
        setCurrentLanguage(language);
        i18n
            .changeLanguage(language)
            .then(() => console.log('Language changed successfully'))
            .catch((error) => console.error('Error changing language:', error));
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    return (
        <div style={styles.container}>
            <motion.section style={{ ...styles.section, backgroundImage }}>
                <div style={styles.contentWrapper}>
                    <Typography
                        variant="body2"
                        component="span"
                        style={{
                            ...styles.badge,
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            fontSize: '15px',
                        }}
                    >
                        Welcome to the Future of Freelancing
                    </Typography>
                    <Typography
                        variant="h4"
                        component="h1"
                        style={{
                            ...styles.heading,
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginTop: '18px',
                        }}
                    >
                        Discover Top Talent and Accelerate Your Projects
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        style={{
                            ...styles.description,
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        At Khadamat, we connect you with highly skilled freelancers who can bring your ideas to life. Find the perfect match for your project and elevate your business.
                    </Typography>
                    <motion.button
                        style={{
                            ...styles.button,
                            border,
                            boxShadow,
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, #5B42F3, #00DDEB)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                        whileHover={{
                            scale: 1.015,
                        }}
                        whileTap={{
                            scale: 0.985,
                        }}
                    >
                        Explore Top Freelancers
                        <FiArrowLeft
                            style={{
                                ...styles.arrow,
                                fontSize: '15px',  // Adjust size if necessary
                                color: '#5B42F3',     // Set the color of the arrow to make it visible
                                marginLeft: '8px', // Adjust spacing between the text and the arrow
                            }}
                        />
                    </motion.button>


                </div>
                <div style={styles.canvas}>
                    <Canvas>
                        <Stars radius={50} count={2500} factor={4} fade speed={2} />
                    </Canvas>
                </div>
            </motion.section>

            <div className="Div">
                <AnimatedSellersCards />
            </div>
        </div>
    );
}

export default HireAFreelancer;