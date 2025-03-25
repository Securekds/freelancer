import React, { useState, useEffect, useRef } from "react";
import i18n from 'i18next';
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { faCircleCheck, faCirclePlus, faHandshake, faArrowRightArrowLeft, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@mui/material/Menu';
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import MenuItem from '@mui/material/MenuItem';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useUser } from '../../Context/UserContext.jsx'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { CacheProvider } from '@emotion/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createCache from '@emotion/cache';
import Lottie from 'lottie-react';

import animationData from '../../assets/images/small-logos/CoverPhoto.json'

// Create RTL-specific cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// Define RTL theme
const rtlTheme = createTheme({
    direction: 'rtl',
});

function AddNewProject() {

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

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');

    const { user, setUser, isProfileUpdated, updateUserProfile } = useUser(); // Make sure you're getting both user and setUser



    const [openProjectCat, setOpenProjectCat] = useState(false);
    const [anchorElCatego, setAnchorElCatego] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(''); // To store the selected value
    const [openSubCatMenu, setOpenSubCatMenu] = useState(false);
    const [anchorElSubCat, setAnchorElSubCat] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    // Handle open for Category Menu
    const handleClickProjectCatego = (event) => {
        setAnchorElCatego(event.currentTarget); // Set the anchor for positioning the menu
        setOpenProjectCat(true); // Open the menu
    };
    // Handle Category Menu Close
    const handleCloseProjectCatego = (value) => {
        setSelectedCategory(value);
        setSelectedSubCategory(''); // Reset subcategory when category changes

        setFormData(prev => ({
            ...prev,
            selectedCategory: value,
            selectedSubCategory: '' // Clear subcategory
        }));

        setOpenProjectCat(false);
        setAnchorElCatego(null);

        setErrors(prev => ({
            ...prev,
            selectedCategoryError: !value,
            selectedSubCategoryError: false // Reset subcategory error
        }));

        setErrorMessage(value ? '' : 'Project Category is required.');
    };




    const categories = [
        'Programming',
        'Design',
        'Marketing',
        'Architecture',
        'Writing & Translation',
        'Finance & Accounting',
        'Customer Support',
        'Consulting & Advice',
    ];
    const subCategoriesMap = {
        Programming: [
            "Web Development",
            "App Development",
            "Database Development",
            "Software Engineering",
            "Website Design",
            "CSS Design",
            "Javascript Development",
            "PHP Development",
        ],
        Design: [
            "Graphic Design",
            "Photoshop",
            "Video Production",
            "Logo Design",
            "Video Montage",
            "Creative Design",
            "Design Idea",
            "Video Design",
        ],
        Marketing: [
            "E Marketing",
            "Marketing Management",
            "Marketing Social",
            "Marketing Plan",
            "Marketing SEO",
            "Marketing Internet",
        ],
        Architecture: [
            "Architecture Engineering",
            "Architecture Interior",
            "Architecture Design",
            "Architecture Idea",
            "Architecture 3D",
            "Architecture Plans",
        ],
        "Writing & Translation": [
            "Content Writing",
            "Writing Articles",
            "Content Edit",
            "Writing Reports",
            "Research Scientific",
            "Writing Online",
        ],
        "Finance & Accounting": [
            "Financial Accounting",
            "Financial Evaluation",
            "Financial Analysis",
            "Financial Management",
            "Tax Strategy",
            "Administrative Reports",
        ],
        "Customer Support": [
            "Customer Service",
            "Desk Support",
            "Live Chat Support",
            "Email Support",
            "Technical Support",
            "Social Media Support",
        ],
        "Consulting & Advice": [
            "Business Consulting",
            "Financial Consulting",
            "Marketing Consulting",
            "IT Consulting",
            "Human Resources Consulting",
            "Legal Consulting",
            "Environmental Consulting",
            "Health Consulting",
        ],
        // Add more categories here...
    };

    const skillsByCategory = {
        "Programming": [
            "HTML", "CSS", "JavaScript", "React", "Vue.js", "Node.js", "Express.js", "Angular", "SASS",
            "Bootstrap", "Tailwind CSS", "TypeScript", "jQuery", "GraphQL", "Redux", "Next.js", "Gatsby",
            "Flutter", "Swift", "Kotlin", "Objective-C", "Xcode", "Android Development", "iOS Development",
            "React Native", "App Development", "UI/UX Design", "API Development", "Web Design", "Cross-platform Development",
            "SEO", "Database Management", "Cloud Computing", "Web Accessibility", "Backend Development", "Frontend Development",
            "Mobile App Testing", "App Publishing", "Firebase", "Serverless Architecture", "DevOps"
        ],
        "Design": [
            "Photoshop", "Illustrator", "InDesign", "Figma", "Sketch", "CorelDRAW", "Adobe XD", "Canva", "UI/UX Design",
            "Branding", "Logo Design", "Wireframing", "Prototyping", "Digital Illustration", "Web Design", "Icon Design",
            "Packaging Design", "Typography", "Print Design", "Video Production", "3D Modeling", "Motion Graphics",
            "Animation", "Concept Art", "Print Layouts"
        ],
        "Marketing": [
            "SEO", "SEM", "Content Marketing", "PPC Campaigns", "Email Marketing", "Social Media Marketing", "Google Ads",
            "Facebook Ads", "Instagram Ads", "Affiliate Marketing", "Influencer Marketing", "Brand Strategy", "Digital Advertising",
            "Google Analytics", "Email Automation", "Marketing Strategy", "Lead Generation", "Market Research", "Sales Funnel Optimization",
            "E-commerce Marketing", "Conversion Rate Optimization", "Social Media Advertising", "Advertising Campaigns"
        ],
        "Architecture": [
            "AutoCAD", "Revit", "SketchUp", "3ds Max", "Building Design", "Structural Engineering", "Landscape Design",
            "Urban Planning", "BIM (Building Information Modeling)", "Construction Documentation", "Sustainable Design", "Building Codes",
            "3D Rendering", "Site Planning", "Interior Design", "Space Planning", "Civil Engineering", "Architectural Drafting",
            "Project Management", "Construction Supervision", "Structural Analysis"
        ],
        "Writing & Translation": [
            "Copywriting", "Blog Writing", "SEO Writing", "Proofreading", "Article Writing", "Product Descriptions",
            "Technical Writing", "Press Releases", "Creative Writing", "Scriptwriting", "Ghostwriting", "Social Media Content",
            "Storytelling", "Research Writing", "E-books", "Whitepapers", "Marketing Copy", "Social Media Posts", "Video Scripts"
        ],
        "Finance & Accounting": [
            "Accounting", "Financial Analysis", "Bookkeeping", "Tax Preparation", "Financial Modeling", "Audit", "Payroll Management",
            "Financial Reporting", "Budgeting", "Investment Analysis", "Corporate Finance", "Risk Management", "Cash Flow Management",
            "Forensic Accounting", "Mergers & Acquisitions", "Financial Forecasting", "Capital Budgeting", "Tax Compliance",
            "Financial Planning", "Cost Accounting", "QuickBooks", "Excel", "Xero"
        ],
        "Customer Support": [
            "Customer Service", "Call Center Management", "Help Desk Support", "Email Support", "Live Chat Support",
            "Technical Support", "Ticketing Systems", "CRM (Customer Relationship Management)", "Zendesk", "Customer Experience",
            "Customer Retention", "Product Knowledge", "Troubleshooting", "Customer Feedback", "Complaint Resolution", "Team Collaboration",
            "Escalation Management", "Support Documentation", "Remote Support"
        ],
        "Consulting & Advice": [
            "Business Strategy", "Management Consulting", "Market Research", "Business Development", "Financial Consulting",
            "Legal Consulting", "IT Consulting", "Human Resources Consulting", "Operations Consulting", "Sales Consulting",
            "Change Management", "Project Management", "Process Improvement", "Strategy Consulting", "Risk Management",
            "Branding", "Organizational Development", "Marketing Consulting", "Product Development", "Compliance Consulting"
        ]
    };



    // Handle Subcategory Menu Open
    const handleOpenSubCatMenu = (event) => {
        // Only open if a category is selected
        if (selectedCategory) {
            setAnchorElSubCat(event.currentTarget);
            setOpenSubCatMenu(true);
        } else {
            setErrorMessage('Please select a category first');
        }
    };

    // Handle Subcategory Menu Close
    const handleCloseSubCatMenu = (selectedSubCat) => {
        setSelectedSubCategory(selectedSubCat);

        setFormData(prevData => ({
            ...prevData,
            selectedSubCategory: selectedSubCat || ''
        }));

        // Validate subcategory
        if (!selectedSubCat) {
            setErrors(prevErrors => ({
                ...prevErrors,
                selectedSubCategoryError: true
            }));
            setErrorMessage('Subcategory selection is required.');
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                selectedSubCategoryError: false
            }));
            setErrorMessage('');
        }

        // Close the menu
        setOpenSubCatMenu(false);
        setAnchorElSubCat(null);
    };





    const budgetRanges = [
        "5 - 10 $",
        "10 - 20 $",
        "20 - 50 $",
        "50 - 100 $",
        "100 - 200 $",
        "200 - 500 $",
        "500 - 1,000 $",
        "1,000 - 2,000 $",
        "2,000 - 5,000 $",
        "5,000 - 10,000 $",
        "10,000 - 20,000 $",
        "20,000 - 30,000 $"
    ];

    const [openBudget, setOpenBudget] = useState(false);
    const [anchorElBudget, setAnchorElBudget] = useState(null);
    const [selectedBudget, setSelectedBudget] = useState('');

    // Handle open/close for Budget Menu
    const handleClickBudget = (event) => {
        setAnchorElBudget(event.currentTarget);
        setOpenBudget(true);
    };

    const handleCloseBudget = (value) => {
        setSelectedBudget(value);


        setFormData(prev => ({
            ...prev,
            selectedBudget: value,

        }));

        setOpenBudget(false);
        setAnchorElBudget(null);

        setErrors(prev => ({
            ...prev,
            selectedBudgetError: !value,

        }));

        setErrorMessage(value ? '' : 'Project Budget is required.');
    };


    const [selectedTime, setSelectedTime] = useState('');
    const [openTimeMenu, setOpenTimeMenu] = useState(false);
    const [anchorElTime, setAnchorElTime] = useState(null); // Anchor for the menu

    const getArabicDayLabel = (day) => {
        if (day === 1) return "يوم"; // 1 يوم
        if (day === 2) return "يوم"; // 2 يوم
        if (day >= 3 && day <= 10) return "أيام"; // 3-10 أيام
        if (day >= 11) return "يوم"; // 11+ يوم
        return "يوم"; // Default fallback
    };

    const DaysRange = Array.from({ length: 90 }, (_, i) => i + 1);

    // Handle opening the dropdown menu
    const handleOpenTimeMenu = (event) => {
        setAnchorElTime(event.currentTarget);
        setOpenTimeMenu(true);
    };

    // Handle closing the dropdown menu
    const handleCloseTimeMenu = (value) => {
        const formattedValue = `${value} ${currentLanguage === 'ar' ? 'يوم' : 'days'}`;

        setSelectedTime(formattedValue); // Set formatted time for display

        setFormData(prev => ({
            ...prev,
            selectedTime: formattedValue, // Store the formatted time with unit for submission
        }));

        setOpenTimeMenu(false);
        setAnchorElTime(null);

        // Handle error state
        setErrors(prev => ({
            ...prev,
            selectedTimeError: !value,
        }));

        setErrorMessage(value ? '' : 'Project Time is required.');
    };





    const [anchorElSkills, setAnchorElSkills] = useState(null);
    const [openSkills, setOpenSkills] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleClickSkills = (event) => {
        setAnchorElSkills(event.currentTarget);
        setOpenSkills(true);
    };

    const handleCloseSkills = () => {
        console.log('Selected Skills:', selectedSkills); // Debug: check selected skills

        // Close the skills menu
        setOpenSkills(false);
        setAnchorElSkills(null);

        setFormData(prev => {
            console.log('Previous Form Data:', prev); // Debug: check previous form data
            return {
                ...prev,
                selectedSkills: selectedSkills,
            };
        });
        console.log('Form Data after update:', formData.selectedSkills); // Debug: verify skills in form data


        // Handle error state
        setErrors(prev => ({
            ...prev,
            selectedSkillsError: selectedSkills.length === 0, // Show error if no skills selected
        }));

        // Set error message if required
        setErrorMessage(selectedSkills.length === 0 ? 'Project Skills are required.' : '');
    };

    const getColorForSkill = (index) => {
        return colors[index % colors.length];
    };

    const colors = [
        { backgroundColor: "#4f1941", color: "#c22884" },
        { backgroundColor: "#2a5471", color: "#5bc1fd" },
        { backgroundColor: "#3d2d6f", color: "#8b5cf6" },
        { backgroundColor: "#1ba198", color: "#26eec3" },
        { backgroundColor: "#48233c", color: "#f85a9d" },
        { backgroundColor: "#244d4f", color: "#2dffc8" },
        { backgroundColor: "#362b55", color: "#9c72ff" },
        { backgroundColor: "#1d5a77", color: "#72d8ff" },
    ];


    const [formData, setFormData] = useState({
        projectTitle: '',         // For storing the project title
        projectDescription: '',   // For storing the project description
        selectedCategory: '',     // For storing the selected category
        selectedSubCategory: '',  // For storing the selected subcategory
        selectedBudget: '',       // For storing the selected budget
        selectedTime: '',         // For storing the selected time
        selectedSkills: [],       // For storing the selected skills
        uploadedPhotos: [],       // For storing uploaded photo URLs
        ProjectLink1: '',
        ProjectLink2: '',
        ProjectLink3: '',
    });

    const [errors, setErrors] = useState({
        projectTitleError: '',       // Error message for project title
        projectDescriptionError: '', // Error message for project description
        selectedCategoryError: '',   // Error message for category selection
        selectedSubCategoryError: '', // Error message for subcategory selection
        selectedBudgetError: '',     // Error message for budget selection
        selectedTimeError: '',       // Error message for time selection
        selectedSkillsError: '',     // Error message for skills selection
        ProjectLink1Error: '',
        ProjectLink2Error: '',
        ProjectLink3Error: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage1, setErrorMessage1] = useState('');

    const handleProjectTitleChange = (e) => {
        const value = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            projectTitle: value,
        }));

        // Validate the project title
        if (!value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                projectTitleError: true, // Indicate an error for styling
            }));
            setErrorMessage('Project title is required. Please provide a title for your project.');
        } else if (value.length < 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                projectTitleError: true,
            }));
            setErrorMessage('Project title must be at least 5 characters long. Provide a more descriptive title.');
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                projectTitleError: false,
            }));
            setErrorMessage(''); // Clear the error message when input is valid
        }
    };

    const handleProjectDescriptionChange = (e) => {
        const value = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            projectDescription: value, // Update the projectDescription field
        }));

        // Validate the project description
        if (!value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                projectDescriptionError: true, // Indicate an error for styling
            }));
            setErrorMessage('Project description is required. Please provide a description for your project.');
        } else if (value.length < 20) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                projectDescriptionError: true,
            }));
            setErrorMessage('Project description must be at least 20 characters long. Provide more details about your project.');
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                projectDescriptionError: false,
            }));
            setErrorMessage(''); // Clear the error message when input is valid
        }
    };

    const [dragging, setDragging] = useState(false);
    const [images, setImages] = useState([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [imageSize, setImageSize] = useState('0');
    const fileInputRef = useRef(null);
      const [isLoading, setIsLoading] = useState(false);
    
    const [isUploading, setIsUploading] = useState(false);

    const handleClick = () => {
        if (fileInputRef.current && images.length < 4) {
            fileInputRef.current.click();
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        handleFileUpload(event.dataTransfer.files[0]);
    };

    const handleFileSelect = (event) => {
        handleFileUpload(event.target.files[0]);
    };

    const handleFileUpload = (file) => {
        if (file && file.type.startsWith('image/') && images.length < 4) {
            const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            const newImage = {
                preview: URL.createObjectURL(file),
                name: file.name,
                size: fileSizeInMB,
                file: file  // Add the actual file object here
            };

            // Update images array
            const updatedImages = images.length === 4
                ? [...images.slice(0, -1), newImage]  // Replace last image if already 4
                : [...images, newImage];

            setImages(updatedImages);

            // Update formData with image URLs or files
            setFormData(prev => ({
                ...prev,
                uploadedPhotos: updatedImages.map(img => img.file) // Store actual file objects
            }));

            // Update total image size
            const newTotalSize = parseFloat(
                (parseFloat(imageSize) + parseFloat(fileSizeInMB)).toFixed(2)
            );
            setImageSize(newTotalSize.toString());

            // Simulate upload progress
            simulateUpload();
        }
    };

    const removeImage = () => {
        setImages([]);
        setLoadingProgress(0);
        setImageSize('0');

        // Clear uploadedPhotos in formData
        setFormData(prev => ({
            ...prev,
            uploadedPhotos: []
        }));

    };

    // Simulate upload progress (Remove actual upload logic)
    const simulateUpload = () => {
        setIsUploading(true);
        setLoadingProgress(0);

        // Simulate a progress bar animation with intervals
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev < 100) {
                    return prev + 10;
                } else {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
            });
        }, 500); // Progress increments every 500ms
    };

    const handleProjectLink1Change = (e) => {
        const value = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            ProjectLink1: value,
        }));

        // Validate the link format
        const linkRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/; // Basic URL validation
        if (value && !linkRegex.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ProjectLink1Error: true,
            }));
            setErrorMessage1('Invalid link format. Please provide a valid URL.');
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ProjectLink1Error: false,
            }));
            setErrorMessage1('');
        }
    };

    const handleProjectLink2Change = (e) => {
        const value = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            ProjectLink2: value,
        }));

        // Validate the link format
        const linkRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/; // Basic URL validation
        if (value && !linkRegex.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ProjectLink2Error: true,
            }));
            setErrorMessage1('Invalid link format. Please provide a valid URL.');
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ProjectLink2Error: false,
            }));
            setErrorMessage1('');
        }
    };

    const handleProjectLink3Change = (e) => {
        const value = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            ProjectLink3: value,
        }));

        // Validate the link format
        const linkRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/; // Basic URL validation
        if (value && !linkRegex.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ProjectLink3Error: true,
            }));
            setErrorMessage1('Invalid link format. Please provide a valid URL.');
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ProjectLink3Error: false,
            }));
            setErrorMessage1('');
        }
    };

    const handleNewGig = async () => {
        let isValid = true;
        let newErrors = { ...errors };
        setIsLoading(true); // Start loading
      
        try {
          // Retrieve userId from user context
          const userId = user ? user._id : null;
          if (!userId) {
            setErrorMessage("User ID is missing. Please try again.");
            setIsLoading(false);
            return;
          }
      
          // Sanitize inputs using DOMPurify
          const sanitizedProjectTitle = DOMPurify.sanitize(formData.projectTitle.trim());
          const sanitizedProjectDescription = DOMPurify.sanitize(formData.projectDescription.trim());
          const sanitizedSelectedCategory = DOMPurify.sanitize(formData.selectedCategory.trim());
          const sanitizedSelectedSubCategory = DOMPurify.sanitize(formData.selectedSubCategory.trim());
          const sanitizedSelectedBudget = DOMPurify.sanitize(formData.selectedBudget.trim());
          const sanitizedSelectedTime = DOMPurify.sanitize(formData.selectedTime);
      
          // Validate required fields
          if (!sanitizedProjectTitle) {
            setErrorMessage('All fields are required.');
            newErrors.projectTitleError = true;
            isValid = false;
          } else {
            newErrors.projectTitleError = false;
          }
      
          if (!sanitizedProjectDescription) {
            setErrorMessage('All fields are required.');
            newErrors.projectDescriptionError = true;
            isValid = false;
          } else if (sanitizedProjectDescription.length < 20) {
            setErrorMessage('Project description must be at least 20 characters long. Provide more details about your project.');
            newErrors.projectDescriptionError = true;
            isValid = false;
          } else {
            newErrors.projectDescriptionError = false;
          }
      
          if (!sanitizedSelectedCategory) {
            setErrorMessage('All fields are required.');
            newErrors.selectedCategoryError = true;
            isValid = false;
          } else {
            newErrors.selectedCategoryError = false;
          }
      
          if (!sanitizedSelectedSubCategory) {
            setErrorMessage('All fields are required.');
            newErrors.selectedSubCategoryError = true;
            isValid = false;
          } else {
            newErrors.selectedSubCategoryError = false;
          }
      
          if (!sanitizedSelectedBudget) {
            setErrorMessage('All fields are required.');
            newErrors.selectedBudgetError = true;
            isValid = false;
          } else {
            newErrors.selectedBudgetError = false;
          }
      
          if (!sanitizedSelectedTime && sanitizedSelectedTime !== 0) {
            setErrorMessage('All fields are required.');
            newErrors.selectedTimeError = true;
            isValid = false;
          } else {
            newErrors.selectedTimeError = false;
          }
      
          if (formData.selectedSkills.length === 0) {
            setErrorMessage('All fields are required.');
            newErrors.selectedSkillsError = true;
            isValid = false;
          } else {
            newErrors.selectedSkillsError = false;
          }
      
          // Optional project links validation
          const linkRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
          const projectLinks = [
            formData.ProjectLink1,
            formData.ProjectLink2,
            formData.ProjectLink3
          ];
      
          projectLinks.forEach((link, index) => {
            if (link && !linkRegex.test(link)) {
              setErrorMessage1(`Invalid link format for Link ${index + 1}.`);
              newErrors[`ProjectLink${index + 1}Error`] = true;
              isValid = false;
            } else {
              newErrors[`ProjectLink${index + 1}Error`] = false;
            }
          });
      
          // Set errors for the inputs
          setErrors(newErrors);
      
          if (!isValid) {
            setIsLoading(false); // Stop loading if validation fails
            return;
          }
      
          // Prepare project links array (filter out empty links)
          const validProjectLinks = projectLinks.filter(link => link && link.trim() !== '');
      
          // Create FormData to send files and other data
          const formDataToSend = new FormData();
      
          // Append all text fields
          formDataToSend.append('projectTitle', sanitizedProjectTitle);
          formDataToSend.append('projectDescription', sanitizedProjectDescription);
          formDataToSend.append('selectedCategory', sanitizedSelectedCategory);
          formDataToSend.append('selectedSubCategory', sanitizedSelectedSubCategory);
          formDataToSend.append('selectedBudget', sanitizedSelectedBudget);
          formDataToSend.append('selectedTime', sanitizedSelectedTime);
          formDataToSend.append('userId', userId);
      
          // Append skills as JSON
          formDataToSend.append('selectedSkills', JSON.stringify(formData.selectedSkills));
      
          // Append project links as JSON
          formDataToSend.append('projectLinks', JSON.stringify(validProjectLinks));
      
          // Append files
          formData.uploadedPhotos.forEach((file) => {
            formDataToSend.append('uploadedPhotos', file);
          });
      
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/server/gigs/new-gig`,
            formDataToSend,
            {
              withCredentials: true,
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          );
      
          console.log("Gig created successfully:", response.data);
      
          // Show success toast
          toast('🎉 Project created successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      
          // Optional: Reset form or redirect
          // resetForm();
          // navigate('/dashboard');
      
        } catch (error) {
          console.error("Error creating gig:", error.response ? error.response.data : error.message);
          setErrorMessage("Failed to create gig. Please try again.");
      
          // Show error toast
          toast.error('Failed to create project. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } finally {
          setIsLoading(false); // Stop loading regardless of success or failure
        }
      };
   
 



    return (
        <div className="slide-from-right"
            style={{
                width: '96%',
                height: 'auto',
                marginTop: '50px',
                borderRadius: "0.75rem",
                backgroundClip: "border-box",
                border: "0 solid rgba(0, 0, 0, 0.125)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                gap: '20px',
                position: 'relative',
                zIndex: 1,
            }}
        >
            <img
                src="https://res.cloudinary.com/damicjacf/image/upload/v1718818159/style-16_cfxfnv.svg"
                alt="Background SVG"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.1,
                    zIndex: 0,
                }}
            />
            <div className="WelcomeTypo"
                style={{
                    display: ' flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 'bold',
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                    }}>
                    {t('Hello')} {user?.firstName} !
                </Typography>
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: currentLanguage === 'ar' ? '28px' : "unset",
                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                    }}>
                    {t('Welcome to the section where you can seamlessly add your project requirements. Let us help you connect with top talent and bring your ideas to life.')}
                </Typography>
            </div>
            <div className="Steps"
                style={{
                    height: 'auto',
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backgroundClip: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '34px',
                    paddingBottom: '15px',
                    padding: '20px',
                    position: 'relative',

                }}
            >


                <div className="StausTypo"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    <Typography
                        style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontFamily:
                                currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Instructions')}
                    </Typography>
                    <Typography
                        style={{
                            color: '#ffffff',
                            marginTop: '-5px',
                            opacity: '0.8',

                            fontFamily:
                                currentLanguage === 'ar'
                                    ? '"Droid Arabic Kufi", serif'
                                    : '"Airbnbcereal", sans-serif',

                        }}
                    >
                        {t('Steps')}
                    </Typography>
                </div>
                <div className="StepsInstroctions"
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: '20px',
                        marginTop: '-10px'
                    }}
                >
                    <div className="SideStep"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px',
                            paddingTop: '10px' // Align with first step content
                        }}
                    >
                        {[0, 1, 2, 3].map((_, index) => (
                            <React.Fragment key={index}>
                                <div className="StepCircle"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid white',
                                        borderRadius: '50px',
                                        marginBottom: index === 3 ? 0 : '5px',
                                        display: 'flex', // Center the text inside the circle
                                        justifyContent: 'center', // Align the text horizontally
                                        alignItems: 'center', // Align the text vertically
                                        boxShadow: 'rgba(33, 150, 243, 0.9) 0px 0px 90px', // Glow effect
                                        textShadow: 'rgb(33, 150, 243) 0px 0px 90px', // Smooth transition for the glow effect
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            fontSize: '18px', // Adjust size as needed
                                        }}
                                    >
                                        {index + 1}
                                    </Typography>
                                </div>
                                {index < 3 && (
                                    <div className="DividerLine"
                                        style={{
                                            width: '1px',
                                            height: '23px', // Adjusted to match step container height
                                            opacity: '0.7',
                                            background: 'white',
                                            marginBottom: '5px'
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="StepsContainer"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        {[
                            {
                                icon: faCirclePlus,
                                bgColor: "#4f1941",
                                iconColor: "#c22884",
                                text: t('Post your project with clear details to ensure sellers fully understand your requirements.')
                            },
                            {
                                icon: faComment,
                                bgColor: "#2a5471",
                                iconColor: "#5bc1fd",
                                text: t('Review and evaluate offers from sellers to choose the best match for your project needs.')
                            },
                            {
                                icon: faHandshake,
                                bgColor: "#3d2d6f",
                                iconColor: "#8b5cf6",
                                text: t('Communicate with the selected seller to finalize project details and initiate the process.')
                            },
                            {
                                icon: faArrowRightArrowLeft,
                                bgColor: "#1ba198",
                                iconColor: "#26eec3",
                                text: t('Complete the payment and exchange the project upon successful delivery and approval.')
                            }
                        ].map((step, index) => (
                            <div key={index} className={`CssGlass Step${index + 1}`}
                                style={{
                                    display: 'flex',
                                    width: isSmallScreen ? '100%' : '100%',
                                    gap: '10px',
                                    padding: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    margin: '0 auto'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <div className="IconContainer"
                                        style={{
                                            backgroundColor: step.bgColor,
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={step.icon}
                                            style={{
                                                fontSize: '23px',
                                                color: step.iconColor,
                                                transform: 'rotate(0deg)'
                                            }}
                                        />
                                    </div>
                                    <div className="TYpo">
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                lineHeight: '20px',
                                                fontSize: '15px',
                                                textWrap: 'nowrap',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif'
                                            }}
                                        >
                                            {step.text}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
            <div className="Inputs"
                style={{
                    height: 'auto',
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backgroundClip: 'border-box',
                    display: 'flex',
                    padding: '20px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <div className="LetStartTypo">
                    <Typography
                        sx={{
                            color: "white",
                            fontWeight: 'bold',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',


                        }}>
                        {t('Lets Start')}
                    </Typography>
                </div>
                {errorMessage && (
                    <Typography
                        sx={{
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            fontWeight: 'bold',
                            color: errorMessage === "Your profile is already up-to-date. No changes detected." ? '#2df873' : '#ff4d4d',
                        }}
                    >
                        {t(errorMessage)}
                    </Typography>
                )}

                {currentLanguage === 'ar' ? (
                    <>


                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={rtlTheme}>
                                <div className="ProjectTitelInput"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label={t('عنوان المشروع')}
                                        variant="outlined"
                                        value={formData.projectTitle}
                                        onChange={handleProjectTitleChange}
                                        size="small"
                                        inputProps={{
                                            maxLength: 500 // Add this line
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
                                            maxLength: 70,
                                            style: {
                                                color: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {errors.projectTitleError && (
                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.projectTitleError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.projectTitleError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.projectTitleError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.projectTitleError ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.projectTitleError ? 'shake' : ''}
                                    />
                                </div>
                            </ThemeProvider>
                        </CacheProvider>
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={rtlTheme}>

                                <div className="ProjectDescription"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label={t('Project description')}
                                        onChange={handleProjectDescriptionChange}
                                        variant="outlined"
                                        size="small"
                                        inputProps={{

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

                                            style: {
                                                color: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {errors.projectDescriptionError && (
                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.projectDescriptionError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.projectDescriptionError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.projectDescriptionError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.projectDescriptionError ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.projectDescriptionError ? 'shake' : ''}
                                        multiline // Enable multi-line input
                                    />
                                </div>
                            </ThemeProvider>
                        </CacheProvider>
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={rtlTheme}>
                                <div className="ProjectDetails"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                                        <div className="ProjectCatego">
                                            <TextField
                                                id="project-category"
                                                label={t('فئة المشروع')}
                                                variant="outlined"
                                                size="small"
                                                value={selectedCategory} // Bind the input value
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
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.selectedCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.selectedCategoryError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.selectedCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.selectedCategoryError ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.selectedCategoryError ? 'shake' : ''}
                                            />
                                            <Menu
                                                anchorEl={anchorElCatego}
                                                open={openProjectCat}
                                                onClose={() => handleCloseProjectCatego('')}
                                                PaperProps={{
                                                    style: {
                                                        background: 'rgba(0, 0, 0, 0.8)',
                                                        width: '17%',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        border: '1px solid white',
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line
                                                        maxHeight: '120px', // Set max height for the menu
                                                        overflowY: 'auto', // Enable vertical scrolling if content overflows
                                                    },
                                                }}
                                            >
                                                {categories.map((category, index) => {
                                                    const images = [
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1727102241/website-codes_rg69kw.png',
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1727103377/graphic-design_w6yumh.png',
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1727109604/content-marketing_yqzb70.png',
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1727110167/engineering_nspbwi.png',
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1727109955/blog_alyug6.png',
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1737575212/profit_18250005_u14ksb.png',
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1727116243/technical-support_wimost.png',
                                                        'https://res.cloudinary.com/damicjacf/image/upload/v1727116597/attorney_vdkfwu.png',
                                                    ];

                                                    return (
                                                        <MenuItem
                                                            key={category}
                                                            onClick={() => handleCloseProjectCatego(category)} // Pass the category as value
                                                            style={{
                                                                color: '#fff',
                                                                width: '100%',
                                                                justifyContent: 'flex-start',
                                                                padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                display: 'flex', // Set flex display
                                                                alignItems: 'center', // Align items vertically
                                                                gap: '8px', // Add gap between image and text
                                                                transition: 'transform 0.3s ease',
                                                            }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}   // Reset scale on mouse leave
                                                        >
                                                            <img
                                                                src={images[index]}
                                                                alt={category}
                                                                style={{
                                                                    width: '20px', // Set image width
                                                                    height: '20px', // Set image height
                                                                    borderRadius: '4px', // Add slight rounding for better design
                                                                }}
                                                            />
                                                            {t(category)}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Menu>

                                        </div>


                                        <div className="ProjectSubCat">
                                            <TextField
                                                id="project-subcategory"
                                                label={t("الفئة الفرعية للمشروع")}
                                                variant="outlined"
                                                size="small"
                                                value={selectedSubCategory}
                                                onClick={handleOpenSubCatMenu}
                                                inputProps={{
                                                    maxLength: 70,
                                                    readOnly: true, // Prevent manual typing
                                                }}
                                                InputLabelProps={{
                                                    style: { color: "#FFFFFF" },
                                                    sx: {
                                                        fontSize: currentLanguage === "ar" ? "17px" : "16px",
                                                        fontFamily:
                                                            currentLanguage === "ar"
                                                                ? '"Droid Arabic Kufi", serif'
                                                                : '"Airbnbcereal", sans-serif',
                                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" },
                                                    },
                                                }}
                                                InputProps={{
                                                    maxLength: 70,
                                                    style: {
                                                        color: "#FFFFFF",
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleOpenSubCatMenu} edge="end">
                                                                {openSubCatMenu ? (
                                                                    <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.selectedSubCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.selectedSubCategoryError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.selectedSubCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.selectedSubCategoryError ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.selectedSubCategoryError ? 'shake' : ''}
                                            />
                                            <Menu
                                                anchorEl={anchorElSubCat}
                                                open={openSubCatMenu}
                                                onClose={() => handleCloseSubCatMenu("")}
                                                PaperProps={{
                                                    style: {
                                                        background: "rgba(0, 0, 0, 0.8)",
                                                        width: '17%',
                                                        color: "white",
                                                        border: '1px solid white',
                                                        borderRadius: "8px",
                                                        maxHeight: "120px", // Set max height for the menu
                                                        overflowY: "auto", // Enable scrolling
                                                    },
                                                }}
                                            >
                                                {selectedCategory && subCategoriesMap[selectedCategory]?.map(subCat => (
                                                    <MenuItem
                                                        key={subCat}
                                                        onClick={() => handleCloseSubCatMenu(subCat)}
                                                        style={{
                                                            color: "#fff",
                                                            width: "100%",
                                                            padding: "8px 16px",
                                                            fontFamily:
                                                                currentLanguage === "ar"
                                                                    ? '"Droid Arabic Kufi", serif'
                                                                    : '"Airbnbcereal", sans-serif',
                                                        }}
                                                        onMouseEnter={(e) =>
                                                            (e.currentTarget.style.transform = "scale(1.05)")
                                                        }
                                                        onMouseLeave={(e) =>
                                                            (e.currentTarget.style.transform = "scale(1)")
                                                        }
                                                    >
                                                        {t(subCat)}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>
                                        <div className="ProjectBudget">
                                            <TextField
                                                id="project-budget"
                                                label={t('Project Budget')}
                                                variant="outlined"
                                                size="small"
                                                value={selectedBudget} // Bind the input value
                                                onClick={handleClickBudget} // Open the menu when clicked
                                                InputProps={{
                                                    readOnly: true, // Make the input non-editable
                                                    style: { color: '#FFFFFF' },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickBudget} edge="end">
                                                                {openBudget ? (
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
                                                            borderColor: errors.selectedBudgetError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.selectedBudgetError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.selectedBudgetError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.selectedBudgetError ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.selectedBudgetError ? 'shake' : ''}
                                            />

                                            <Menu
                                                anchorEl={anchorElBudget}
                                                open={openBudget}
                                                onClose={() => handleCloseBudget('')}
                                                PaperProps={{
                                                    style: {
                                                        background: 'rgba(0, 0, 0, 0.8)',
                                                        width: '17%',
                                                        color: 'white',
                                                        border: '1px solid white',
                                                        borderRadius: '8px',
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                        maxHeight: '120px',
                                                        overflowY: 'auto',
                                                    },
                                                }}
                                                MenuListProps={{
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        padding: 0,
                                                    },
                                                }}
                                            >
                                                {budgetRanges.map((range) => (
                                                    <MenuItem
                                                        key={range}
                                                        onClick={() => handleCloseBudget(range)} // Pass the range as value
                                                        style={{
                                                            color: '#fff',
                                                            width: '100%',
                                                            fontFamily: '"Airbnbcereal", sans-serif',
                                                            padding: '8px 16px',
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                    >
                                                        {range}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>
                                        <div className="ProjectTime">
                                            <TextField
                                                id="project-time"
                                                label="زمن التنفيذ"
                                                variant="outlined"
                                                size="small"
                                                value={selectedTime}
                                                onClick={handleOpenTimeMenu}
                                                inputProps={{
                                                    maxLength: 70
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
                                                    maxLength: 70,
                                                    style: {
                                                        color: '#FFFFFF',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleOpenTimeMenu} edge="end">
                                                                {openTimeMenu ? (
                                                                    <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.selectedTimeError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.selectedTimeError ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.selectedTimeError ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.selectedTimeError ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.selectedTimeError ? 'shake' : ''}
                                            />

                                            <Menu
                                                anchorEl={anchorElTime}
                                                open={openTimeMenu}
                                                onClose={() => handleCloseTimeMenu('')}
                                                PaperProps={{
                                                    style: {
                                                        background: 'rgba(0, 0, 0, 0.8)',
                                                        width: '17%',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        border: '1px solid white',
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                        maxHeight: '120px',
                                                        overflowY: 'auto',
                                                    },
                                                }}
                                                MenuListProps={{
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        padding: 0
                                                    }
                                                }}
                                            >
                                                {DaysRange.map((day) => (
                                                    <MenuItem
                                                        key={day}
                                                        onClick={() => handleCloseTimeMenu(day)} // Set selected time
                                                        style={{
                                                            color: '#fff',
                                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            padding: '8px 16px',
                                                            width: '100%'
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset scale on mouse leave
                                                    >
                                                        <span
                                                            style={{
                                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                                marginLeft: '6px'


                                                            }}>{day}
                                                        </span>{" "}
                                                        {currentLanguage === 'ar' ? getArabicDayLabel(day) : "days"}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </ThemeProvider>
                        </CacheProvider>
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={rtlTheme}>
                                <div className="ProjectSkills" style={{ width: '100%' }}>
                                    <TextField
                                        id="outlined-basic"
                                        label={t('Project Skills')}
                                        variant="outlined"
                                        size="small"
                                        value={selectedSkills.join(', ')}
                                        onClick={handleClickSkills}
                                        InputProps={{
                                            readOnly: true,
                                            style: { color: '#FFFFFF' },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickSkills} edge="end">
                                                        {openSkills ? (
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
                                            }
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
                                                },
                                            },
                                        }}
                                        className={errors.selectedSkillsError ? 'shake' : ''}
                                    />

                                    <Menu
                                        anchorEl={anchorElSkills}
                                        open={openSkills}
                                        onClose={handleCloseSkills}
                                        PaperProps={{
                                            style: {
                                                background: 'rgba(0, 0, 0, 0.8)',
                                                width: '71.5%',
                                                color: 'white',
                                                borderRadius: '8px',
                                                maxHeight: '120px',
                                                overflowY: 'auto',
                                                padding: '10px',
                                            },
                                        }}
                                    >
                                        {selectedCategory && skillsByCategory[selectedCategory]?.map((skill, index) => {
                                            const { backgroundColor, color } = getColorForSkill(index);
                                            return (
                                                <MenuItem
                                                    key={skill}
                                                    onClick={() => {
                                                        const newSkills = selectedSkills.includes(skill)
                                                            ? selectedSkills.filter(s => s !== skill)
                                                            : [...selectedSkills, skill];
                                                        setSelectedSkills(newSkills);
                                                    }}
                                                    style={{
                                                        margin: '5px',
                                                        padding: 0,
                                                        backgroundColor: 'transparent',
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                        },
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            backgroundColor,
                                                            borderRadius: "90px 30px 30px 90px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            padding: "5px 10px 5px 25px",
                                                            position: "relative",
                                                            gap: "10px",
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <div
                                                            className="Point"
                                                            style={{
                                                                height: "8px",
                                                                width: "8px",
                                                                background: color,
                                                                marginLeft: currentLanguage === 'ar' ? 'unset' : "-15px",
                                                                borderRadius: "90px",
                                                            }}
                                                        />
                                                        <Typography
                                                            style={{
                                                                color,
                                                                fontWeight: "bold",
                                                                fontSize: "14px",
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            }}
                                                        >
                                                            {t(skill)}
                                                        </Typography>
                                                    </div>
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                </div>
                            </ThemeProvider>
                        </CacheProvider>


                    </>
                ) : (
                    <>


                        <div className="ProjectTitelInput"
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                id="outlined-basic"
                                label={t('Project Titel')}
                                variant="outlined"
                                value={formData.projectTitle}
                                onChange={handleProjectTitleChange}
                                size="small"
                                inputProps={{
                                    maxLength: 500 // Add this line
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
                                    maxLength: 70,
                                    style: {
                                        color: '#FFFFFF',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {errors.projectTitleError && (
                                                <DangerousIcon style={{ color: '#ff4d4d' }} />

                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: errors.projectTitleError ? '#ff4d4d' : '#FFFFFF',
                                            borderWidth: errors.projectTitleError ? '2px' : '1px',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: errors.projectTitleError ? '#ff4d4d' : '#FFFFFF',
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: errors.projectTitleError ? '#ff4d4d' : '#FFFFFF',
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
                                className={errors.projectTitleError ? 'shake' : ''}
                            />
                        </div>
                        <div className="ProjectDescription"
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                id="outlined-basic"
                                label={t('Project description')}
                                onChange={handleProjectDescriptionChange}
                                variant="outlined"
                                size="small"
                                inputProps={{

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

                                    style: {
                                        color: '#FFFFFF',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {errors.projectDescriptionError && (
                                                <DangerousIcon style={{ color: '#ff4d4d' }} />

                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: errors.projectDescriptionError ? '#ff4d4d' : '#FFFFFF',
                                            borderWidth: errors.projectDescriptionError ? '2px' : '1px',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: errors.projectDescriptionError ? '#ff4d4d' : '#FFFFFF',
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: errors.projectDescriptionError ? '#ff4d4d' : '#FFFFFF',
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
                                className={errors.projectDescriptionError ? 'shake' : ''}
                                multiline // Enable multi-line input
                            />
                        </div>
                        <div className="ProjectDetails"
                            style={{
                                width: '100%',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                                <div className="ProjectCatego">
                                    <TextField
                                        id="project-category"
                                        label={t('Project Category')}
                                        variant="outlined"
                                        size="small"
                                        value={selectedCategory} // Bind the input value
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
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.selectedCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.selectedCategoryError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.selectedCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.selectedCategoryError ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.selectedCategoryError ? 'shake' : ''}
                                    />
                                    <Menu
                                        anchorEl={anchorElCatego}
                                        open={openProjectCat}
                                        onClose={() => handleCloseProjectCatego('')}
                                        PaperProps={{
                                            style: {
                                                background: 'rgba(0, 0, 0, 0.8)',
                                                width: '18.6%',
                                                color: 'white',
                                                borderRadius: '8px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                textAlign: currentLanguage === 'ar' ? 'right' : 'left', // Add this line
                                                maxHeight: '120px', // Set max height for the menu
                                                overflowY: 'auto', // Enable vertical scrolling if content overflows
                                            },
                                        }}
                                    >
                                        {categories.map((category, index) => {
                                            const images = [
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1727102241/website-codes_rg69kw.png',
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1727103377/graphic-design_w6yumh.png',
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1727109604/content-marketing_yqzb70.png',
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1727110167/engineering_nspbwi.png',
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1727109955/blog_alyug6.png',
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1737575212/profit_18250005_u14ksb.png',
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1727116243/technical-support_wimost.png',
                                                'https://res.cloudinary.com/damicjacf/image/upload/v1727116597/attorney_vdkfwu.png',
                                            ];

                                            return (
                                                <MenuItem
                                                    key={category}
                                                    onClick={() => handleCloseProjectCatego(category)} // Pass the category as value
                                                    style={{
                                                        color: '#fff',
                                                        width: '100%',
                                                        justifyContent: 'flex-start',
                                                        padding: currentLanguage === 'ar' ? '8px 16px 8px 8px' : '8px 8px 8px 16px',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        display: 'flex', // Set flex display
                                                        alignItems: 'center', // Align items vertically
                                                        gap: '8px', // Add gap between image and text
                                                        transition: 'transform 0.3s ease',
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}   // Reset scale on mouse leave
                                                >
                                                    <img
                                                        src={images[index]}
                                                        alt={category}
                                                        style={{
                                                            width: '20px', // Set image width
                                                            height: '20px', // Set image height
                                                            borderRadius: '4px', // Add slight rounding for better design
                                                        }}
                                                    />
                                                    {t(category)}
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>

                                </div>


                                <div className="ProjectSubCat">
                                    <TextField
                                        id="project-subcategory"
                                        label={t("Project Sub Category")}
                                        variant="outlined"
                                        size="small"
                                        value={selectedSubCategory}
                                        onClick={handleOpenSubCatMenu}
                                        inputProps={{
                                            maxLength: 70,
                                            readOnly: true, // Prevent manual typing
                                        }}
                                        InputLabelProps={{
                                            style: { color: "#FFFFFF" },
                                            sx: {
                                                fontSize: currentLanguage === "ar" ? "17px" : "16px",
                                                fontFamily:
                                                    currentLanguage === "ar"
                                                        ? '"Droid Arabic Kufi", serif'
                                                        : '"Airbnbcereal", sans-serif',
                                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "18px" },
                                            },
                                        }}
                                        InputProps={{
                                            maxLength: 70,
                                            style: {
                                                color: "#FFFFFF",
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleOpenSubCatMenu} edge="end">
                                                        {openSubCatMenu ? (
                                                            <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                        ) : (
                                                            <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.selectedSubCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.selectedSubCategoryError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.selectedSubCategoryError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.selectedSubCategoryError ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.selectedSubCategoryError ? 'shake' : ''}
                                    />
                                    <Menu
                                        anchorEl={anchorElSubCat}
                                        open={openSubCatMenu}
                                        onClose={() => handleCloseSubCatMenu("")}
                                        PaperProps={{
                                            style: {
                                                background: "rgba(0, 0, 0, 0.8)",
                                                width: '19%',
                                                color: "white",
                                                borderRadius: "8px",
                                                maxHeight: "120px", // Set max height for the menu
                                                overflowY: "auto", // Enable scrolling
                                            },
                                        }}
                                    >
                                        {selectedCategory && subCategoriesMap[selectedCategory]?.map(subCat => (
                                            <MenuItem
                                                key={subCat}
                                                onClick={() => handleCloseSubCatMenu(subCat)}
                                                style={{
                                                    color: "#fff",
                                                    width: "100%",
                                                    padding: "8px 16px",
                                                    fontFamily:
                                                        currentLanguage === "ar"
                                                            ? '"Droid Arabic Kufi", serif'
                                                            : '"Airbnbcereal", sans-serif',
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.transform = "scale(1.05)")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.transform = "scale(1)")
                                                }
                                            >
                                                {t(subCat)}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                                <div className="ProjectBudget">
                                    <TextField
                                        id="project-budget"
                                        label={t('Project Budget')}
                                        variant="outlined"
                                        size="small"
                                        value={selectedBudget} // Bind the input value
                                        onClick={handleClickBudget} // Open the menu when clicked
                                        InputProps={{
                                            readOnly: true, // Make the input non-editable
                                            style: { color: '#FFFFFF' },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickBudget} edge="end">
                                                        {openBudget ? (
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
                                                    borderColor: errors.selectedBudgetError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.selectedBudgetError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.selectedBudgetError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.selectedBudgetError ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.selectedBudgetError ? 'shake' : ''}
                                    />

                                    <Menu
                                        anchorEl={anchorElBudget}
                                        open={openBudget}
                                        onClose={() => handleCloseBudget('')}
                                        PaperProps={{
                                            style: {
                                                background: 'rgba(0, 0, 0, 0.8)',
                                                width: '17.5%',
                                                color: 'white',
                                                borderRadius: '8px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                maxHeight: '120px',
                                                overflowY: 'auto',
                                            },
                                        }}
                                        MenuListProps={{
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: 0,
                                            },
                                        }}
                                    >
                                        {budgetRanges.map((range) => (
                                            <MenuItem
                                                key={range}
                                                onClick={() => handleCloseBudget(range)} // Pass the range as value
                                                style={{
                                                    color: '#fff',
                                                    width: '100%',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    padding: '8px 16px',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                            >
                                                {range}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                                <div className="ProjectTime">
                                    <TextField
                                        id="project-time"
                                        label="Time to Finish"
                                        variant="outlined"
                                        size="small"
                                        value={selectedTime}
                                        onClick={handleOpenTimeMenu}
                                        inputProps={{
                                            maxLength: 70
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
                                            maxLength: 70,
                                            style: {
                                                color: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleOpenTimeMenu} edge="end">
                                                        {openTimeMenu ? (
                                                            <KeyboardArrowUpIcon sx={{ color: '#fff' }} />
                                                        ) : (
                                                            <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.selectedTimeError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.selectedTimeError ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.selectedTimeError ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.selectedTimeError ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.selectedTimeError ? 'shake' : ''}
                                    />

                                    <Menu
                                        anchorEl={anchorElTime}
                                        open={openTimeMenu}
                                        onClose={() => handleCloseTimeMenu('')}
                                        PaperProps={{
                                            style: {
                                                background: 'rgba(0, 0, 0, 0.8)',
                                                width: '17%',
                                                color: 'white',
                                                borderRadius: '8px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                textAlign: currentLanguage === 'ar' ? 'right' : 'left',
                                                maxHeight: '120px',
                                                overflowY: 'auto',
                                            },
                                        }}
                                        MenuListProps={{
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: 0
                                            }
                                        }}
                                    >
                                        {DaysRange.map((day) => (
                                            <MenuItem
                                                key={day}
                                                onClick={() => handleCloseTimeMenu(day)} // Set selected time
                                                style={{
                                                    color: '#fff',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    padding: '8px 16px',
                                                    width: '100%'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Scale up on hover
                                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset scale on mouse leave
                                            >
                                                {day} {currentLanguage === 'ar' ? 'يوم' : 'days'}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <div className="ProjectSkills" style={{ width: '100%' }}>
                            <TextField
                                id="outlined-basic"
                                label={t('Project Skills')}
                                variant="outlined"
                                size="small"
                                value={selectedSkills.join(', ')}
                                onClick={handleClickSkills}
                                InputProps={{
                                    readOnly: true,
                                    style: { color: '#FFFFFF' },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickSkills} edge="end">
                                                {openSkills ? (
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
                                    }
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
                                        },
                                    },
                                }}
                                className={errors.selectedSkillsError ? 'shake' : ''}
                            />

                            <Menu
                                anchorEl={anchorElSkills}
                                open={openSkills}
                                onClose={handleCloseSkills}
                                PaperProps={{
                                    style: {
                                        background: 'rgba(0, 0, 0, 0.8)',
                                        width: '71.5%',
                                        color: 'white',
                                        borderRadius: '8px',
                                        maxHeight: '120px',
                                        overflowY: 'auto',
                                        padding: '10px',
                                    },
                                }}
                            >
                                {selectedCategory && skillsByCategory[selectedCategory]?.map((skill, index) => {
                                    const { backgroundColor, color } = getColorForSkill(index);
                                    return (
                                        <MenuItem
                                            key={skill}
                                            onClick={() => {
                                                const newSkills = selectedSkills.includes(skill)
                                                    ? selectedSkills.filter(s => s !== skill)
                                                    : [...selectedSkills, skill];
                                                setSelectedSkills(newSkills);
                                            }}
                                            style={{
                                                margin: '5px',
                                                padding: 0,
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                },
                                            }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor,
                                                    borderRadius: "90px 30px 30px 90px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    padding: "5px 10px 5px 25px",
                                                    position: "relative",
                                                    gap: "10px",
                                                    width: '100%',
                                                }}
                                            >
                                                <div
                                                    className="Point"
                                                    style={{
                                                        height: "8px",
                                                        width: "8px",
                                                        background: color,
                                                        marginLeft: currentLanguage === 'ar' ? 'unset' : "-15px",
                                                        borderRadius: "90px",
                                                    }}
                                                />
                                                <Typography
                                                    style={{
                                                        color,
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    }}
                                                >
                                                    {t(skill)}
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </div>
                    </>
                )}







                <div className="PhotoAndVidoes"
                    style={{
                        height: 'auto',
                        width: '100%',
                        display: 'flex',
                        gap: '10px',

                    }}
                >
                    <div className="AddImages"
                        style={{
                            width: '50%',
                            height: 'auto',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                    >
                        <div className="UploadImages">
                            <Typography
                                sx={{
                                    color: "white",
                                    fontWeight: 'bold',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}>
                                {t('Upload Images (Optional)')}
                            </Typography>
                        </div>

                        {/* Drag and Drop Area */}
                        <div className="Drag"
                            style={{
                                width: '99%',
                                height: '240px',
                                border: `2px dashed ${dragging ? 'blue' : '#fff'}`,
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                transform: `scale(${dragging ? '1.05' : '1'})`,
                                transition: 'transform 0.3s ease',
                            }}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="Animation" style={{ marginTop: '-20px' }}>
                                <Lottie animationData={animationData} style={{ width: 200, height: 200, display: 'block', margin: '0 auto' }} />
                            </div>
                            <div className="Typo"
                                style={{
                                    marginTop: '-20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    color: 'white',
                                    marginRight: isSmallScreen && currentLanguage === 'ar' ? '8px' : 'unset',
                                }}
                            >
                                <Typography onClick={handleClick}
                                    sx={{
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                        textDecoration: 'underline',
                                        textDecorationColor: 'white',
                                        lineHeight: '20px',
                                        cursor: 'pointer',
                                        zIndex: '111111111111111111111'
                                    }}
                                >
                                    {t('Click to upload or drag and drop')}
                                </Typography>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    }}
                                >
                                    {t('Maximum photo size 10MB.')}
                                </Typography>
                            </div>
                        </div>

                        {/* Image State */}
                        <div className="ImageState"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '2px solid rgba(255, 255, 255, 0.18)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                width: '101%',
                                height: '70px',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '10px',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div className="ImageIconAndInfo"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <div className="ImageInfo" style={{ display: 'flex', gap: '5px' }}>
                                    {images.length > 0 && (
                                        <div
                                            className="ImageIcon"
                                            style={{
                                                width: '3rem',
                                                height: '2.5rem',
                                                background: 'transparent',
                                                marginRight: '10px',
                                            }}
                                        >
                                            <img
                                                src={images[images.length - 1].preview}
                                                alt="Profile"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    textAlign: 'center',
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="ImageInfoText" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                lineHeight: '20px',
                                                color: 'white',
                                            }}
                                        >
                                            (
                                            <span style={{
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                marginLeft: '4px'
                                            }}>
                                                {images.length}
                                            </span>
                                            {t('Images')}
                                            )
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontSize: currentLanguage === 'ar' ? '14px' : 'unset',
                                                color: 'white',
                                            }}
                                        >
                                            {imageSize} {t('MB')}
                                        </Typography>
                                    </div>
                                </div>

                                <div
                                    className="ClosingIcon"
                                    onClick={removeImage}
                                    style={{
                                        position: 'absolute',
                                        right: currentLanguage === 'ar' ? '94%' : '1%',
                                        top: '4%',
                                        zIndex: '22222',
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: '15px' }} />
                                </div>
                            </div>

                            <div
                                className="CompleteStatusWhite"
                                style={{
                                    width: '88%',
                                    height: '25px',
                                    background: 'white',
                                    position: 'relative',
                                    marginTop: 'auto',
                                    display: 'flex',
                                    gap: '20%',
                                    borderRadius: '2px',
                                }}
                            >
                                <div
                                    className="ProgressBarBackground"
                                    style={{
                                        width: '100%',
                                        height: '5px',
                                        background: 'white',
                                        borderRadius: '2px',
                                    }}
                                />
                                <div
                                    className="ProgressBlue"
                                    style={{
                                        width: `${loadingProgress}%`,
                                        height: '100%',
                                        background: 'blue',
                                        position: 'absolute',
                                        top: 0,
                                        borderRadius: '2px',
                                        transition: 'width 0.5s ease-in-out',
                                    }}
                                ></div>
                            </div>

                            <div>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        right: currentLanguage === 'ar' ? '91%' : '2%',
                                        top: '84%',
                                        transform: 'translateY(-50%)',
                                        color: 'white',
                                        fontSize: '12px',
                                    }}
                                >
                                    {loadingProgress}%
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="AddLinks"
                        style={{
                            width: '50%',
                            height: 'auto',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                    >
                        <div className="UploadLinks">
                            <Typography
                                sx={{
                                    color: "white",
                                    fontWeight: 'bold',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}>
                                {t('Add Links (Optional)')}
                            </Typography>
                        </div>
                        {errorMessage1 && (
                            <Typography
                                sx={{
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    fontWeight: 'bold',
                                    color: errorMessage === "Your profile is already up-to-date. No changes detected." ? '#2df873' : '#ff4d4d',
                                }}
                            >
                                {t(errorMessage1)}
                            </Typography>
                        )}

                        {currentLanguage === 'ar' ? (
                            <>
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider theme={rtlTheme}>
                                        <div className="3LinksInputs"
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '20px',
                                            }}
                                        >
                                            <TextField
                                                id="outlined-basic"
                                                label={t('الرابط الأول')}
                                                variant="outlined"
                                                value={formData.ProjectLink1}
                                                onChange={handleProjectLink1Change}
                                                size="small"
                                                inputProps={{
                                                    maxLength: 300 // Add this line
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
                                                    maxLength: 70,
                                                    style: {
                                                        color: '#FFFFFF',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {errors.ProjectLink1Error && (
                                                                <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.ProjectLink1Error ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.ProjectLink1Error ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.ProjectLink1Error ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.ProjectLink1Error ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.ProjectLink1Error ? 'shake' : ''}
                                            />
                                            <TextField
                                                id="outlined-basic"
                                                label={t('الرابط الثاني')}
                                                variant="outlined"
                                                value={formData.ProjectLink2}
                                                onChange={handleProjectLink2Change}
                                                size="small"
                                                inputProps={{
                                                    maxLength: 500 // Add this line
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
                                                    maxLength: 70,
                                                    style: {
                                                        color: '#FFFFFF',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {errors.ProjectLink2Error && (
                                                                <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.ProjectLink2Error ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.ProjectLink2Error ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.ProjectLink2Error ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.ProjectLink2Error ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.ProjectLink2Error ? 'shake' : ''}
                                            />
                                            <TextField
                                                id="outlined-basic"
                                                label={t('الرابط الثالث')}
                                                variant="outlined"
                                                value={formData.ProjectLink3}
                                                onChange={handleProjectLink3Change}
                                                size="small"
                                                inputProps={{
                                                    maxLength: 500 // Add this line
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
                                                    maxLength: 70,
                                                    style: {
                                                        color: '#FFFFFF',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {errors.ProjectLink3Error && (
                                                                <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        '& fieldset': {
                                                            borderColor: errors.ProjectLink3Error ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: errors.ProjectLink3Error ? '2px' : '1px',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: errors.ProjectLink3Error ? '#ff4d4d' : '#FFFFFF',
                                                            borderWidth: '2px',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: errors.ProjectLink3Error ? '#ff4d4d' : '#FFFFFF',
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
                                                className={errors.ProjectLink3Error ? 'shake' : ''}
                                            />
                                        </div>
                                    </ThemeProvider>
                                </CacheProvider>
                            </>

                        ) : (
                            <>
                                <div className="3LinksInputs"
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px',
                                    }}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label={t('Link 1')}
                                        variant="outlined"
                                        value={formData.ProjectLink1}
                                        onChange={handleProjectLink1Change}
                                        size="small"
                                        inputProps={{
                                            maxLength: 300 // Add this line
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
                                            maxLength: 70,
                                            style: {
                                                color: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {errors.ProjectLink1Error && (
                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.ProjectLink1Error ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.ProjectLink1Error ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.ProjectLink1Error ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.ProjectLink1Error ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.ProjectLink1Error ? 'shake' : ''}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label={t('Link 2')}
                                        variant="outlined"
                                        value={formData.ProjectLink2}
                                        onChange={handleProjectLink2Change}
                                        size="small"
                                        inputProps={{
                                            maxLength: 500 // Add this line
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
                                            maxLength: 70,
                                            style: {
                                                color: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {errors.ProjectLink2Error && (
                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.ProjectLink2Error ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.ProjectLink2Error ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.ProjectLink2Error ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.ProjectLink2Error ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.ProjectLink2Error ? 'shake' : ''}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label={t('Link 3')}
                                        variant="outlined"
                                        value={formData.ProjectLink3}
                                        onChange={handleProjectLink3Change}
                                        size="small"
                                        inputProps={{
                                            maxLength: 500 // Add this line
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
                                            maxLength: 70,
                                            style: {
                                                color: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {errors.ProjectLink3Error && (
                                                        <DangerousIcon style={{ color: '#ff4d4d' }} />

                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: errors.ProjectLink3Error ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: errors.ProjectLink3Error ? '2px' : '1px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.ProjectLink3Error ? '#ff4d4d' : '#FFFFFF',
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.ProjectLink3Error ? '#ff4d4d' : '#FFFFFF',
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
                                        className={errors.ProjectLink3Error ? 'shake' : ''}
                                    />
                                </div>
                            </>
                        )}


                    </div>

                </div>
                <div className="CreateGigBu"
                    style={{
                        width: '100%',
                    }}
                >
                    <Button onClick={handleNewGig}
                        variant="outlined"
                        className="btn-grad"
                        sx={{
                            width: '100%',
                            position: 'relative',
                            cursor: 'pointer',
                            height: '38px',
                            color: 'white',
                            opacity : isLoading? '0.5' : 'unset', 
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
                            {t('Create a project')}
                        </Typography>
                    )}
                      
                    </Button>
                </div>

                  {/* Place ToastContainer outside of the Button */}
        

             




            </div>
         

        </div>

        
    )
}

export default AddNewProject
