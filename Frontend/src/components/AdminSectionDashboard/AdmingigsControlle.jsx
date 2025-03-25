import { useState, useEffect } from "react";
import { useMediaQuery, Table, TableBody, Checkbox, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import ReportedGigsTable from "./ReportedGigsTable";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { motion, AnimatePresence } from "framer-motion";




function AdmingigsControlle() {
    const { t } = useTranslation();


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

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detects small screens

    const [activeTab, setActiveTab] = useState("AllGigs");

    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Current page
    const [limit, setLimit] = useState(10); // Gigs per page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [totalGigs, setTotalGigs] = useState(0); // Initialize with 0
    const [expandedId, setExpandedId] = useState(null); // Track which gig's offers are expanded



    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/server/get/gigs`,
                    {
                        params: { page, limit }, // Send page and limit as query parameters
                        withCredentials: true,
                    }
                );

                console.log("Admin Gigs =", response.data);
                setGigs(response.data.gigs);
                setTotalPages(response.data.totalPages);
                setTotalGigs(response.data.totalGigs); // Update totalGigs
            } catch (err) {
                console.error("Error fetching gigs:", err);
                setError("Failed to fetch gigs.");
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, [page, limit]); // Refetch gigs when page or limit changes

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handleDeleteGig = async (gigId) => {
        try {
            // Confirm deletion with the user
            const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
            if (!confirmDelete) return;

            // Call the backend API to delete the gig
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/server/get/gigs/${gigId}`,
                { withCredentials: true }
            );

            // Update the UI by removing the deleted gig
            setGigs((prevGigs) => prevGigs.filter((gig) => gig._id !== gigId));

            // Optionally, show a success message
            alert("Gig deleted successfully!");
        } catch (err) {
            console.error("Error deleting gig:", err);
            alert("Failed to delete gig.");
        }
    };


    // Toggle expanded row
    const toggleExpand = (gigId) => {
        setExpandedId(expandedId === gigId ? null : gigId);
    };

    const handleDeleteOffer = async (gigId, offerId, projectTitle) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this offer?");
            if (!confirmDelete) return;

            // Call the backend API to delete the offer
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/server/get/offer/${offerId}`,
                {
                    withCredentials: true,
                    data: { projectTitle }, // Send projectTitle in the request body
                }
            );

            if (response.status === 200) {
                // Remove the deleted offer from the state
                setGigs((prevGigs) =>
                    prevGigs.map((gig) =>
                        gig._id === gigId
                            ? {
                                ...gig,
                                offers: gig.offers.filter((offer) => offer._id !== offerId),
                            }
                            : gig
                    )
                );

                // Optionally, show a success message
                alert("Offer deleted successfully!");
            }
        } catch (err) {
            console.error("Error deleting offer:", err);
            alert("Failed to delete offer.");
        }
    };

    return (
        <div className='GigsContainer'
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
                            Gigs Statistics
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
                    gap: '15px',
                }}
            >
                <div className="totalGigs"
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
                        Totel Gigs
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
                                {totalGigs}
                            </span> Gig
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
                <div className="RespotredGigs"
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

            </div>
            <div className="Options">
                <div
                    className="Allgigs"
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
                            left: activeTab === "AllGigs" ? "5px" : "50%", // Moves the white background
                            width: "50%",
                            background: "white",
                            borderRadius: "36px",
                            height: "40px",
                            transition: "left 0.3s ease-in-out", // Smooth animation
                        }}
                    ></div>

                    {/* All Users Button */}
                    <div className="AllGigs"

                        onClick={() => setActiveTab("AllGigs")}
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
                            {t("All Gigs")}
                        </Typography>
                    </div>

                    {/* Requests Button */}
                    <div className="Reported"

                        onClick={() => setActiveTab("Reported")}
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
                            {t("Reported Gigs")}
                        </Typography>
                    </div>
                </div>
            </div>
            {activeTab === "AllGigs" && (
                <div className="Tabel slide-from-right">
                    <TableContainer component={Paper}
                        sx={{
                            overflowX: "auto", width: "100%",
                            background: 'rgba(0, 0, 0, 0.2)',
                            marginBottom: '20px',

                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Gig Title</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Category</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Subcategory</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Posted By</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gigs.map((gig) => (
                                    <>

                                        {/* Gig Row */}
                                        <TableRow key={gig._id}
                                            sx={{
                                                cursor: "pointer",
                                                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
                                            }}
                                            onClick={() => toggleExpand(gig._id)}
                                        >

                                            <TableCell >
                                                <Typography sx={{ color: "#ffffff", fontWeight: "600" }}>
                                                    {gig.projectTitle}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography sx={{ color: "#ffffff" }}>
                                                    {gig.selectedCategory}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography sx={{ color: "#ffffff" }}>
                                                    {gig.selectedSubCategory}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography sx={{ color: "#ffffff" }}>
                                                    {gig.user.firstName} {gig.user.lastName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent row expansion
                                                        handleDeleteGig(gig._id);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                                <Typography sx={{ color: "#ffffff", marginLeft: "10px" }}>
                                                    {expandedId === gig._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>


                                        {/* Expanded Section */}
                                        {expandedId === gig._id && (
                                            <TableRow>
                                                <TableCell colSpan={6} sx={{ padding: 0 }}>
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        style={{
                                                            background: "rgba(255, 255, 255, 0.1)",
                                                            borderRadius: "10px",
                                                            padding: "20px",
                                                            margin: "10px",
                                                        }}
                                                    >
                                                        <Typography variant="h6" sx={{ color: "#ffffff", marginBottom: "10px" }}>
                                                            Offers ({gig.offers.length})
                                                        </Typography>
                                                        {gig.offers.map((offer) => (
                                                            <>
                                                                <div key={offer._id} style={{ marginBottom: "10px" }}>
                                                                    <Typography variant="subtitle1" sx={{ color: "#ffffff" }}>
                                                                        <strong>Seller:</strong> {offer.seller.firstName} {offer.seller.lastName}
                                                                    </Typography>
                                                                    <Typography variant="body2" sx={{ color: "#ffffff" }}>
                                                                        <strong>Price:</strong> ${offer.price}
                                                                    </Typography>
                                                                    <Typography variant="body2" sx={{ color: "#ffffff" }}>
                                                                        <strong>Timeline:</strong> {offer.timeline}
                                                                    </Typography>
                                                                    <Typography variant="body2" sx={{ color: "#ffffff" }}>
                                                                        <strong>Comment:</strong> {offer.comment}
                                                                    </Typography>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="error"
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent row expansion
                                                                            handleDeleteOffer(gig._id, offer._id, gig.projectTitle); // Pass projectTitle
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </div>

                                                            </>
                                                        ))}
                                                    </motion.div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                        <div
                            className="Pages"
                            style={{
                                width: "100%",
                                height: "30px",
                                background: "transparent",
                                marginTop: "50px",
                                display: "flex",
                                gap: "5px",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                right: isSmallScreen ? (currentLanguage === "ar" ? "0px" : "5px") : "unset",
                            }}
                        >
                            {/* Previous Page Button (Triangle) */}
                            <div
                                id={currentLanguage === "ar" ? "triangleRight" : "triangleLeft"}
                                onClick={handlePreviousPage}
                                style={{ cursor: "pointer" }}
                            ></div>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <div
                                    key={p}
                                    onClick={() => handlePageClick(p)}
                                    style={{
                                        width: "38px",
                                        height: isSmallScreen ? "30px" : "38px",
                                        background: p === page ? "rgb(91, 66, 243)" : "hsl(240, 3.7%, 15.88%)",
                                        color: p === page ? "white" : "white",
                                        borderRadius: "13px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "background 0.1s ease-in-out, color 0.1s ease-in-out",
                                    }}
                                >
                                    <Typography>{p}</Typography>
                                </div>
                            ))}

                            {/* Next Page Button (Triangle) */}
                            <div
                                id={currentLanguage === "ar" ? "triangleLeft" : "triangleRight"}
                                onClick={handleNextPage}
                                style={{ cursor: "pointer" }}
                            ></div>
                        </div>

                        {/* Next/Previous Buttons - Original Styling */}
                        <div
                            className="Buttonss"
                            style={{
                                display: "flex",
                                gap: "5px",
                                justifyContent: "center",
                                marginTop: "20px",
                            }}
                        >
                            {/* Previous Button */}
                            <Button
                                onClick={handlePreviousPage}
                                disabled={page === 1} // Disable if on the first page
                                sx={{
                                    color: "rgb(91, 66, 243)",
                                    WebkitTapHighlightColor: "transparent",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                    minWidth: "64px",
                                    height: "32px",
                                    padding: "0 12px",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    appearance: "none",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    transition: "transform 0.2s, colors 0.2s, opacity 0.2s",
                                    userSelect: "none",
                                    fontSize: "13px",
                                    whiteSpace: "nowrap",
                                    fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    "&:disabled": {
                                        opacity: 0.5,
                                        cursor: "not-allowed",
                                    },
                                }}
                            >
                                {currentLanguage === "ar" ? "السابق" : "Previous"}
                            </Button>

                            {/* Next Button */}
                            <Button
                                onClick={handleNextPage}
                                disabled={page === totalPages} // Disable if on the last page
                                sx={{
                                    color: "rgb(91, 66, 243)",
                                    WebkitTapHighlightColor: "transparent",
                                    borderRadius: "8px",
                                    boxSizing: "border-box",
                                    appearance: "none",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    fontSize: "13px",
                                    width: "80px",
                                    fontWeight: "bold",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    transition: "transform 0.2s, colors 0.2s, opacity 0.2s",
                                    textTransform: "capitalize",
                                    height: "32px",
                                    padding: "0 12px",
                                    outline: "none",
                                    fontFamily: currentLanguage === "ar" ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    "&:disabled": {
                                        opacity: 0.5,
                                        cursor: "not-allowed",
                                    },
                                }}
                            >
                                {currentLanguage === "ar" ? "التالي" : "Next"}
                            </Button>
                        </div>
                    </TableContainer>
                </div>
            )}

            {activeTab === "Reported" && (
                <div className="ReportedGigs slide-from-left">
                    <ReportedGigsTable />
                </div>

            )}
        </div>
    )
}

export default AdmingigsControlle
