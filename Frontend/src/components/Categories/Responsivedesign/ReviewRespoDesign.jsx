import { Tooltip, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import ReviewRankChart from './ReviewRankChart'
import SimpleStarRating from './SimpleStarRating';
import axios from "axios";
import {
    faHandshake, faClock,
    faSmile,
    faHammer,
    faGraduationCap,
    faArrowTrendUp,
    faStar,
    faArrowTrendDown,

} from '@fortawesome/free-solid-svg-icons';
import ReviewStars from './ReviewStars';
import { useUser } from '../../../Context/UserContext.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';
import useMediaQuery from '@mui/material/useMediaQuery';



// Helper function to calculate the overall average rating
const calculateOverallAverageRating = (averageRatings) => {
    const { interactionBrilliance, engagement, craftedExcellence, domainExpertise } = averageRatings;
    const total = parseFloat(interactionBrilliance) + parseFloat(engagement) + parseFloat(craftedExcellence) + parseFloat(domainExpertise);
    return (total / 4).toFixed(1); // Average of all categories
};






function ReviewRespoDesign({ onCloseClick, ocClickOpen }) {

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

    const sellerId = user?._id;

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isTabletScreen = useMediaQuery('(min-width:601px) and (max-width:1000px)');
    const isMediumScreen = useMediaQuery('(min-width:1001px) and (max-width:1400px)');
    const isLargeScreen = useMediaQuery('(min-width:1401px) and (max-width:1920px)');


   
    const isFontAwesomeIcon = (icon) => {
        return icon && typeof icon === 'object' && icon.prefix && icon.iconName;
    };




    const reviewIconsMap = {
        fahandshake: faHandshake,
        faclock: faClock,
        fahammer: faHammer,
        fagraduationcap: faGraduationCap,

    };



    const Stars = [{
        stars: '{3/5}',
        staricon: faStar,
        starcolorfiled: '#FFDF00',
        starcolorempty: '#E2E8F0',
    }]



    const Ratingleader = [{
        stars: '{5/5}',
        bar1: '100%',
        level: 'Excellent',
        starcolorfiled: '#FFDF00',
        starcolorempty: '#E2E8F0',
    },
    {
        stars: '{4/5}',
        bar1: '100%',
        level: 'Good',
        starcolorfiled: '#FFDF00',
        starcolorempty: '#E2E8F0',
    },
    {
        stars: '{3/5}',
        bar1: '100%',
        level: 'Average',
        starcolorfiled: '#FFDF00',
        starcolorempty: '#E2E8F0',
    },
    {
        stars: '{2/5}',
        bar1: '100%',
        level: 'Poor',
        starcolorfiled: '#FFDF00',
        starcolorempty: '#E2E8F0',
    },
    {
        stars: '{1/5}',
        bar1: '100%',
        level: 'Terrible',
        starcolorfiled: '#FFDF00',
        starcolorempty: '#E2E8F0',
    },


    ]

    const UserRating = [{
        stars: '{4/5}',
        bar1: '100%',
        date: '27-12-2024',
        starcolorfiled: '#FFDF00',
        starcolorempty: '#E2E8F0',
    },
    ]

    const UsersComments = [{
        photoprofile: user.profileImg,
        circlewidth: '70px',
        firstname: user.firstName,
        lastname: user.lastName,
        joindatetag: 'Joined Date',
        data: '23 sep 2024',
        reviewdate: '23-12-2024',
        reviewdesc: 'I’ve had the pleasure of using this service for the past few weeks, and I have to say, my experience has been nothing short of exceptional! From the moment I signed up, I was impressed with how intuitive and user-friendly the platform is. Navigating through the different features was a breeze, and it didn’t take long for me to get up to speed. One of the standout aspects of my experience was the customer support. I had a couple of questions regarding my account setup and project management tools, and every time I reached out, I received',

        totalreviews: '32',
        userStars: [
            {

                stars: '{3/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Interaction Brilliance',
                perc: '80%',
                progbar: '80%',
                movingbar: 'rgb(91, 193, 253)'
            },
            {
                stars: '{2/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Engagement',
                perc: '40%',
                fullbarwidth: '100%',
                progbar: '40%',
                movingbar: 'rgb(91, 193, 253)'
            },
            {
                stars: '{3/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Crafted Excellence',
                perc: '78%',
                fullbarwidth: '100%',
                progbar: '78%',
                movingbar: 'rgb(91, 193, 253)'
            },
            {
                stars: '{1/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Domain Expertise',
                perc: '10%',
                fullbarwidth: '100%',
                progbar: '10%',
                movingbar: 'rgb(91, 193, 253)'
            },


        ],
        commentStars: [
            {
                stars: '{3/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                userreviewdata: '27-12-2024',
            },

        ],



    }
        ,
    {
        photoprofile: user.profileImg,
        circlewidth: '70px',
        firstname: user.firstName,
        lastname: user.lastName,
        joindatetag: 'Joined Date',
        data: '23 sep 2024',
        reviewdate: '23-12-2024',
        reviewdesc: 'I’ve had the pleasure of using this service for the past few weeks, and I have to say, my experience has been nothing short of exceptional! From the moment I signed up, I was impressed with how intuitive and user-friendly the platform is. Navigating through the different features was a breeze, and it didn’t take long for me to get up to speed. One of the standout aspects of my experience was the customer support. I had a couple of questions regarding my account setup and project management tools, and every time I reached out, I received',
        totalreviews: '32',

        userStars: [
            {

                stars: '{3/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Interaction Brilliance',
                perc: '80%',
                progbar: '80%',
                movingbar: 'rgb(91, 193, 253)'
            },
            {
                stars: '{2/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Engagement',
                perc: '40%',
                fullbarwidth: '100%',
                progbar: '40%',
                movingbar: 'rgb(91, 193, 253)'
            },
            {
                stars: '{3/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Crafted Excellence',
                perc: '78%',
                fullbarwidth: '100%',
                progbar: '78%',
                movingbar: 'rgb(91, 193, 253)'
            },
            {
                stars: '{1/5}',
                staricon: faStar,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                name: 'Domain Expertise',
                perc: '10%',
                fullbarwidth: '100%',
                progbar: '10%',
                movingbar: 'rgb(91, 193, 253)'
            },
        ],
        commentStars: [
            {
                stars: '{5/5}',
                staricon: faStar
                ,
                starcolorfiled: '#FFDF00',
                starcolorempty: '#E2E8F0',
                userreviewdata: '27-12-2024',
            },

        ],

    },
    ]



    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [averageRatings, setAverageRatings] = useState({
        interactionBrilliance: 0,
        engagement: 0,
        craftedExcellence: 0,
        domainExpertise: 0,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/server/reviews/reviews/${sellerId}`,
                    { withCredentials: true }
                );

                if (response.data.success) {
                    console.log("Reviews", response.data.data.averageRatings)
                    setReviews(response.data.data.reviews);
                    setAverageRatings(response.data.data.averageRatings);
                } else {
                    setError('Failed to fetch reviews');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred while fetching reviews.');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [sellerId]);

    
    const calculatePercentage = (rating) => {
        return (rating / 5) * 100;
    };

    const overallAverageRating = calculateOverallAverageRating(averageRatings);


    const generalRatingCategories = [
        {
            name: 'Interaction Brilliance',
            stars: averageRatings.interactionBrilliance,
            perc: `${averageRatings.interactionBrilliance}/5`,
            progbar: `${calculatePercentage(averageRatings.interactionBrilliance)}%`,
            starcolorfiled: '#FFDF00',
            starcolorempty: '#ccc',
        },
        {
            name: 'Engagement',
            stars: averageRatings.engagement,
            perc: `${averageRatings.engagement}/5`,
            progbar: `${calculatePercentage(averageRatings.engagement)}%`,
            starcolorfiled: '#FFDF00',
            starcolorempty: '#ccc',
        },
        {
            name: 'Crafted Excellence',
            stars: averageRatings.craftedExcellence,
            perc: `${averageRatings.craftedExcellence}/5`,
            progbar: `${calculatePercentage(averageRatings.craftedExcellence)}%`,
            starcolorfiled: '#FFDF00',
            starcolorempty: '#ccc',
        },
        {
            name: 'Domain Expertise',
            stars: averageRatings.domainExpertise,
            perc: `${averageRatings.domainExpertise}/5`,
            progbar: `${calculatePercentage(averageRatings.domainExpertise)}%`,
            starcolorfiled: '#FFDF00',
            starcolorempty: '#ccc',
        },
    ];



    if (loading) return <Typography>Loading reviews...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!reviews || reviews.length === 0) return <Typography>No reviews found</Typography>;



    return (
        <div className='MainContainer'
            style={{
                width: '100%',
                height: 'auto',
                padding: "10px",
                overflow: 'auto',
                overflowX: 'auto',
                paddingBottom: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',




            }}

        >
            <div className='BlurBG' style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                bottom: 0,
                borderRadius: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid white',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: '-1',

            }} />
            {/* Close Icon positioned in the top-right corner */}
            <div className='CloseIcon'
                style={{
                    position: 'absolute',  // Absolute positioning relative to the MainContainer
                    top: '10px',           // Adjust from the top
                    right: '25px',         // Adjust from the right
                    cursor: 'pointer',     // Show pointer cursor on hover
                    zIndex: 1,             // Ensure it's on top of other elements
                }}
                onClick={onCloseClick}  // Trigger the onCloseClick function when clicked
            >
                <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />  {/* Customize icon size and color */}
            </div>
            <div className="ReviewContainer "
                style={{
                    width: isMediumScreen ? '70%' : '70%',
                    height: 'auto',
                    border: '1px solid white',
                    borderRadius: '16px',
                    margin: 'auto',
                    display: 'flex',
                    padding: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '15px'
                }}
            >
                <div className="GeneralTypo"
                    style={{
                        width: '97%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography

                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            whiteSpace: 'nowrap',
                        }}


                    >
                        {t('General Reviews')}
                    </Typography>
                    <Typography

                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            opacity: '0.8',
                            whiteSpace: 'nowrap',
                        }}


                    >
                        {t('All time')}
                    </Typography>
                </div>
                <div className="RankChart">
                    <ReviewRankChart rating={overallAverageRating} maxRating={5} />
                </div>
                <div className="StatusGeneral"
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px',
                        marginTop: '-10px',
                        marginBottom: '10px',
                        flexDirection: 'column',
                    }}
                >
                    {generalRatingCategories.map((category, index) => (
                        <div key={index} className="Status1" style={{
                            width: '80%',
                            border: '1px solid white',
                            height: 'auto',
                            borderRadius: '16px',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            margin: '0 auto',
                        }}>
                       

                            {/* Review Typo and Progress */}
                            <div className="ReviewTypo " style={{
                                display: 'flex',
                                width: '50%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                marginRight: '50px',
                            }}>
                                <div className="Div" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width : '100%',
                                }}>
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {t(category.name)}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {category.perc}
                                    </Typography>
                                </div>

                                {/* Progress Bar */}
                                <div className="ProgressBar" style={{
                                    width: '100%',
                                    background: 'white',
                                    height: '10px',
                                    borderRadius: '16px',
                                    position: 'relative',
                                }}>
                                    <div className="Progress" style={{
                                        width: category.progbar,
                                        background: 'rgb(91, 193, 253)',
                                        height: '10px',
                                        borderRadius: '16px',
                                        position: 'absolute',
                                    }} />
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="ReviewStars" style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: '20%',
                                marginRight: '10px',
                                justifyContent: "center",
                            }}>
                                <Typography
                                    sx={{
                                        color: '#ffffff',
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {category.stars}
                                </Typography>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <SimpleStarRating
                                        stars={category.stars}
                                        starcolorfiled={category.starcolorfiled}
                                        starcolorempty={category.starcolorempty}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
            <div className="UsersReviews "
                style={{
                    width: '100%',
                    border: '1px solid white',
                    height: "auto",
                    margin: 'auto',
                    padding: "16px",
                    borderRadius: '16px',
                    display: ' flex',
                    flexDirection: 'column',
                    gap: '20px',

                }}
            >
                <div className="TYpos"
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {t('Users Reviews')}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#ffffff',
                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                            textAlign: 'center',
                            border: '1px solid white',
                            padding: '10px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {currentLanguage === 'ar' ? (
                            <>
                                <span
                                    style={{
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        marginLeft: '10px',
                                    }}
                                >
                                    26
                                </span>
                                ديسمبر - <span style={{ fontFamily: '"Airbnbcereal", sans-serif' }}>2022</span>
                            </>
                        ) : (
                            <>
                                <span style={{ fontFamily: '"Airbnbcereal", sans-serif' }}>26</span> - February <span style={{ fontFamily: '"Airbnbcereal", sans-serif' }}>2022</span>
                            </>
                        )}
                    </Typography>

                </div>
                <div className="AverageRating "

                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                    }}
                >
                    <div className="TotalReview "

                        style={{
                            flex: 0.4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '10px',
                            position: 'relative',

                        }}
                    >
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                opacity: '0.8',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {t('Total Reviews')}
                        </Typography>
                        <div className="Total"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >

                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {currentLanguage === 'ar' ? (
                                    <>
                                        <span
                                            style={{
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                            }}
                                        >
                                            20
                                        </span>
                                        {' '}({t('Review')})
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontFamily: '"Airbnbcereal", sans-serif' }}>20</span>{' '}(Review)
                                    </>
                                )}
                            </Typography>

                            <Button
                                sx={{
                                    background: '#C2FFC7',
                                    borderRadius: ' 16px',
                                    height: '20px',

                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: '"Airbnbcereal", sans-serif',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    20%
                                </span>
                                {currentLanguage === 'ar' ? (
                                    <FontAwesomeIcon
                                        icon={faArrowTrendDown}
                                        style={{

                                            transform: 'rotate(180deg)',
                                            fontSize: '16px',
                                            marginLeft: '5px',
                                            marginRight: '5px',

                                        }}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faArrowTrendUp}

                                        style={{
                                            transform: 'rotate(0deg)',

                                            fontSize: '16px',
                                            marginLeft: '5px',

                                        }}
                                    />
                                )}
                            </Button>

                        </div>
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                fontWeight: 'bold',

                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {t('Growth in reviews on this year')}
                        </Typography>
                        <div className=''
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: currentLanguage === 'ar' ? '220%' : '0',
                                width: '1px',
                                opacity: '0.8',
                                height: '100%',
                                backgroundColor: 'white',

                            }}
                        ></div>
                    </div>

                    <div className="AverageRat"

                        style={{
                            flex: 0.5,
                            textAlign: 'center',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',

                        }}
                    >
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                opacity: '0.8',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {t('Average Rating')}
                        </Typography>
                        <div className="Stars">

                            {/* Stars */}
                            {Stars.map((review, index) => (
                                <div className="ReviewStars"

                                    style={{
                                        display: "flex",

                                        alignItems: "center",
                                        width: '100%',
                                        flexDirection: 'column',

                                        justifyContent: "center",
                                    }}
                                >
                                    {/* Stars Rating */}
                                    <div className="Stars"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',

                                        }}
                                    >

                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: '"Airbnbcereal", sans-serif',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '15px',

                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {review.stars}
                                        </Typography>

                                        {/* Render 5 Stars */}
                                        <div style={{ display: 'flex', justifyContent: 'center', }}>
                                            <ReviewStars
                                                stars={review.stars}
                                                starcolorfiled={review.starcolorfiled}
                                                starcolorempty={review.starcolorempty}
                                            />
                                        </div>
                                    </div>
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontWeight: 'bold',

                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {t('Avarage rating on this year')}
                                    </Typography>
                                </div>
                            ))}

                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '1px',
                                opacity: '0.8',
                                height: '100%',
                                backgroundColor: 'white',
                            }}
                        ></div>
                    </div>

                    <div className="Chart"

                        style={{
                            flex: 0.8,
                            textAlign: 'center',
                            display: 'flex',
                            marginLeft: currentLanguage === 'ar' ? '-60px' : '15px',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#ffffff',
                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                opacity: '0.8',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {t('Performance Rating')}
                        </Typography>
                        <div className="RatingPerformence"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                        >
                            <div className="Leader1 "
                                style={{
                                    display: 'flex',
                                    width: '105%',
                                    gap: '6px',
                                    padding: '10px',
                                }}
                            >
                                {Ratingleader.map((review, index) => (
                                    <div className="Rating5"
                                        style={{
                                            border: '1px solid white',
                                            padding: '5px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center',
                                                fontWeight: 'bold',

                                                fontSize: '14px',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {t(review.level)}
                                        </Typography>
                                        {/* Stars */}

                                        <div className="ReviewStars"

                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: '100%',
                                                flexDirection: 'column',
                                                justifyContent: "center",
                                            }}
                                        >
                                            {/* Stars Rating */}
                                            <div className="Stars"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginTop: '-6px',

                                                }}
                                            >



                                                {/* Render 5 Stars */}
                                                <div style={{ display: 'flex', justifyContent: 'center', }}>
                                                    <ReviewStars
                                                        stars={review.stars}
                                                        starcolorfiled={review.starcolorfiled}
                                                        starcolorempty={review.starcolorempty}

                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}


                            </div>

                        </div>
                        <div className="LastTypo">
                            <Typography
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {t('Satisfaction Score Card')}
                            </Typography>
                        </div>
                    </div>
                </div>



            </div>
            <div className="Divider"
                style={{
                    width: '100%',
                    background: 'white',
                    opacity: '0.8',
                    height: '1px',
                }}
            >

            </div>
            <>
                {reviews.map((review, index) => {
                    // Verify review has all necessary properties
                    if (!review || !review.ratings || !review.buyerId) {
                        console.error("Invalid review data:", review);
                        return null;
                    }

                    // Ext ract rating categories from the review
                    const ratingCategories = [
                        {
                            name: 'Interaction Brilliance',
                            stars: review.ratings.interactionBrilliance,
                            perc: `${review.ratings.interactionBrilliance}/5`,
                            progbar: `${calculatePercentage(review.ratings.interactionBrilliance)}%`,
                            starcolorfiled: '#FFDF00',
                            starcolorempty: '#ccc'
                        },
                        {
                            name: 'Engagement',
                            stars: review.ratings.engagement,
                            perc: `${review.ratings.engagement}/5`,
                            progbar: `${calculatePercentage(review.ratings.engagement)}%`,
                            starcolorfiled: '#FFDF00',
                            starcolorempty: '#ccc'
                        },
                        {
                            name: 'Crafted Excellence',
                            stars: review.ratings.craftedExcellence,
                            perc: `${review.ratings.craftedExcellence}/5`,
                            progbar: `${calculatePercentage(review.ratings.craftedExcellence)}%`,
                            starcolorfiled: '#FFDF00',
                            starcolorempty: '#ccc'
                        },
                        {
                            name: 'Domain Expertise',
                            stars: review.ratings.domainExpertise,
                            perc: `${review.ratings.domainExpertise}/5`,
                            progbar: `${calculatePercentage(review.ratings.domainExpertise)}%`,
                            starcolorfiled: '#FFDF00',
                            starcolorempty: '#ccc'
                        }
                    ];

                    // Format date for display
                    const createdDate = new Date(review.createdAt);
                    const formattedDate = `${createdDate.toLocaleDateString()}`;

                    return (
                        <div className="UsersComment"
                            key={index}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                                borderBottom: "1px solid white",
                                paddingBottom: '10px',
                            }}
                        >
                            <div className="UserInfo"
                                style={{
                                    width: '40%',
                                    height: 'auto',
                                    padding: '10px 10px 10px 0',
                                    display: 'flex',
                                    gap: '20px',
                                    flexDirection: 'column',
                                }}
                            >
                                <div className="UserPhotoInfo"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    <div className="UserPhoto"
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            background: 'white',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '2px solid #ccc',
                                        }}
                                    >
                                        <img
                                            src={review.buyerId.profileImg}
                                            alt="Profile"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <div className="UserInfo"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'self-start',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '17px',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {review.buyerId.firstName} {review.buyerId.lastName}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                opacity: '0.8',
                                                fontSize: '14px',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {t('Joined date')}: {new Date(review.buyerId.createdAt).toLocaleDateString()}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#ffffff',
                                                fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                opacity: '0.8',
                                                fontSize: '14px',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : 'inherit',
                                                }}
                                            >
                                                {t('Total Reviews')}:
                                            </span>{' '}
                                            <span style={{ fontFamily: '"Airbnbcereal", sans-serif' }}>
                                                1
                                            </span>
                                        </Typography>
                                    </div>
                                </div>

                                {ratingCategories.map((category, starIndex) => (
                                    <div className="UserStars"
                                        key={starIndex}
                                        style={{
                                            display: 'flex',
                                            width: '90%',
                                            alignItems: 'center',
                                            marginTop: starIndex === 0 ? '-10px' : '-20px',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div className="Typo"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: '70%',
                                            }}
                                        >
                                            <div className="div"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: '#ffffff',
                                                        fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '14px',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {t(category.name)}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: '#ffffff',
                                                        fontFamily: '"Airbnbcereal", sans-serif',
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '15px',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {category.perc}
                                                </Typography>
                                            </div>
                                            <div className="ProgressBar"
                                                style={{
                                                    width: '100%',
                                                    height: '8px',
                                                    background: 'white',
                                                    borderRadius: '16px',
                                                    position: 'relative',
                                                }}
                                            >
                                                <div className="Bar"
                                                    style={{
                                                        width: category.progbar,
                                                        height: '8px',
                                                        background: 'rgb(91, 193, 253)',
                                                        borderRadius: '16px',
                                                        position: 'absolute',
                                                    }}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ReviewStars"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: '40%',
                                                marginRight: '10px',
                                                gap: '10px',
                                                marginLeft: '20px',
                                                marginTop: '16px',
                                                justifyContent: "center",
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <ReviewStars
                                                    stars={category.stars}
                                                    starcolorfiled={category.starcolorfiled}
                                                    starcolorempty={category.starcolorempty}
                                                />
                                            </div>
                                            <Typography
                                                sx={{
                                                    color: '#ffffff',
                                                    fontFamily: '"Airbnbcereal", sans-serif',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '13px',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {category.stars}
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="Divider2"
                                style={{
                                    width: '1px',
                                    height: '200px',
                                    background: '#fff',
                                    marginRight: '40px',
                                }}
                            >
                            </div>

                            <div className="UserReviewComment"
                                style={{
                                    width: '59%',
                                    marginTop: '30px',
                                    height: 'auto',
                                    padding: '10px',
                                }}
                            >
                                <div className="Average ReviewStars"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: '27%',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <ReviewStars
                                            stars={review.averageRating}
                                            starcolorfiled="#FFDF00"
                                            starcolorempty="#ccc"
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: '"Airbnbcereal", sans-serif',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {formattedDate}
                                    </Typography>
                                </div>

                                <div className="Comment"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '15px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#ffffff',
                                            fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                            lineHeight: '26px',
                                            fontWeight: 'bold',
                                            opacity: '0.8',
                                            fontSize: '14px',
                                            whiteSpace: 'wrap',
                                        }}
                                    >
                                        {review.comment}
                                    </Typography>
                                    <div className="BacktoWeb"
                                        style={{
                                            display: 'flex',
                                            gap: '10px',
                                        }}
                                    >
                                        <Button
                                            sx={{
                                                width: '32%',
                                                maxWidth: 360,
                                                color: 'white',
                                                border: '1px solid white',
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                borderRadius: '16px',
                                                maxHeight: '400px',
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: currentLanguage === 'ar' ? 'space-between' : 'space-between',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    flex: 1,
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                }}
                                            >
                                                {t('Publish Comment')}
                                            </Typography>
                                        </Button>
                                        <Button
                                            sx={{
                                                width: '32%',
                                                maxWidth: 360,
                                                color: 'white',
                                                border: '1px solid white',
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                borderRadius: '16px',
                                                maxHeight: '400px',
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: currentLanguage === 'ar' ? 'space-between' : 'space-between',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    flex: 1,
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
                                                }}
                                            >
                                                {t('Send a Message')}
                                            </Typography>
                                        </Button>
                                        <Button
                                            sx={{
                                                width: '10%',
                                                maxWidth: 360,
                                                color: 'white',
                                                border: '1px solid white',
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                borderRadius: '16px',
                                                maxHeight: '400px',
                                                height: '32px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <FavoriteIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>













        </div >
    )
}

export default ReviewRespoDesign