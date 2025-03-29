import React, { useEffect, useState, useRef } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    Menu,
    Button,
    MenuItem,
    Slider,
    Chip,
    Box,
    Typography,
    Grid,
    Paper
} from '@mui/material';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useUser } from '../../../Context/UserContext';
import { Player } from '@lottiefiles/react-lottie-player';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import PaymentDone from '../../../assets/images/small-logos/PaymentDone.json';
import CloseIcon from '@mui/icons-material/Close';
import DOMPurify from "dompurify";
import useMediaQuery from '@mui/material/useMediaQuery';

import axios from 'axios';



// Create RTL-specific cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
const rtlTheme = createTheme({
    direction: 'rtl',
});




function ProfileFetchInfo({ handleShowProfileInfoClose }) {
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

    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(false);


    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const Roles = [
        // Technical Roles
        'Programming & Development',
        'Web Development',
        'Mobile App Development',
        'UI/UX Design',
        'Graphic Design',
        'Digital Marketing',
        'Writing & Content',
        'Data Science & Analytics',
        'Business & Consulting',
        'Creative & Media',
        'Education & Training',
        'Niche & Specialized',
        'Game Development',
        'Blockchain Development',
        'AI & Machine Learning',
        'Cloud Computing',
        'Cybersecurity',
        'IT Support'
    ];

    const RoleSpecializations = {
        // Programming & Development
        'Programming & Development': [
            'JavaScript Development',
            'Python Development',
            'Java Development',
            'C# Development',
            'PHP Development',
            'Ruby on Rails Development',
            'Node.js Development',
            'React.js Development',
            'Angular Development',
            'Vue.js Development',
            'Django Development',
            'Flask Development',
            'Laravel Development',
            'WordPress Development',
            'Shopify Development',
            'Magento Development',
            'API Integration',
            'Microservices Architecture',
            'RESTful API Development',
            'GraphQL Development',
            'Web Scraping',
            'Chatbot Development',
            'Blockchain Smart Contracts',
            'Solidity Development',
            'Ethereum Development',
            'Hyperledger Development',
            'AI Chatbot Development',
            'Machine Learning Model Deployment',
            'TensorFlow Development',
            'PyTorch Development',
            'Data Pipeline Development',
        ],

        // Web Development
        'Web Development': [
            'Frontend Development',
            'Backend Development',
            'Full-Stack Development',
            'Responsive Web Design',
            'E-commerce Development',
            'CMS Development',
            'Single Page Applications (SPA)',
            'Progressive Web Apps (PWA)',
            'Web Performance Optimization',
            'Web Security',
            'Web Accessibility',
            'Web Analytics Integration',
        ],

        // Mobile App Development
        'Mobile App Development': [
            'iOS Development',
            'Android Development',
            'React Native Development',
            'Flutter Development',
            'Cross-Platform Development',
            'Mobile UI/UX Design',
            'Mobile App Testing',
            'Mobile App Security',
            'Mobile Game Development',
            'Augmented Reality (AR) Apps',
            'Virtual Reality (VR) Apps',
            'Mobile Payment Integration',
        ],

        // UI/UX Design
        'UI/UX Design': [
            'UI/UX Prototyping',
            'Wireframing',
            'User Research',
            'Interaction Design',
            'Responsive Web Design',
            'Mobile App Design',
            'User Testing',
            'Information Architecture',
            'Usability Analysis',
            'Design Systems',
            'Figma Design',
            'Sketch Design',
            'Adobe XD Design',
            'InVision Prototyping',
        ],

        // Graphic Design
        'Graphic Design': [
            'Logo Design',
            'Branding & Identity',
            'Illustration',
            'Typography Design',
            'Poster Design',
            'Brochure Design',
            'Packaging Design',
            'Infographic Design',
            'Icon Design',
            'Digital Painting',
            'Print Design',
            'Social Media Graphics',
            'Motion Graphics',
            '3D Modeling',
        ],

        // Digital Marketing
        'Digital Marketing': [
            'Search Engine Optimization (SEO)',
            'Search Engine Marketing (SEM)',
            'Pay-Per-Click (PPC) Advertising',
            'Social Media Marketing',
            'Content Marketing',
            'Email Marketing',
            'Affiliate Marketing',
            'Influencer Marketing',
            'Video Marketing',
            'Marketing Strategy',
            'Brand Management',
            'Public Relations',
            'Market Research',
            'Lead Generation',
        ],

        // Writing & Content
        'Writing & Content': [
            'Copywriting',
            'Content Writing',
            'Technical Writing',
            'Blog Writing',
            'Creative Writing',
            'Ghostwriting',
            'Scriptwriting',
            'Resume Writing',
            'Proofreading',
            'Editing',
            'Translation',
            'Transcription',
            'Localization',
            'Content Strategy',
        ],

        // Data Science & Analytics
        'Data Science & Analytics': [
            'Data Analysis',
            'Data Visualization',
            'Machine Learning',
            'Artificial Intelligence (AI)',
            'Big Data',
            'Data Engineering',
            'Business Intelligence',
            'Predictive Analytics',
            'Data Mining',
            'Natural Language Processing (NLP)',
            'Computer Vision',
            'Data Warehousing',
            'ETL Development',
        ],

        // Business & Consulting
        'Business & Consulting': [
            'Business Consulting',
            'Startup Consulting',
            'Financial Consulting',
            'Tax Consulting',
            'Legal Consulting',
            'HR Consulting',
            'Project Management',
            'Product Management',
            'Agile Coaching',
            'Scrum Master',
            'Operations Management',
            'Supply Chain Management',
            'Virtual Assistance',
            'Data Entry',
        ],

        // Creative & Media
        'Creative & Media': [
            'Video Editing',
            'Video Production',
            'Photography',
            'Photo Editing',
            'Videography',
            'Drone Videography',
            'Sound Design',
            'Music Production',
            'Podcast Editing',
            'Voiceover Services',
            'Animation',
            'Motion Graphics',
            'Live Streaming',
            'YouTube Content Creation',
        ],

        // Education & Training
        'Education & Training': [
            'Online Teaching',
            'Language Tutoring',
            'Math Tutoring',
            'Science Tutoring',
            'Test Preparation',
            'Career Coaching',
            'Life Coaching',
            'Fitness Training',
            'Yoga Instruction',
            'Nutrition Consulting',
            'Personal Training',
            'Cooking Classes',
            'Art Classes',
            'Music Lessons',
        ],

        // Niche & Specialized
        'Niche & Specialized': [
            'Cryptocurrency Consulting',
            'NFT Art Creation',
            'Blockchain Consulting',
            'Forex Trading',
            'Stock Market Analysis',
            'Astrology Services',
            'Tarot Reading',
            'Graphology (Handwriting Analysis)',
            'Genealogy Research',
            'Historical Research',
            'Grant Research',
            'Crowdfunding Consulting',
            'Sustainability Consulting',
            'Environmental Consulting',
        ],

        // Additional Roles
        'Game Development': [
            'Game Design',
            'Game Engine Development',
            '2D/3D Game Development',
            'Game Physics',
            'Game AI',
            'Multiplayer Game Development',
            'Virtual Reality (VR) Games',
            'Augmented Reality (AR) Games',
        ],

        'Blockchain Development': [
            'Smart Contract Development',
            'Decentralized Applications (DApps)',
            'Blockchain Protocols',
            'Cryptocurrency Development',
            'Tokenomics',
            'Blockchain Security',
        ],

        'AI & Machine Learning': [
            'Machine Learning Models',
            'Neural Networks',
            'Natural Language Processing (NLP)',
            'Computer Vision',
            'Reinforcement Learning',
            'AI Ethics',
        ],

        'Cloud Computing': [
            'AWS Services',
            'Azure Services',
            'Google Cloud Services',
            'Cloud Architecture',
            'Serverless Computing',
            'Cloud Security',
        ],

        'Cybersecurity': [
            'Network Security',
            'Application Security',
            'Penetration Testing',
            'Security Audits',
            'Incident Response',
            'Threat Intelligence',
        ],

        'IT Support': [
            'Technical Troubleshooting',
            'Hardware Maintenance',
            'Software Installation',
            'Network Configuration',
            'Help Desk Support',
            'System Administration',
        ],
    };

    const roleSkillsMap = {
        'Programming & Development': ['React', 'Node.js', 'Python', 'C++', 'Java', 'SQL', 'Ruby', 'Go', 'TypeScript', 'Rust'],
        'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'PHP', 'Laravel', 'Django', 'Bootstrap', 'WordPress'],
        'Mobile App Development': ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Dart', 'Objective-C', 'Xamarin', 'Ionic', 'Firebase', 'Cordova'],
        'UI/UX Design': ['Figma', 'Adobe XD', 'Sketch', 'Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems', 'Interaction Design', 'Accessibility'],
        'Graphic Design': ['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'CorelDRAW', 'GIMP', 'Affinity Designer', 'Typography', 'Logo Design', 'Vector Illustration'],
        'Digital Marketing': ['SEO', 'Google Ads', 'Facebook Ads', 'Copywriting', 'Content Marketing', 'Email Marketing', 'Social Media Strategy', 'Affiliate Marketing', 'PPC Advertising', 'Influencer Marketing'],
        'Writing & Content': ['Blog Writing', 'Technical Writing', 'Copywriting', 'Editing & Proofreading', 'Ghostwriting', 'Creative Writing', 'Grant Writing', 'Scriptwriting', 'White Papers', 'Ebook Writing'],
        'Data Science & Analytics': ['Python', 'R', 'Tableau', 'Excel', 'Power BI', 'SQL', 'Big Data', 'Machine Learning', 'Data Visualization', 'Data Cleaning'],
        'Business & Consulting': ['Market Research', 'Business Strategy', 'Finance', 'Project Management', 'Risk Analysis', 'Business Development', 'HR Consulting', 'Brand Strategy', 'Operations Management', 'Lean Six Sigma'],
        'Creative & Media': ['Video Editing', 'Photography', '3D Animation', 'Motion Graphics', 'Audio Editing', 'Storyboarding', 'Film Production', 'Visual Effects', 'Voiceover', 'Podcasting'],
        'Education & Training': ['Online Tutoring', 'Course Development', 'Instructional Design', 'E-learning', 'Lesson Planning', 'Public Speaking', 'Teacher Training', 'Curriculum Development', 'Test Preparation', 'Academic Writing'],
        'Niche & Specialized': ['Legal Consulting', 'Medical Writing', 'Genealogy Research', 'Astrology', 'Forex Trading', 'Luxury Branding', 'Fashion Consulting', 'Patent Research', 'Nutrition Consulting', 'Music Production'],
        'Game Development': ['Unity', 'Unreal Engine', 'C#', '3D Modeling', 'Game Physics', 'Game AI', 'Shader Programming', 'Multiplayer Development', 'Game Testing', 'Virtual Reality'],
        'Blockchain Development': ['Solidity', 'Ethereum', 'NFT Development', 'Smart Contracts', 'Web3.js', 'Crypto Trading Bots', 'Hyperledger', 'Dapp Development', 'Tokenomics', 'DeFi Protocols'],
        'AI & Machine Learning': ['TensorFlow', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Speech Recognition', 'AI Ethics', 'Bayesian Networks', 'Generative AI', 'Model Deployment'],
        'Cloud Computing': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Serverless Computing', 'DevOps', 'Terraform', 'Cloud Security', 'Hybrid Cloud'],
        'Cybersecurity': ['Penetration Testing', 'Ethical Hacking', 'Malware Analysis', 'Network Security', 'Security Auditing', 'Incident Response', 'Cryptography', 'Threat Intelligence', 'SIEM', 'SOC Operations'],
        'IT Support': ['Helpdesk', 'Technical Support', 'System Administration', 'Network Troubleshooting', 'Hardware Repair', 'Software Deployment', 'Active Directory', 'ITIL Framework', 'Remote Assistance', 'Customer Support'],
    };


    const menuRef = useRef(null);
    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenSkillsMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);





    const [formData, setFormData] = useState({
        selectedSpecialization: [],  // Changed to an array  
        description: '',
        selectedRole: '',
        selectedLanguages: [],
        workAvailability: '',
        selectedSkills: [],
    });

    const [errors, setErrors] = useState({
        selectedSpecializationError: '',
        selectedRoleError: '',
        selectedLanguagesError: '',
        workAvailabilityError: '',
        selectedSkillsError: '',
        descriptionError: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        let error = '';

        // Check if the description contains only numbers
        if (/^\d+$/.test(value)) {
            error = 'The description cannot contain only numbers. Please provide a meaningful description.';
        }
        // Check minimum length (20 characters)
        else if (value.length > 0 && value.length < 20) {
            error = 'Your description must be at least 20 characters long.';
        }
        // Check max length (215 characters) (without preventing typing)
        else if (value.length === 215) {
            error = 'Maximum character limit reached (215 characters).';
        }

        // Update description state regardless of errors
        setFormData((prev) => ({
            ...prev,
            description: value,
        }));

        // Update errors if any
        setErrors((prev) => ({
            ...prev,
            descriptionError: !!error,
        }));
        setErrorMessage(error);
    };


    const [openProjectCat, setOpenProjectCat] = useState(false);
    const [anchorElCatego, setAnchorElCatego] = useState(null);



    // Handle open for Category Menu
    const handleClickProjectCatego = (event) => {

        setAnchorElCatego(event.currentTarget); // Set the anchor for positioning the menu
        setOpenProjectCat(true); // Open the menu
    };
    // Handle Category Menu Close
    const handleCloseProjectCatego = (value) => {
        setFormData((prev) => ({
            ...prev,
            selectedRole: value || '', // Ensure it’s not undefined
            selectedSpecialization: [], // ✅ Keep it an array
            selectedSkills: [], // [{ skill: 'React', percentage: 80 }, { skill: 'Node.js', percentage: 60 }]

        }));

        setOpenProjectCat(false);
        setAnchorElCatego(null);

        setErrors((prev) => ({
            ...prev,
            selectedRoleError: !value, // Set error if value is empty
            selectedSpecializationError: false, // Reset specialization error
        }));

        setErrorMessage(value ? '' : 'Your Role is required.');
    };



    const filteredSpecializations = RoleSpecializations[formData.selectedRole] || [];



    const [openSpecializationMenu, setOpenSpecializationMenu] = useState(false);
    const [anchorElSpecialization, setAnchorElSpecialization] = useState(null);



    // Handle open for Specialization Menu
    const handleClickSpecialization = (event) => {
        setAnchorElSpecialization(event.currentTarget);
        setOpenSpecializationMenu(true);
    };

    const handleCloseSpecialization = (value) => {
        if (!value) return; // Ignore empty values

        setFormData((prev) => {
            let updatedSpecializations = [...prev.selectedSpecialization];

            if (updatedSpecializations.includes(value)) {
                // Remove specialization if it's already selected (toggle behavior)
                updatedSpecializations = updatedSpecializations.filter((item) => item !== value);
            } else {
                if (updatedSpecializations.length >= 4) {
                    setErrorMessage('You can select up to 4 specializations only.');
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        selectedSpecializationError: true,
                    }));
                    return prev; // Don't update state if max is reached
                }
                updatedSpecializations.push(value);
            }

            setErrorMessage('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedSpecializationError: false,
            }));

            // ✅ Automatically close menu **only** when 4 selections are made
            if (updatedSpecializations.length === 4) {
                setOpenSpecializationMenu(false);
                setAnchorElSpecialization(null);
            }

            return {
                ...prev,
                selectedSpecialization: updatedSpecializations,
            };
        });
    };


    // Language Menu State
    const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
    const [anchorElLanguage, setAnchorElLanguage] = useState(null);

    const availableLanguages = ['English', 'Arabic', 'French', 'Spanish', 'German', 'Chinese', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean', 'Turkish', 'Hindi', 'Bengali', 'Urdu', 'Dutch', 'Greek', 'Polish', 'Swedish', 'Thai', 'Vietnamese', 'Hebrew', 'Persian', 'Indonesian', 'Malay', 'Filipino']; // ✅ Most common languages
    const availableWorkHours = ['5hrs/Day', '10hrs/Day', '20hrs/Week', '30hrs/Week', '50hrs/Month', '80hrs/Month', 'Available/AllTime'];


    // ✅ Handle opening language menu
    const handleClickLanguage = (event) => {
        setAnchorElLanguage(event.currentTarget);
        setOpenLanguageMenu(true);
    };

    // ✅ Handle language selection (max 3)
    const handleCloseLanguage = (value) => {
        if (!value) return;

        setFormData((prev) => {
            let updatedLanguages = [...prev.selectedLanguages];

            if (updatedLanguages.includes(value)) {
                updatedLanguages = updatedLanguages.filter((item) => item !== value);
            } else {
                if (updatedLanguages.length >= 3) {
                    setErrorMessage('You can select up to 3 languages only.');
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        selectedLanguagesError: true,
                    }));
                    return prev;
                }
                updatedLanguages.push(value);
            }

            setErrorMessage('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedLanguagesError: false,
            }));

            // ✅ Close menu only when 3 selections are made
            if (updatedLanguages.length === 3) {
                setOpenLanguageMenu(false);
                setAnchorElLanguage(null);
            }

            return {
                ...prev,
                selectedLanguages: updatedLanguages,
            };
        });
    };


    const [openAvailabilityMenu, setOpenAvailabilityMenu] = useState(false);
    const [anchorElAvailability, setAnchorElAvailability] = useState(null);

    const handleClickAvailability = (event) => {
        setAnchorElAvailability(event.currentTarget);
        setOpenAvailabilityMenu(true);
    };

    const handleWorkAvailabilityChange = (value) => {
        setFormData((prev) => {
            // If the same option is selected, clear the selection and show an error
            if (prev.workAvailability === value) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    workAvailabilityError: 'You must select an availability option!',
                }));
                return { ...prev, workAvailability: '' }; // Clear selection
            }

            // Otherwise, update selection and clear error
            setErrors((prevErrors) => ({
                ...prevErrors,
                workAvailabilityError: '',
            }));

            return { ...prev, workAvailability: value };
        });

        setOpenAvailabilityMenu(false);
    };

    const [openSkillsMenu, setOpenSkillsMenu] = useState(false);
    const [anchorElSkills, setAnchorElSkills] = useState(null);

    const handleClickSkills = (event) => {
        setAnchorElSkills(event.currentTarget);
        setOpenSkillsMenu(!openSkillsMenu);
    };
    const handleCloseMenu = () => {
        setOpenSkillsMenu(false);
    };

    const handleSelectSkill = (skill) => {
        setFormData((prev) => {
            let updatedSkills = [...prev.selectedSkills];

            if (updatedSkills.some((s) => s.skill === skill)) {
                // Remove skill if already selected (toggle behavior)
                updatedSkills = updatedSkills.filter((s) => s.skill !== skill);
            } else {
                if (updatedSkills.length >= 6) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        selectedSkillsError: 'You can select up to 6 skills only.',
                    }));
                    return prev; // Don't update if max reached
                }
                updatedSkills.push({ skill, percentage: 50 }); // Default to 50%
            }

            return { ...prev, selectedSkills: updatedSkills };
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            selectedSkillsError: '',
        }));

        handleCloseMenu();
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            selectedSkills: prev.selectedSkills.filter((item) => item.skill !== skillToRemove)
        }));
    };

    const HandleUpdateProfileData = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Start loading

        const newErrors = {
            descriptionError: !formData.description
                ? 'Description is required.'
                : /^\d+$/.test(formData.description)
                    ? 'The description cannot contain only numbers.'
                    : formData.description.length < 20
                        ? 'Your description must be at least 20 characters long.'
                        : '',
            selectedRoleError: !formData.selectedRole ? 'Your Role is required.' : '',
            selectedSpecializationError:
                formData.selectedSpecialization.length === 0 ? 'At least one specialization is required.' : '',
            selectedLanguagesError:
                formData.selectedLanguages.length === 0 ? 'At least one language is required.' : '',
            workAvailabilityError: !formData.workAvailability ? 'Work availability is required.' : '',
            selectedSkillsError: formData.selectedSkills.length === 0 ? 'At least one skill is required.' : '',
        };

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some((error) => error !== '');

        if (hasErrors) {
            setErrors(newErrors);
            setIsLoading(false);
            setErrorMessage('All Fields Are Required!');
            return;
        }

        // Sanitize form data
        const sanitizedFormData = {
            userId: user?._id,
            description: DOMPurify.sanitize(formData.description),
            selectedRole: DOMPurify.sanitize(formData.selectedRole),
            selectedSpecialization: formData.selectedSpecialization,
            selectedLanguages: formData.selectedLanguages,
            workAvailability: DOMPurify.sanitize(formData.workAvailability),
            selectedSkills: formData.selectedSkills,
        };

        // Introduce a 1.5-second delay before making the request
        setTimeout(async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/server/users/UserProfile`,
                    sanitizedFormData,
                    { withCredentials: true }
                );

                console.log('Response:', response);

                setErrors({});
                setErrorMessage('');
                setShowDefault(false);
                setShowSuccess(true);
            } catch (error) {
                console.error('Error:', error);

                if (error.response) {
                    console.error('Backend Error Response:', error.response.data);
                    setErrorMessage(error.response.data.message || 'Error saving profile');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    setErrorMessage('No response from the server. Please try again later.');
                } else {
                    console.error('Request setup error:', error.message);
                    setErrorMessage('An error occurred while setting up the request.');
                }
            } finally {
                setIsLoading(false); // Stop loading after request completion
            }
        }, 1500);
    };


    const [showDefault, setShowDefault] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <div className="CallDailog"

            style={{
                width: '75vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '150px',

                height: 'auto',
                padding: '15px',
                gap: '10px',
                zIndex: '1',
                position: 'relative',


            }}
        >
            <div className='Bg'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: '1px solid white',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: '-1',
                }}
            />
            <div className='ClosingIcon'
                onClick={handleShowProfileInfoClose}
                style={{
                    position: 'absolute',
                    right: currentLanguage === 'ar' ? '95.5%' : '2%',
                    top: '5%',
                    zIndex: '22222',
                    display: isSmallScreen ? 'none' : 'unset',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                <CloseIcon sx={{ fontSize: '20px' }} />
            </div>


            {showDefault && (
                <>
                    <div className="Div">
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                textAlign: 'center',
                            }}
                        >

                            {t('Lets Set Up Your Profile Information')}

                        </Typography>
                    </div>
                    <div className="Div">
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                textAlign: 'center',
                            }}
                        >

                            {t('this information will be visible to others whene visiting your profile')}

                        </Typography>
                    </div>
                    {errorMessage && (
                        <Typography
                            sx={{
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: errorMessage === "Your profile is already up-to-date. No changes detected." ? '#2df873' : '#ff4d4d',
                            }}
                        >
                            {t(errorMessage)}
                        </Typography>
                    )}
                    <div className="Inputs"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: '15px',

                        }}
                    >
                        {currentLanguage === 'ar' ? (
                            <>
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider theme={rtlTheme}>
                                        <div className="About">
                                            <TextField
                                                id="outlined-basic"
                                                label={t('أخبرنا عن نفسك...')}
                                                variant="outlined"
                                                value={formData.description}
                                                onChange={handleDescriptionChange}
                                                size="small"
                                                inputProps={{
                                                    maxLength: 215
                                                }}
                                                InputLabelProps={{
                                                    style: { color: '#FFFFFF' },
                                                    sx: {
                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                                    }
                                                }}
                                                InputProps={{
                                                    maxLength: 215,
                                                    style: {
                                                        color: '#FFFFFF',
                                                    },

                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.descriptionError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.descriptionError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.descriptionError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.descriptionError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        width: '100%',
                                                        fontSize: '15px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#FFFFFF',
                                                        '&.Mui-focused, &.MuiFormLabel-filled': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                            padding: '0 4px',
                                                        }
                                                    },
                                                }}
                                                className={errors.descriptionError ? 'shake' : ''}

                                            />
                                        </div>
                                    </ThemeProvider>
                                </CacheProvider>
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider theme={rtlTheme}>
                                        <div className="Roles"
                                            style={{
                                                display: 'flex',
                                                flexDirection: isSmallScreen ? 'column' : 'unset',
                                                gap: isSmallScreen ? '15px' : '5px',


                                            }}
                                        >
                                            <div className="Role"

                                            >
                                                <TextField
                                                    id="project-category"
                                                    label={t('دورك في العمل')}
                                                    variant="outlined"
                                                    size="small"
                                                    value={formData.selectedRole} // Bind the input value
                                                    onClick={handleClickProjectCatego}
                                                    InputProps={{
                                                        readOnly: true, // Make the input non-editable
                                                        style: { color: '#FFFFFF' },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handleClickProjectCatego} edge="end">
                                                                    {openProjectCat ? (
                                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                    ) : (
                                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    InputLabelProps={{
                                                        style: { color: '#FFFFFF' },
                                                        sx: {
                                                            fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        },
                                                    }}
                                                    sx={{
                                                        flex: 1,
                                                        width: '100%',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            '& fieldset': {
                                                                borderColor: errors.selectedRoleError ? '#ff4d4d' : '#FFFFFF',
                                                                borderWidth: errors.selectedRoleError ? '2px' : '1px',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: errors.selectedRoleError ? '#ff4d4d' : '#FFFFFF',
                                                                borderWidth: '2px',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: errors.selectedRoleError ? '#ff4d4d' : '#FFFFFF',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            width: '100%',
                                                            fontSize: '15px',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: '#FFFFFF',
                                                            '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                padding: '0 4px',
                                                            }
                                                        },
                                                    }}
                                                    className={errors.selectedRoleError ? 'shake' : ''}
                                                />
                                                <Menu
                                                    anchorEl={anchorElCatego}
                                                    open={openProjectCat}
                                                    onClose={() => handleCloseProjectCatego('')}
                                                    PaperProps={{
                                                        style: {
                                                            background: 'rgba(0, 0, 0, 0.8)',
                                                            width: isSmallScreen ? '67%' : '16%',
                                                            color: 'white',
                                                            borderRadius: '8px',
                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                            maxHeight: '120px',
                                                            overflowY: 'auto',




                                                        },
                                                    }}
                                                    sx={{

                                                    }}
                                                >
                                                    {Roles.map((role) => (
                                                        <MenuItem
                                                            key={role}
                                                            onClick={() => handleCloseProjectCatego(role)} // Pass the role as value
                                                            style={{
                                                                color: '#fff',
                                                                width: '100%',
                                                                justifyContent: 'flex-start',
                                                                padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                transition: 'transform 0.3s ease',
                                                            }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}   // Reset scale on mouse leave
                                                        >
                                                            {t(role)}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </div>
                                            <div className="RoleExp">
                                                <div className="Specialization">
                                                    <TextField
                                                        id="project-specialization"
                                                        label={t('التخصص (4 كحد أقصى)')}
                                                        variant="outlined"
                                                        size="small"
                                                        value={formData.selectedSpecialization.join(', ')} // Display selected values as text

                                                        onClick={handleClickSpecialization}

                                                        InputProps={{
                                                            readOnly: true,
                                                            style: { color: '#FFFFFF' },
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton onClick={handleClickSpecialization} edge="end" >
                                                                        {openSpecializationMenu ? (
                                                                            <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                        ) : (
                                                                            <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        InputLabelProps={{
                                                            style: { color: '#FFFFFF' },
                                                            sx: {
                                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            },
                                                        }}
                                                        sx={{
                                                            flex: 1,
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                '& fieldset': {
                                                                    borderColor: errors.selectedSpecializationError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: errors.selectedSpecializationError ? '2px' : '1px',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: errors.selectedSpecializationError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: '2px',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: errors.selectedSpecializationError ? '#ff4d4d' : '#FFFFFF',
                                                                    borderWidth: '2px',
                                                                },
                                                            },
                                                            '& .MuiOutlinedInput-input': {
                                                                width: '100%',
                                                                fontSize: '15px',
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: '#FFFFFF',
                                                                '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                    padding: '0 4px',
                                                                },
                                                            },
                                                        }}
                                                        className={errors.selectedSpecializationError ? 'shake' : ''}
                                                    />
                                                    <Menu
                                                        anchorEl={anchorElSpecialization}
                                                        open={openSpecializationMenu}
                                                        onClose={() => setOpenSpecializationMenu(false)}
                                                        PaperProps={{
                                                            style: {
                                                                background: 'rgba(0, 0, 0, 0.8)',
                                                                width: isSmallScreen ? '67%' : '16%',

                                                                color: 'white',
                                                                borderRadius: '8px',
                                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                                textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                                maxHeight: '120px',
                                                                overflowY: 'auto',
                                                            },
                                                        }}
                                                    >
                                                        {filteredSpecializations.map((specialization) => (
                                                            <MenuItem
                                                                key={specialization}
                                                                onClick={() => handleCloseSpecialization(specialization)}
                                                                selected={formData.selectedSpecialization.includes(specialization)}
                                                                style={{
                                                                    color: '#fff',
                                                                    width: '100%',
                                                                    justifyContent: 'flex-start',
                                                                    padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    display: 'flex',
                                                                    background: formData.selectedSpecialization.includes(specialization) ? '#4caf50' : 'transparent',
                                                                    textWrap: 'wrap',
                                                                    alignItems: 'center',
                                                                    transition: 'transform 0.3s ease',
                                                                }}
                                                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                            >
                                                                {t(specialization)}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </div>

                                            </div>
                                            <div className="Language">
                                                <TextField
                                                    id="freelancer-language"
                                                    label={t('اللغات (3 كحد أقصى)')}
                                                    variant="outlined"
                                                    size="small"
                                                    value={formData.selectedLanguages.join(', ')}
                                                    onClick={handleClickLanguage}
                                                    InputProps={{
                                                        readOnly: true,
                                                        style: { color: '#FFFFFF' },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handleClickLanguage} edge="end">
                                                                    {openLanguageMenu ? (
                                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                    ) : (
                                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    InputLabelProps={{
                                                        style: {
                                                            color: '#FFFFFF',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                        },
                                                    }}
                                                    sx={{
                                                        flex: 1,
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            '& fieldset': {
                                                                borderColor: errors.selectedLanguagesError ? '#ff4d4d' : '#FFFFFF',
                                                                borderWidth: errors.selectedLanguagesError ? '2px' : '1px',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: errors.selectedLanguagesError ? '#ff4d4d' : '#FFFFFF',
                                                                borderWidth: '2px',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: errors.selectedLanguagesError ? '#ff4d4d' : '#FFFFFF',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            width: '100%',
                                                            fontSize: '15px',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: '#FFFFFF',
                                                            '&.Mui-focused, &.MuiFormLabel-filled': {
                                                                backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                                padding: '0 4px',
                                                            }
                                                        },
                                                    }}
                                                    className={errors.selectedLanguagesError ? 'shake' : ''}
                                                />
                                                <Menu
                                                    anchorEl={anchorElLanguage}
                                                    open={openLanguageMenu}
                                                    onClose={() => setOpenLanguageMenu(false)}
                                                    PaperProps={{
                                                        style: {
                                                            background: 'rgba(0, 0, 0, 0.8)',
                                                            width: isSmallScreen ? '67%' : '16%',

                                                            color: 'white',
                                                            borderRadius: '8px',
                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                            maxHeight: '120px',
                                                            overflowY: 'auto',
                                                        },
                                                    }}
                                                >
                                                    {availableLanguages.map((language) => (
                                                        <MenuItem
                                                            key={language}
                                                            onClick={() => handleCloseLanguage(language)}
                                                            selected={formData.selectedLanguages.includes(language)}
                                                            style={{
                                                                color: '#fff',
                                                                background: formData.selectedLanguages.includes === language ? '#4caf50' : 'transparent',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                            }}
                                                        >
                                                            {t(language)}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </div>
                                            <div className="WorkAvailability">
                                                <TextField
                                                    id="work-availability"
                                                    label={t('أوقات العمل')}
                                                    variant="outlined"
                                                    size="small"
                                                    value={formData.workAvailability}
                                                    onClick={handleClickAvailability}
                                                    InputProps={{
                                                        readOnly: true,
                                                        style: { color: '#FFFFFF' },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handleClickAvailability} edge="end">
                                                                    {openAvailabilityMenu ? (
                                                                        <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                    ) : (
                                                                        <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    InputLabelProps={{
                                                        style: {
                                                            color: '#FFFFFF',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            '& fieldset': {
                                                                borderColor: errors.workAvailabilityError ? '#ff4d4d' : '#FFFFFF',
                                                                borderWidth: errors.workAvailabilityError ? '2px' : '1px',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: errors.workAvailabilityError ? '#ff4d4d' : '#FFFFFF',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: errors.workAvailabilityError ? '#ff4d4d' : '#FFFFFF',
                                                            },
                                                        },
                                                    }}
                                                    className={errors.workAvailabilityError ? 'shake' : ''}
                                                />
                                                <Menu
                                                    anchorEl={anchorElAvailability}
                                                    open={openAvailabilityMenu}

                                                    PaperProps={{
                                                        style: {
                                                            background: 'rgba(0, 0, 0, 0.8)',
                                                            width: isSmallScreen ? '67%' : '16%',

                                                            color: 'white',
                                                            borderRadius: '8px',
                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                            textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                            maxHeight: '120px',
                                                            overflowY: 'auto',
                                                        },
                                                    }}
                                                >
                                                    {availableWorkHours.map((option) => (
                                                        <MenuItem
                                                            key={option}
                                                            onClick={() => handleWorkAvailabilityChange(option)}


                                                            selected={formData.workAvailability === option}
                                                            style={{
                                                                color: '#fff',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                                background: formData.workAvailability === option ? '#4caf50' : 'transparent',
                                                            }}
                                                        >
                                                            {t(option)}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>


                                            </div>
                                        </div>
                                    </ThemeProvider>
                                </CacheProvider>
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider theme={rtlTheme}>
                                        <div className="Skills">
                                            <TextField
                                                id="skills-input"
                                                label={t('المهارات (6 كحد أقصى)')}
                                                variant="outlined"
                                                size="small"
                                                value={formData.selectedSkills.map(s => s.skill).join(', ')}
                                                onClick={handleClickSkills}
                                                InputProps={{
                                                    readOnly: true,
                                                    style: { color: '#FFFFFF' },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickSkills} edge="end">
                                                                {openSkillsMenu ? (
                                                                    <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                InputLabelProps={{
                                                    style: { color: '#FFFFFF' },
                                                    sx: {
                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    },
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.selectedSkillsError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.selectedSkillsError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.selectedSkillsError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.selectedSkillsError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        width: '100%',
                                                        fontSize: '15px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#FFFFFF',
                                                        '&.Mui-focused, &.MuiFormLabel-filled': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                            padding: '0 4px',
                                                        }
                                                    },
                                                }}
                                                className={errors.selectedSkillsError ? 'shake' : ''}
                                            />

                                            <Menu
                                                anchorEl={anchorElSkills}
                                                open={openSkillsMenu}
                                                onClose={() => setOpenSkillsMenu(false)}
                                                PaperProps={{
                                                    style: {
                                                        background: 'rgba(0, 0, 0, 0.8)',
                                                        width: anchorElSkills ? anchorElSkills.offsetWidth : 'auto',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                        maxHeight: '120px',
                                                        overflowY: 'auto',
                                                    },
                                                }}
                                            >
                                                {(roleSkillsMap[formData.selectedRole] || []).map((skill) => (
                                                    <MenuItem
                                                        key={skill}
                                                        onClick={() => handleSelectSkill(skill)}
                                                        selected={formData.selectedSkills.some(s => s.skill === skill)}
                                                        style={{
                                                            color: '#fff',
                                                            width: '100%',
                                                            justifyContent: 'flex-start',
                                                            padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            display: 'flex',
                                                            background: formData.selectedSkills.some(s => s.skill === skill) ? '#4caf50' : 'transparent',
                                                            alignItems: 'center',
                                                            transition: 'transform 0.3s ease',
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02 )')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                    >
                                                        {t(skill)}
                                                    </MenuItem>
                                                ))}
                                            </Menu>


                                            <div style={{ marginTop: '15px' }}>
                                                {formData.selectedSkills.map((s, index) => (
                                                    <div key={s.skill} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                                        <div style={{ flex: '0 0 25%', color: '#FFFFFF', fontSize: '15px' }}>

                                                            <Typography
                                                                sx={{
                                                                    color: "white",

                                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                                }}>
                                                                {s.skill}
                                                            </Typography>
                                                        </div>
                                                        <div style={{ flex: '1 1 auto' }}>
                                                            <Slider
                                                                value={s.percentage}
                                                                onChange={(e, newValue) => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        selectedSkills: prev.selectedSkills.map((item) =>
                                                                            item.skill === s.skill ? { ...item, percentage: newValue } : item
                                                                        ),
                                                                    }));
                                                                }}
                                                                step={10}
                                                                min={10}
                                                                max={100}
                                                                sx={{
                                                                    color: '#FFFFFF',
                                                                    '& .MuiSlider-thumb': {
                                                                        backgroundColor: '#FFFFFF',
                                                                    },
                                                                    '& .MuiSlider-track': {
                                                                        backgroundColor: '#FFFFFF',
                                                                    },
                                                                    '& .MuiSlider-rail': {
                                                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                        <div style={{ flex: '0 0 40px', textAlign: 'right', color: '#FFFFFF', fontSize: '15px' }}>

                                                            <Typography
                                                                sx={{
                                                                    color: "white",
                                                                    fontWeight: 'bold',
                                                                    fontFamily: '"Airbnbcereal", sans-serif',


                                                                }}>
                                                                {s.percentage}%
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </ThemeProvider>
                                </CacheProvider>
                            </>
                        ) : (
                            <>
                                <div className="About">
                                    <TextField
                                        id="outlined-basic"
                                        label={t('Tell us about yourself...')}
                                        variant="outlined"
                                        value={formData.description}
                                        onChange={handleDescriptionChange}
                                        size="small"
                                        inputProps={{
                                            maxLength: 215
                                        }}
                                        InputLabelProps={{
                                            style: { color: '#FFFFFF' },
                                            sx: {
                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" }
                                            }
                                        }}
                                        InputProps={{
                                            maxLength: 215,
                                            style: {
                                                color: '#FFFFFF',
                                            },

                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.descriptionError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.descriptionError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.descriptionError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.descriptionError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                width: '100%',
                                                fontSize: '15px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#FFFFFF',
                                                '&.Mui-focused, &.MuiFormLabel-filled': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                    padding: '0 4px',
                                                }
                                            },
                                        }}
                                        className={errors.descriptionError ? 'shake' : ''}

                                    />
                                </div>
                                <div className="Roles"
                                    style={{
                                        display: 'flex',
                                        width: isSmallScreen ? '100%' : 'unset',
                                        flexDirection: isSmallScreen ? 'column' : 'unset',
                                        gap: isSmallScreen ? '15px' : '5px',
                                    }}
                                >
                                    <div className="Role"

                                    >
                                        <TextField
                                            id="project-category"
                                            label={t('Your Role')}
                                            variant="outlined"
                                            size="small"
                                            value={formData.selectedRole} // Bind the input value
                                            onClick={handleClickProjectCatego}
                                            InputProps={{
                                                readOnly: true, // Make the input non-editable
                                                style: { color: '#FFFFFF' },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickProjectCatego} edge="end">
                                                            {openProjectCat ? (
                                                                <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                            ) : (
                                                                <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            InputLabelProps={{
                                                style: { color: '#FFFFFF' },
                                                sx: {
                                                    fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                },
                                            }}
                                            sx={{
                                                flex: 1,
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: errors.selectedRoleError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: errors.selectedRoleError ? '2px' : '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: errors.selectedRoleError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: errors.selectedRoleError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    width: '100%',
                                                    fontSize: '15px',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#FFFFFF',
                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                        padding: '0 4px',
                                                    }
                                                },
                                            }}
                                            className={errors.selectedRoleError ? 'shake' : ''}
                                        />
                                        <Menu
                                            anchorEl={anchorElCatego}
                                            open={openProjectCat}
                                            onClose={() => handleCloseProjectCatego('')}
                                            PaperProps={{
                                                style: {
                                                    background: 'rgba(0, 0, 0, 0.8)',
                                                    width: isSmallScreen ? '67%' : '16%',
                                                    color: 'white',
                                                    borderRadius: '8px',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                    textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                    maxHeight: '120px',
                                                    overflowY: 'auto',




                                                },
                                            }}
                                            sx={{

                                            }}
                                        >
                                            {Roles.map((role) => (
                                                <MenuItem
                                                    key={role}
                                                    onClick={() => handleCloseProjectCatego(role)} // Pass the role as value
                                                    style={{
                                                        color: '#fff',
                                                        width: '100%',
                                                        justifyContent: 'flex-start',
                                                        padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        transition: 'transform 0.3s ease',
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}   // Reset scale on mouse leave
                                                >
                                                    {t(role)}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                    <div className="RoleExp">
                                        <div className="Specialization">
                                            <TextField
                                                id="project-specialization"
                                                label={t('Specialization (max 4)')}
                                                variant="outlined"
                                                size="small"
                                                value={formData.selectedSpecialization.join(', ')} // Display selected values as text

                                                onClick={handleClickSpecialization}

                                                InputProps={{
                                                    readOnly: true,
                                                    style: { color: '#FFFFFF' },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickSpecialization} edge="end" >
                                                                {openSpecializationMenu ? (
                                                                    <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                InputLabelProps={{
                                                    style: { color: '#FFFFFF' },
                                                    sx: {
                                                        fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    },
                                                }}
                                                sx={{

                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.selectedSpecializationError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.selectedSpecializationError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.selectedSpecializationError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.selectedSpecializationError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        width: '100%',
                                                        fontSize: '15px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#FFFFFF',
                                                        '&.Mui-focused, &.MuiFormLabel-filled': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                            padding: '0 4px',
                                                        },
                                                    },
                                                }}
                                                className={errors.selectedSpecializationError ? 'shake' : ''}
                                            />
                                            <Menu
                                                anchorEl={anchorElSpecialization}
                                                open={openSpecializationMenu}
                                                onClose={() => setOpenSpecializationMenu(false)}
                                                PaperProps={{
                                                    style: {
                                                        background: 'rgba(0, 0, 0, 0.8)',
                                                        width: isSmallScreen ? '67%' : '16%',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                        maxHeight: '120px',
                                                        overflowY: 'auto',
                                                    },
                                                }}
                                            >
                                                {filteredSpecializations.map((specialization) => (
                                                    <MenuItem
                                                        key={specialization}
                                                        onClick={() => handleCloseSpecialization(specialization)}
                                                        selected={formData.selectedSpecialization.includes(specialization)}
                                                        style={{
                                                            color: '#fff',
                                                            width: '100%',
                                                            justifyContent: 'flex-start',
                                                            padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            display: 'flex',
                                                            background: formData.selectedSpecialization.includes(specialization) ? '#4caf50' : 'transparent',

                                                            alignItems: 'center',
                                                            transition: 'transform 0.3s ease',
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                    >
                                                        {t(specialization)}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>

                                    </div>
                                    <div className="Language">
                                        <TextField
                                            id="freelancer-language"
                                            label={t('Languages (max 3)')}
                                            variant="outlined"
                                            size="small"
                                            value={formData.selectedLanguages.join(', ')}
                                            onClick={handleClickLanguage}
                                            InputProps={{
                                                readOnly: true,
                                                style: { color: '#FFFFFF' },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickLanguage} edge="end">
                                                            {openLanguageMenu ? (
                                                                <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                            ) : (
                                                                <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            InputLabelProps={{
                                                style: { color: '#FFFFFF' },
                                            }}
                                            sx={{
                                                flex: 1,
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: errors.selectedLanguagesError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: errors.selectedLanguagesError ? '2px' : '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: errors.selectedLanguagesError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: errors.selectedLanguagesError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: '2px',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    width: '100%',
                                                    fontSize: '15px',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#FFFFFF',
                                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                        padding: '0 4px',
                                                    }
                                                },
                                            }}
                                            className={errors.selectedLanguagesError ? 'shake' : ''}
                                        />
                                        <Menu
                                            anchorEl={anchorElLanguage}
                                            open={openLanguageMenu}
                                            onClose={() => setOpenLanguageMenu(false)}
                                            PaperProps={{
                                                style: {
                                                    background: 'rgba(0, 0, 0, 0.8)',
                                                    width: isSmallScreen ? '67%' : '16%',
                                                    color: 'white',
                                                    borderRadius: '8px',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                    textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                    maxHeight: '120px',
                                                    overflowY: 'auto',
                                                },
                                            }}
                                        >
                                            {availableLanguages.map((language) => (
                                                <MenuItem
                                                    key={language}
                                                    onClick={() => handleCloseLanguage(language)}
                                                    selected={formData.selectedLanguages.includes(language)}
                                                    style={{
                                                        color: '#fff',
                                                        background: formData.selectedLanguages.includes === language ? '#4caf50' : 'transparent',
                                                    }}
                                                >
                                                    {t(language)}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                    <div className="WorkAvailability">
                                        <TextField
                                            id="work-availability"
                                            label={t('Availability')}
                                            variant="outlined"
                                            size="small"
                                            value={formData.workAvailability}
                                            onClick={handleClickAvailability}
                                            InputProps={{
                                                readOnly: true,
                                                style: { color: '#FFFFFF' },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickAvailability} edge="end">
                                                            {openAvailabilityMenu ? (
                                                                <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                            ) : (
                                                                <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            InputLabelProps={{
                                                style: { color: '#FFFFFF' },
                                            }}
                                            sx={{
                                                flex: 1,
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    '& fieldset': {
                                                        borderColor: errors.workAvailabilityError ? '#ff4d4d' : '#FFFFFF',
                                                        borderWidth: errors.workAvailabilityError ? '2px' : '1px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: errors.workAvailabilityError ? '#ff4d4d' : '#FFFFFF',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: errors.workAvailabilityError ? '#ff4d4d' : '#FFFFFF',
                                                    },
                                                },
                                            }}
                                            className={errors.workAvailabilityError ? 'shake' : ''}
                                        />
                                        <Menu
                                            anchorEl={anchorElAvailability}
                                            open={openAvailabilityMenu}

                                            PaperProps={{
                                                style: {
                                                    background: 'rgba(0, 0, 0, 0.8)',
                                                    width: isSmallScreen ? '67%' : '16%',
                                                    color: 'white',
                                                    borderRadius: '8px',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                    textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                    maxHeight: '120px',
                                                    overflowY: 'auto',
                                                },
                                            }}
                                        >
                                            {availableWorkHours.map((option) => (
                                                <MenuItem
                                                    key={option}
                                                    onClick={() => handleWorkAvailabilityChange(option)}


                                                    selected={formData.workAvailability === option}
                                                    style={{
                                                        color: '#fff',
                                                        background: formData.workAvailability === option ? '#4caf50' : 'transparent',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',

                                                    }}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu>


                                    </div>
                                </div>
                                <div className="Skills">
                                    <TextField
                                        id="skills-input"
                                        label={t('Skills (max 6)')}
                                        variant="outlined"
                                        size="small"
                                        value={formData.selectedSkills.map(s => s.skill).join(', ')}
                                        onClick={handleClickSkills}
                                        InputProps={{
                                            readOnly: true,
                                            style: { color: '#FFFFFF' },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickSkills} edge="end">
                                                        {openSkillsMenu ? (
                                                            <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                        ) : (
                                                            <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            style: { color: '#FFFFFF' },
                                            sx: {
                                                fontSize: currentLanguage === 'ar' ? '17px' : '16px',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            },
                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.selectedSkillsError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.selectedSkillsError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.selectedSkillsError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.selectedSkillsError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                width: '100%',
                                                fontSize: '15px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#FFFFFF',
                                                '&.Mui-focused, &.MuiFormLabel-filled': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                    padding: '0 4px',
                                                }
                                            },
                                        }}
                                        className={errors.selectedSkillsError ? 'shake' : ''}
                                    />

                                    <Menu
                                        anchorEl={anchorElSkills}
                                        open={openSkillsMenu}
                                        onClose={() => setOpenSkillsMenu(false)}
                                        PaperProps={{
                                            style: {
                                                background: 'rgba(0, 0, 0, 0.8)',
                                                width: anchorElSkills ? anchorElSkills.offsetWidth : 'auto',
                                                color: 'white',
                                                borderRadius: '8px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                maxHeight: '120px',
                                                overflowY: 'auto',
                                            },
                                        }}
                                    >
                                        {(roleSkillsMap[formData.selectedRole] || []).map((skill) => (
                                            <MenuItem
                                                key={skill}
                                                onClick={() => handleSelectSkill(skill)}
                                                selected={formData.selectedSkills.some(s => s.skill === skill)}
                                                style={{
                                                    color: '#fff',
                                                    width: '100%',
                                                    justifyContent: 'flex-start',
                                                    padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    display: 'flex',
                                                    background: formData.selectedSkills.some(s => s.skill === skill) ? '#4caf50' : 'transparent',
                                                    alignItems: 'center',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02 )')}
                                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                            >
                                                {skill}
                                            </MenuItem>
                                        ))}
                                    </Menu>


                                    <div style={{ marginTop: '15px' }}>
                                        {formData.selectedSkills.map((s, index) => (
                                            <div key={s.skill} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                                <div style={{ flex: '0 0 25%', color: '#FFFFFF', fontSize: '15px' }}>

                                                    <Typography
                                                        sx={{
                                                            color: "white",

                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                                                        }}>
                                                        {s.skill}
                                                    </Typography>
                                                </div>
                                                <div style={{ flex: '1 1 auto' }}>
                                                    <Slider
                                                        value={s.percentage}
                                                        onChange={(e, newValue) => {
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                selectedSkills: prev.selectedSkills.map((item) =>
                                                                    item.skill === s.skill ? { ...item, percentage: newValue } : item
                                                                ),
                                                            }));
                                                        }}
                                                        step={10}
                                                        min={10}
                                                        max={100}
                                                        sx={{
                                                            color: '#FFFFFF',
                                                            '& .MuiSlider-thumb': {
                                                                backgroundColor: '#FFFFFF',
                                                            },
                                                            '& .MuiSlider-track': {
                                                                backgroundColor: '#FFFFFF',
                                                            },
                                                            '& .MuiSlider-rail': {
                                                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                                            },
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ flex: '0 0 40px', textAlign: 'right', color: '#FFFFFF', fontSize: '15px' }}>

                                                    <Typography
                                                        sx={{
                                                            color: "white",
                                                            fontWeight: 'bold',
                                                            fontFamily: '"Airbnbcereal", sans-serif',


                                                        }}>
                                                        {s.percentage}%
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="SetUpProfile"
                            style={{
                                width: '100%',
                                marginTop: '-20px',
                            }}
                        >
                            <Button
                                onClick={HandleUpdateProfileData}
                                variant="outlined"
                                className="btn-grad"
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: '38px',
                                    color: 'white',
                                    opacity: isLoading ? '0.5' : '1',
                                    borderColor: 'none',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="lds-dual-ring" style={{ margin: 'auto' }}></div>

                                    </>
                                ) : (


                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {t('Set Your Profile Inforamtion')}
                                    </Typography>
                                )}

                            </Button>
                        </div>


                    </div>
                    <div className="Div"
                        style={{
                            width: '100%',
                            display: isSmallScreen ? 'flex' : 'unset',
                        }}
                    >
                        <Button
                            onClick={handleShowProfileInfoClose}
                            variant="outlined"
                            className="btn-grad"
                            sx={{
                                width: '100%',
                                position: 'relative',
                                cursor: 'pointer',
                                height: '38px',
                                marginTop: '5px',
                                color: 'white',
                                borderColor: 'none',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >


                            <Typography
                                sx={{
                                    color: 'white',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    fontSize: '13px',
                                }}
                            >
                                {t('Close')}
                            </Typography>


                        </Button>
                    </div>
                </>
            )}

            {showSuccess && (
                <>
                    <div className="Main slide-from-right"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div className="Lottie"
                            style={{
                                marginTop: '-30px',
                            }}
                        >
                            <Player
                                src={PaymentDone}
                                autoplay
                                style={{
                                    width: '280px',
                                    height: '160px'
                                }}
                            />
                        </div>
                        <div className="Div"
                            style={{
                                marginTop: '-20px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    textAlign: 'center',
                                }}
                            >

                                {t('Your profile information has been successfully updated!')}

                            </Typography>
                        </div>
                    </div>
                </>
            )}









        </div>
    );
}

export default ProfileFetchInfo;