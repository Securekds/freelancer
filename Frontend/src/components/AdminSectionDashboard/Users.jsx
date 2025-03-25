import { useState, useEffect, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useUser } from '../../Context/UserContext.jsx'
import { useNavigate } from "react-router-dom";


import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Icons
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Users() {

    const { t } = useTranslation();
    const { user, isLoaded, updateUserProfile, isProfileUpdated, verificationStatus } = useUser();

const navigate = useNavigate();
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
            const formatted = now.toLocaleDateString("en-US", options);
            setFormattedDate(formatted);
        };

        updateDate(); // Set initial date
    }, []);


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get
                (
                    `${import.meta.env.VITE_BACKEND_URL}/server/get/users`,
                     { withCredentials: true }
                    );

                // Sort users by createdAt (newest first)
                const sortedUsers = response.data
                    .filter(user => user.createdAt) // Ensure only valid dates are sorted
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first

                console.log("Sorted Users =", sortedUsers);

                setUsers(sortedUsers);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/server/get/allrequests`,
                    { withCredentials: true }
                );

                const data = response.data.map((request, index) => ({
                    id: index + 1, // Assign sequential ID (1, 2, 3...)
                    requestBy: {
                        ...request.userId,
                        createdAt: formatDate1(request.userId.createdAt) // ✅ Format user creation date
                    },
                    createdAt: formatDate(request.createdAt), // Format the date
                    type: request.idType, // ID Type
                    idImageFront: request.idImageFront,  // ✅ Include Front Image
                    idImageBack: request.idImageBack,
                    verificationStatus: request.idVerificationStatus,

                }));

                console.log("Formatted Requests:", data);
                setRequests(data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    // Function to format date to "25 FEB 2035"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).toUpperCase();
    };


    const formatDate1 = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).toUpperCase();
    };



    // Helper function to get the correct profile image URL
    const getProfileImage = (profileImg) => {
        const defaultCloudinaryURL = "https://res.cloudinary.com/damicjacf/image/upload/v1728490158/_227d921a-77b1-4047-8480-964083c7dcf7_pttzxu.png"; // Default Cloudinary URL

        // Check if it's a file stored under 'uploads' and prepend backend URL
        if (profileImg && profileImg.startsWith("uploads")) {
            return `${import.meta.env.VITE_BACKEND_URL}/${profileImg}`; // Concatenate the backend URL with the image path
        }

        // Return the profile image URL as is (for Cloudinary or other URLs)
        return profileImg || defaultCloudinaryURL; // Fallback to default image if profileImg is missing
    };

    const [activeTab, setActiveTab] = useState("users");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Get users for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const tabVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
    };

    const [expandedId, setExpandedId] = useState(null); // Track expanded row

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };


    const getImageUrl = (imagePath) => {
        if (!imagePath) return null; // Handle missing image

        // Ensure imagePath does not have a leading slash to avoid double slashes in the URL
        const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

        const fullUrl = `${import.meta.env.VITE_BACKEND_URL}/${cleanPath}`;
        console.log('Generated image URL:', fullUrl);
        return fullUrl;
    };


    const updateIdVerificationAccepted = async (userId) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/server/get/verifications/approve/${userId}`,
                {}, // No need to send { status: "accepted" } since backend sets it
                { withCredentials: true }
            );

            console.log("Server Response:", response.data); // Log the response
            alert("User ID successfully approved!");

            return response.data;
        } catch (error) {
            console.error("Error updating ID verification:", error.response?.data || error.message);
            alert("Failed to approve ID. Please try again.");
        }
    };

    const updateIdVerificationRejected = async (userId) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/server/get/verifications/reject/${userId}`,
                {}, // No need to send { status: "accepted" } since backend sets it
                { withCredentials: true }
            );

            console.log("Server Response:", response.data); // Log the response
            alert("User ID successfully rejected!");

            return response.data;
        } catch (error) {
            console.error("Error updating ID verification:", error.response?.data || error.message);
            alert("Failed to approve ID. Please try again.");
        }
    };


    const navigateToFullDetails = (userId) => {
        navigate(`/privatesection/user/fulldetails/${userId}`);
    };
    


    return (
        <div className='UsersContainer'
            style={{
                background: 'border-box rgba(0, 0, 0, 0.2)',
                height: 'auto',
                width: '96%',
                border: '0px solid rgba(0, 0, 0, 0.125)',
                boxShadow: 'rgba(0, 0, 0, 0.14) 0rem 0.125rem 0.125rem 0rem, rgba(0, 0, 0, 0.2) 0rem 0.1875rem 0.0625rem -0.125rem, rgba(0, 0, 0, 0.12) 0rem 0.0625rem 0.3125rem 0rem',
                marginTop: '50px',
                borderRadius: '0.75rem',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',

            }}

        >
            <div className="Header"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '10px',
                }}
            >
                <div className="FirstSec"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <div className="Icon"
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '1.6px solid white',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesomeIcon icon={faUsers}
                            style={{
                                fontSize: '17px',
                                transform: 'rotate(0deg)',
                                color: 'white',
                                verticalAlign: 'middle', // Aligns with text

                            }} />

                    </div>
                    <div className="TYpo">
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                textWrap: 'nowrap',
                            }}
                        >
                            Users Statistics
                        </Typography>
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                textWrap: 'nowrap',
                            }}
                        >
                            {formattedDate}
                        </Typography>
                    </div>
                </div>


            </div>
            <div className="StatisticsBoxes"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div className="totalUsers"
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
                        boxSizing: 'border-box',
                        borderRadius: '16px',
                        width: '21%',
                        border: '1px solid grey',
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            textWrap: 'nowrap',
                        }}
                    >
                        Totel Users
                    </Typography>
                    <div className="Typo"
                        style={{
                            display: 'flex',
                            gap: '15px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'grey',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                textWrap: 'nowrap',

                            }}
                        >
                            <span
                                style={{
                                    marginRight: '10px',
                                    color: 'white',
                                }}
                            >
                                {users.length}
                            </span> User
                        </Typography>
                        <div className="Green"
                            style={{
                                background: '#194e3d',
                                borderRadius: '16px',
                                padding: '7px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faCaretUp}
                                style={{
                                    fontSize: '17px',
                                    transform: 'rotate(0deg)',
                                    color: '#2df873',
                                    verticalAlign: 'middle', // Aligns with text

                                }} />
                            <Typography
                                sx={{
                                    color: '#2df873',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >

                                27 %
                            </Typography>

                        </div>
                    </div>


                </div>
                <div className="totalUsers"
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
                        boxSizing: 'border-box',
                        borderRadius: '16px',
                        width: '21%',
                        border: '1px solid grey',
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            textWrap: 'nowrap',
                        }}
                    >
                        Totel Users
                    </Typography>
                    <div className="Typo"
                        style={{
                            display: 'flex',
                            gap: '15px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'grey',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                textWrap: 'nowrap',

                            }}
                        >
                            <span
                                style={{
                                    marginRight: '10px',
                                    color: 'white',
                                }}
                            >
                                178
                            </span> User
                        </Typography>
                        <div className="Green"
                            style={{
                                background: '#194e3d',
                                borderRadius: '16px',
                                padding: '7px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faCaretUp}
                                style={{
                                    fontSize: '17px',
                                    transform: 'rotate(0deg)',
                                    color: '#2df873',
                                    verticalAlign: 'middle', // Aligns with text

                                }} />
                            <Typography
                                sx={{
                                    color: '#2df873',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >

                                27 %
                            </Typography>

                        </div>
                    </div>


                </div>
                <div className="totalUsers"
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
                        boxSizing: 'border-box',
                        borderRadius: '16px',
                        width: '21%',
                        border: '1px solid grey',
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            textWrap: 'nowrap',
                        }}
                    >
                        Totel Users
                    </Typography>
                    <div className="Typo"
                        style={{
                            display: 'flex',
                            gap: '15px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'grey',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                textWrap: 'nowrap',

                            }}
                        >
                            <span
                                style={{
                                    marginRight: '10px',
                                    color: 'white',
                                }}
                            >
                                178
                            </span> User
                        </Typography>
                        <div className="Green"
                            style={{
                                background: '#194e3d',
                                borderRadius: '16px',
                                padding: '7px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faCaretUp}
                                style={{
                                    fontSize: '17px',
                                    transform: 'rotate(0deg)',
                                    color: '#2df873',
                                    verticalAlign: 'middle', // Aligns with text

                                }} />
                            <Typography
                                sx={{
                                    color: '#2df873',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >

                                27 %
                            </Typography>

                        </div>
                    </div>


                </div>
                <div className="totalUsers"
                    style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.3rem 0.8rem',
                        boxSizing: 'border-box',
                        borderRadius: '16px',
                        width: '21%',
                        border: '1px solid grey',
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            textWrap: 'nowrap',
                        }}
                    >
                        Total Users
                    </Typography>
                    <div className="Typo"
                        style={{
                            display: 'flex',
                            gap: '15px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'grey',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                textWrap: 'nowrap',

                            }}
                        >
                            <span
                                style={{
                                    marginRight: '10px',
                                    color: 'white',
                                }}
                            >
                                178
                            </span> User
                        </Typography>
                        <div className="Green"
                            style={{
                                background: '#194e3d',
                                borderRadius: '16px',
                                padding: '7px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faCaretUp}
                                style={{
                                    fontSize: '17px',
                                    transform: 'rotate(0deg)',
                                    color: '#2df873',
                                    verticalAlign: 'middle', // Aligns with text

                                }} />
                            <Typography
                                sx={{
                                    color: '#2df873',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                }}
                            >

                                27 %
                            </Typography>

                        </div>
                    </div>


                </div>
            </div>
            <div className="Options">
                <div
                    className="Users"
                    style={{
                        width: "30%",
                        background: "grey",
                        height: "auto",
                        borderRadius: "36px",
                        padding: "5px",
                        display: "flex",
                        gap: "10px",
                        position: "relative", // Needed for absolute positioning
                        overflow: "hidden",
                    }}
                >
                    {/* Moving Background */}
                    <div
                        className="selector"
                        style={{
                            position: "absolute",
                            top: "5px",
                            left: activeTab === "users" ? "5px" : "50%", // Moves the white background
                            width: "50%",
                            background: "white",
                            borderRadius: "36px",
                            height: "40px",
                            transition: "left 0.3s ease-in-out", // Smooth animation
                        }}
                    ></div>

                    {/* All Users Button */}
                    <div className="AllUsers"

                        onClick={() => setActiveTab("users")}
                        style={{
                            width: "50%",
                            borderRadius: "36px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative", // Ensures text stays on top
                            cursor: "pointer",
                            zIndex: 2, // Keep text above the moving background
                        }}
                    >
                        <Typography
                            sx={{
                                color: "black",
                                fontWeight: "bold",
                                fontFamily:
                                    currentLanguage === "ar"
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            {t("All Users")}
                        </Typography>
                    </div>

                    {/* Requests Button */}
                    <div className="Requests"

                        onClick={() => setActiveTab("requests")}
                        style={{
                            width: "50%",
                            borderRadius: "36px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            cursor: "pointer",
                            zIndex: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "black",
                                fontWeight: "bold",
                                fontFamily:
                                    currentLanguage === "ar"
                                        ? '"Droid Arabic Kufi", serif'
                                        : '"Airbnbcereal", sans-serif',
                            }}
                        >
                            {t("ID Requests")}
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="Table"
                style={{
                    width: '100%',
                    height: ' auto',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid grey',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'rgba(0, 0, 0, 0.14) 0rem 0.125rem 0.125rem 0rem, rgba(0, 0, 0, 0.2) 0rem 0.1875rem 0.0625rem -0.125rem, rgba(0, 0, 0, 0.12) 0rem 0.0625rem 0.3125rem 0rem',

                }}
            >


                <AnimatePresence mode="wait">
                    {activeTab === "users" && (
                        <>
                            <motion.div
                                key={currentPage}
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        padding: "15px",
                                        background: "rgba(0, 0, 0, 0.2)",
                                        color: "white",
                                        borderRadius: "16px",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {/* Header */}
                                    <div className="Header"
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            alignItems: "center",
                                            padding: "5px",
                                        }}
                                    >
                                        <div style={{ width: "10%", minWidth: "60px" }}>
                                            <Checkbox sx={{ color: 'white' }} />
                                        </div>
                                        <div style={{ width: "20%", minWidth: "200px" }}>
                                            <Typography
                                                sx={{
                                                    color: "#ffffff",
                                                    fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: "600",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                User Name
                                            </Typography>
                                        </div>
                                        <div style={{ width: "25%", minWidth: "200px" }}>
                                            <Typography
                                                sx={{
                                                    color: "#ffffff",
                                                    fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: "600",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                Email
                                            </Typography>
                                        </div>
                                        <div style={{ width: "25%", minWidth: "150px" }}>
                                            <Typography
                                                sx={{
                                                    color: "#ffffff",
                                                    fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: "600",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                Account Type
                                            </Typography>
                                        </div>
                                        <div style={{ width: "20%", minWidth: "100px" }}>
                                            <Typography
                                                sx={{
                                                    color: "#ffffff",
                                                    fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: "600",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                Join Date
                                            </Typography>
                                        </div>
                                        <div style={{ width: "20%", minWidth: "100px" }}>
                                            <Typography
                                                sx={{
                                                    color: "#ffffff",
                                                    fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                    fontWeight: "600",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                Status
                                            </Typography>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="Line" style={{ width: "100%", background: "grey", height: "1px", margin: "10px 0" }} />

                                    
                                    {[...currentUsers]
                                        .filter(user => user.createdAt) 
                                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) 
                                        .map(user => (
                                            <div key={user._id} style={{ width: "100%" }}>
                                              
                                                <div
                                                    className="UserRow"
                                                    style={{
                                                        display: "flex",
                                                        width: "100%",
                                                        alignItems: "center",
                                                        padding: "10px 5px",
                                                        borderBottom: "1px solid rgba(128, 128, 128, 0.2)",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => toggleExpand(user._id)}
                                                >
                                                    <div style={{ width: "10%", minWidth: "60px" }}>
                                                        <Checkbox sx={{ color: 'white' }} />
                                                    </div>
                                                    <div style={{ width: "20%", minWidth: "200px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                        <div style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            borderRadius: "50%",
                                                            overflow: "hidden"
                                                        }}>
                                                            <img
                                                                src={getProfileImage(user.profileImg)}
                                                                alt="Profile"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover"
                                                                }}
                                                            />
                                                        </div>
                                                        <Typography sx={{
                                                            color: "#ffffff",
                                                            fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                            fontWeight: "600",
                                                            fontSize: "14px"
                                                        }}>
                                                            {user.firstName} {user.lastName}
                                                        </Typography>
                                                    </div>
                                                    <div style={{ width: "25%", minWidth: "200px" }}>
                                                        <Typography sx={{
                                                            color: "#ffffff",
                                                            fontSize: "14px"
                                                        }}>
                                                            {user.email}
                                                        </Typography>
                                                    </div>
                                                    <div style={{ width: "25%", minWidth: "150px" }}>
                                                        <Typography sx={{
                                                            color: "#ffffff",
                                                            fontSize: "14px",
                                                            marginLeft : '35px',
                                                        }}>
                                                            {user.isBuyer ? t('Buyer') : t('Seller')}
                                                        </Typography>
                                                    </div>
                                                    <div style={{ width: "20%", minWidth: "100px" }}>
                                                        <Typography sx={{
                                                            color: "#ffffff",
                                                            fontSize: "14px"
                                                        }}>
                                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </Typography>
                                                    </div>

                                                    <div style={{ width: "20%", minWidth: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        {user.isVerified ? (
                                                            <div className="Status"
                                                                style={{
                                                                    width: '60%',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '16px',
                                                                    backgroundColor: '#194e3d',
                                                                    boxShadow: '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        color: '#2df873',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                        textAlign: 'center',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        fontWeight: '600',
                                                                        fontSize: '15px',
                                                                        textWrap: 'nowrap',
                                                                    }}
                                                                >
                                                                    Active
                                                                </Typography>
                                                            </div>
                                                        ) : (
                                                            <div className="Status"
                                                                style={{
                                                                    width: '60%',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '16px',
                                                                    backgroundColor: '#4e1919',
                                                                    boxShadow: '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        color: '#f82d2d',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                        textAlign: 'center',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        fontWeight: '600',
                                                                        fontSize: '15px',
                                                                        textWrap: 'nowrap',
                                                                    }}
                                                                >
                                                                    InActive
                                                                </Typography>
                                                            </div>
                                                        )}

                                                        <Typography sx={{ color: "#ffffff", fontSize: "14px", marginLeft: "10px" }}>
                                                            {expandedId === user._id ? <ExpandLess /> : <ExpandMore />}
                                                        </Typography>
                                                    </div>
                                                </div>

                                                {/* Expanded Section */}
                                                {expandedId === user._id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        style={{
                                                            background: "rgba(255, 255, 255, 0.1)",
                                                            borderRadius: "10px",
                                                            padding: "20px",
                                                            margin: "10px 0",
                                                        }}
                                                    >
                                                        <div style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            marginBottom: "30px"
                                                        }}>
                                                            <div>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px", marginBottom: "10px" }}>
                                                                    📌 <strong>Full Name:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {user.firstName} {user.lastName}
                                                                    </span>
                                                                </Typography>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px", marginBottom: "10px" }}>
                                                                    📧 <strong>Email:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {user.email}
                                                                    </span>
                                                                </Typography>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                    📱 <strong>Phone:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {user.countryCode} {user.phoneNumber}
                                                                    </span>
                                                                </Typography>
                                                            </div>

                                                            <div>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px", marginBottom: "10px" }}>
                                                                    👤 <strong>Gender:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {user.gender}
                                                                    </span>
                                                                </Typography>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px", marginBottom: "10px" }}>
                                                                    🌍 <strong>Country:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {user.country}
                                                                    </span>
                                                                </Typography>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                    🎂 <strong>Birth Date:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {user.birthDay} - {user.birthMonth} - {user.birthYear}
                                                                    </span>
                                                                </Typography>
                                                            </div>

                                                            <div>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px", marginBottom: "10px" }}>
                                                                    🏷️ <strong>Account Type:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {user.isBuyer ? t('Buyer') : t('Seller')}
                                                                    </span>
                                                                </Typography>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px", marginBottom: "10px" }}>
                                                                    📅 <strong>Join Date:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric'
                                                                        })}
                                                                    </span>
                                                                </Typography>
                                                                <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                    🔄 <strong>Last Updated:</strong>
                                                                    <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                                                                        {new Date(user.updatedAt).toLocaleDateString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric'
                                                                        })}
                                                                    </span>
                                                                </Typography>
                                                            </div>
                                                        </div>

                                                        {/* Actions Section */}
                                                        <div style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            gap: "20px",
                                                            marginTop: "20px"
                                                        }}>
                                                            <div
                                                                onClick={() => handleUserAction(user._id, 'activate')}
                                                                style={{
                                                                    width: "200px",
                                                                    height: "32px",
                                                                    background: '#194e3d',
                                                                    display: 'flex',
                                                                    cursor: 'pointer',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '16px',
                                                                    boxShadow: '0px 4px 6px rgba(45, 248, 115, 0.4), 0px 1px 3px rgba(45, 248, 115, 0.3)'
                                                                }}
                                                            >
                                                                <Typography sx={{
                                                                    fontSize: '14px',
                                                                    fontWeight: 'bold',
                                                                    color: '#2df873'
                                                                }}>
                                                                    Activate Account
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => handleUserAction(user._id, 'deactivate')}
                                                                style={{
                                                                    width: "200px",
                                                                    height: "32px",
                                                                    background: '#fae3e3',
                                                                    display: 'flex',
                                                                    cursor: 'pointer',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '16px',
                                                                    boxShadow: '0px 4px 6px rgba(211, 47, 47, 0.4), 0px 1px 3px rgba(211, 47, 47, 0.8)'
                                                                }}
                                                            >
                                                                <Typography sx={{
                                                                    fontSize: '14px',
                                                                    fontWeight: 'bold',
                                                                    color: '#d32f2f'
                                                                }}>
                                                                    Deactivate Account
                                                                </Typography>
                                                            </div>
                                                            <div
                                                                onClick={() => navigateToFullDetails(user._id)}
                                                                style={{
                                                                    width: "200px",
                                                                    height: "32px",
                                                                    background: 'black',
                                                                    display: 'flex',
                                                                    cursor: 'pointer',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '16px',
                                                                }}
                                                            >
                                                                <Typography sx={{
                                                                    fontSize: '14px',
                                                                    fontWeight: 'bold',
                                                                    color: 'white'
                                                                }}>
                                                                   View More details
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </motion.div>

                            {/* Pagination */}
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                    <button
                                        key={number}
                                        onClick={() => setCurrentPage(number)}
                                        style={{
                                            margin: "5px",
                                            padding: "10px",
                                            cursor: "pointer",
                                            background: currentPage === number ? "#1976D2" : "#ccc",
                                            color: currentPage === number ? "white" : "black",
                                            borderRadius: "5px",
                                            border: "none",
                                        }}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === "requests" && (
                        <motion.div
                            key="requests"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    background: "rgba(0, 0, 0, 0.2)",
                                    color: "white",
                                    borderRadius: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                               
                                <div className="Header"
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        alignItems: "center",
                                        padding: "5px",
                                    }}
                                >
                                    <div style={{ width: "10%", minWidth: "60px" }}>
                                        <Typography
                                            sx={{
                                                color: "#ffffff",
                                                fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: "600",
                                                fontSize: "15px",
                                            }}
                                        >
                                            ID
                                        </Typography>
                                    </div>
                                    <div style={{ width: "35%", minWidth: "200px" }}>
                                        <Typography
                                            sx={{
                                                color: "#ffffff",
                                                fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: "600",
                                                fontSize: "15px",
                                            }}
                                        >
                                            Request By
                                        </Typography>
                                    </div>
                                    <div style={{ width: "25%", minWidth: "150px" }}>
                                        <Typography
                                            sx={{
                                                color: "#ffffff",
                                                fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: "600",
                                                fontSize: "15px",
                                            }}
                                        >
                                            Create Date
                                        </Typography>
                                    </div>
                                    <div style={{ width: "15%", minWidth: "100px" }}>
                                        <Typography
                                            sx={{
                                                color: "#ffffff",
                                                fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: "600",
                                                fontSize: "15px",
                                            }}
                                        >
                                            Type
                                        </Typography>
                                    </div>
                                    <div style={{ width: "15%", minWidth: "80px" }}>
                                        <Typography
                                            sx={{
                                                color: "#ffffff",
                                                fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                fontWeight: "600",
                                                fontSize: "15px",
                                            }}
                                        >
                                            Actions
                                        </Typography>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="Line" style={{ width: "100%", background: "grey", height: "1px" }} />

                                {/* Requests List */}
                                {requests
                                    .sort((a, b) => (a.verificationStatus === "progress" ? -1 : b.verificationStatus === "progress" ? 1 : 0))
                                    .map((request) => (
                                        <div key={request.id}
                                            style={{ width: "100%" }}>
                                            {/* Request Row */}
                                            <div className="RequestRow"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    padding: "10px 5px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => toggleExpand(request.id)}
                                            >
                                                {/* ID */}
                                                <div style={{ width: "10%", minWidth: "60px" }}>
                                                    <Typography sx={{ color: "#ffffff", fontSize: "14px", fontWeight: "bold" }}>
                                                        # {request.id}
                                                    </Typography>
                                                </div>

                                                {/* Request By */}
                                                <div style={{ width: "35%", minWidth: "200px", display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <img

                                                        src={getProfileImage(request.requestBy.profileImg)}
                                                        alt="Profile"
                                                        style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                                                    />
                                                    <Typography sx={{ color: "#ffffff", fontSize: "14px", fontWeight: "bold" }}>
                                                        {request.requestBy.firstName} {request.requestBy.lastName}
                                                    </Typography>
                                                </div>

                                                {/* Create Date */}
                                                <div style={{ width: "25%", minWidth: "150px" }}>
                                                    <Typography sx={{ color: "#ffffff", fontSize: "14px", fontWeight: "bold" }}>
                                                        {request.createdAt}
                                                    </Typography>
                                                </div>

                                                {/* Type */}
                                                <div style={{ width: "15%", minWidth: "100px" }}>
                                                    <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                        {request.type}
                                                    </Typography>
                                                </div>

                                                {/* Actions */}
                                                <div className=''
                                                    style={{
                                                        width: "15%",
                                                        minWidth: "80px",
                                                        display: 'flex',
                                                        gap: '10px',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start',
                                                    }}>
                                                    <div className="Status"

                                                        style={{
                                                            width: '60%',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderRadius: '16px',
                                                            backgroundColor:
                                                                request.verificationStatus === "accepted" ? "#194e3d"
                                                                    : request.verificationStatus === "rejected" ? "#4e1919"
                                                                        : request.verificationStatus === "progress" ? "rgba(255, 153, 0, 0.2)"
                                                                            : "rgba(0, 116, 255, 0.2)", // Default to "pending"
                                                            boxShadow: '0px 4px 6px rgba(0, 116, 255, 0.2), 0px 1px 3px rgba(0, 116, 255, 0.2)',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    request.verificationStatus === "accepted" ? "#2df873"
                                                                        : request.verificationStatus === "rejected" ? "#f82d2d"
                                                                            : request.verificationStatus === "progress" ? "rgb(255, 153, 0)"
                                                                                : "rgba(0, 116, 255)", 
                                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                textAlign: 'center',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                fontWeight: '600',
                                                                fontSize: '15px',
                                                                textWrap: 'nowrap',
                                                            }}
                                                        >
                                                            {request.verificationStatus.charAt(0).toUpperCase() + request.verificationStatus.slice(1)}
                                                        </Typography>
                                                    </div>

                                                    <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                        {expandedId === request.id ? <ExpandLess /> : <ExpandMore />}
                                                    </Typography>
                                                </div>
                                            </div>


                                            {expandedId === request.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{
                                                        background: "rgba(255, 255, 255, 0.1)",
                                                        borderRadius: "10px",
                                                        padding: "10px",
                                                        margin: "5px 0",
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '30px',
                                                    }}
                                                >
                                                    <div className="InfoUser"
                                                        style={{
                                                            display: ' flex',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <div className="Sec1">

                                                            <Typography sx={{
                                                                color: "#ffffff", fontSize: "14px",


                                                            }}>
                                                                📌 <strong>Full Name :</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.firstName} {request.requestBy.lastName}
                                                                </span>
                                                            </Typography>
                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                🔄 <strong>Email :</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.email}
                                                                </span>
                                                            </Typography>
                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                📅 <strong>Phone Number :</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.countryCode}
                                                                    {request.requestBy.phoneNumber}

                                                                </span>
                                                            </Typography>
                                                        </div>
                                                        <div className="Sec2">

                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                📌 <strong>Gender :</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.gender}
                                                                </span>
                                                            </Typography>
                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                🔄 <strong>Country :</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.country}
                                                                </span>
                                                            </Typography>
                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                📅 <strong>Birth Date :</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.birthDay} - {request.requestBy.birthMonth} - {request.requestBy.birthYear}
                                                                </span>
                                                            </Typography>
                                                        </div>
                                                        <div className="Sec3">

                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                📌 <strong>Account Type :</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.isBuyer ? t('Buyer') : t('Seller')}
                                                                </span>
                                                            </Typography>
                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                🔄 <strong>Join Date:</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {request.requestBy.createdAt}
                                                                </span>

                                                            </Typography>
                                                            <Typography sx={{ color: "#ffffff", fontSize: "14px" }}>
                                                                📅 <strong>Last Updated:</strong>
                                                                <span
                                                                    style={{
                                                                        marginLeft: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                    }}
                                                                >
                                                                    {formatDate(request.requestBy.updatedAt)}
                                                                </span>
                                                            </Typography>
                                                        </div>

                                                    </div>
                                                    <div className="Divivder"
                                                        style={{
                                                            width: '90%',
                                                            height: '1px',
                                                            background: 'white',
                                                            margin: 'auto',

                                                        }}
                                                    >

                                                    </div>
                                                    <div className="UserIDImages"
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',

                                                        }}
                                                    >
                                                        <div className='Img1'

                                                            style={{
                                                                padding: "0", // Remove padding to prevent space inside the container
                                                                borderRadius: "12px",
                                                                background: "#333",
                                                                overflow: "hidden",
                                                                height: "150px",
                                                                width: "40%",
                                                                display: "flex", // Ensures the image fully fills the div
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <img
                                                                src={getImageUrl(request.idImageFront)}
                                                                alt="Driver License"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover",
                                                                    borderRadius: "inherit",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="Buttons"
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                gap: '20px',

                                                            }}
                                                        >
                                                            <div className="Accept"
                                                                onClick={() => updateIdVerificationAccepted(request.requestBy._id)}
                                                                style={{
                                                                    width: '200%',
                                                                    height: '32px',
                                                                    background: '#194e3d',
                                                                    display: 'flex',
                                                                    cursor: 'pointer',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '16px',
                                                                    boxShadow: '0px 4px 6px rgba(45, 248, 115, 0.4), 0px 1px 3px rgba(45, 248, 115, 0.3)'
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                        fontWeight: 'bold',
                                                                        textTransform: 'capitalize',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                        textAlign: 'center',
                                                                        color: '#2df873'
                                                                    }}
                                                                >
                                                                    Accept
                                                                </Typography>
                                                            </div>
                                                            <div className="Decline"
                                                                onClick={() => updateIdVerificationRejected(request.requestBy._id)}
                                                                style={{
                                                                    width: '200%',
                                                                    height: '32px',
                                                                    background: '#fae3e3',
                                                                    display: 'flex',
                                                                    cursor: 'pointer',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '16px',
                                                                    boxShadow: '0px 4px 6px rgba(211, 47, 47, 0.4), 0px 1px 3px rgba(211, 47, 47, 0.8)',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                        fontWeight: 'bold',
                                                                        textTransform: 'capitalize',
                                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                                        textAlign: 'center',
                                                                        color: '#d32f2f'
                                                                    }}
                                                                >
                                                                    Decline
                                                                </Typography>
                                                            </div>
                                                        </div>

                                                        <div className='Img1'

                                                            style={{
                                                                padding: "0", // Remove padding to prevent space inside the container
                                                                borderRadius: "12px",
                                                                background: "#333",
                                                                overflow: "hidden",
                                                                height: "150px",
                                                                width: "40%",
                                                                display: "flex", // Ensures the image fully fills the div
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <img
                                                                src={getImageUrl(request.idImageBack)}
                                                                alt="Driver License"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover",
                                                                    borderRadius: "inherit",
                                                                }}
                                                            />
                                                        </div>


                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


            </div>

        </div>
    )
}

export default Users
