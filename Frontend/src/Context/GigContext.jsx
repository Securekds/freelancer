import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const GigContext = createContext();

// Provider Component
export const GigProvider = ({ children }) => {
    const [gigs, setGigs] = useState([]);
    const [programmingGigs, setProgrammingGigs] = useState([]);
    const [designGigs, setDesignGigs] = useState([]);
    const [marketingGigs, setMarketingGigs] = useState([]);
    const [architectureGigs, setArchitectureGigs] = useState([]);
    const [accountingGigs, setAccountingGigs] = useState([]);
    const [writingGigs, setWritingGigs] = useState([]);
    const [supportGigs, setSupportGigs] = useState([]);
    const [adviceGigs, setAdviceGigs] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState("all");
    const [isGigLoading, setIsGigLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [gig, setGig] = useState(null); // Single gig state
    const [gigError, setGigError] = useState(null); // Error for single gig
    const [offers, setOffers] = useState([]);
    const [offersLoaded, setOffersLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [offersError, setOffersError] = useState(null);
    const [offersCache, setOffersCache] = useState({}); // Cache for offers
    const [offerCount, setOfferCount] = useState(0);
    const [gigOfferCounts, setGigOfferCounts] = useState({}); // Store gig offer counts




    const fetchGigs = async (page = 1, limit = 10) => {
        setIsLoaded(false);
        setError(null);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/server/gigs/all-gigs`, {
                params: { page, limit }, // Send pagination parameters
                withCredentials: true, // Ensures cookies are sent
            });

            console.log("Fetched gigs:", response.data);
            const { gigs: fetchedGigs, totalPages, currentPage } = response.data;

            setGigs(fetchedGigs);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);

            // Example: Accessing offerCount for each gig
            fetchedGigs.forEach((gig) => {
                console.log(`Gig ID: ${gig._id}, Offer Count: ${gig.offerCount}`);
            });

            // Apply filters as needed
            filterProgrammingGigs(fetchedGigs);
            filterDesignGigs(fetchedGigs);
            filterMarketingGigs(fetchedGigs);
            filterArchitectureGigs(fetchedGigs);
            filterAccountingGigs(fetchedGigs);
            filterWritingGigs(fetchedGigs);
            filterSupportGigs(fetchedGigs);
            filterAdviceGigs(fetchedGigs);
        } catch (err) {
            console.error("Error fetching gigs:", err);
            setError("Failed to load gigs. Please try again later.");
        } finally {
            setIsLoaded(true);
        }
    };

    // Filter functions (unchanged)
    const filterProgrammingGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Programming" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setProgrammingGigs(filteredGigs);
    };

    const filterDesignGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Design" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setDesignGigs(filteredGigs);
    };

    const filterMarketingGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Marketing" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setMarketingGigs(filteredGigs);
    };

    const filterArchitectureGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Architecture" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setArchitectureGigs(filteredGigs);
    };

    const filterAccountingGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Finance & Accounting" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setAccountingGigs(filteredGigs);
    };

    const filterSupportGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Customer Support" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setSupportGigs(filteredGigs);
    };

    const filterWritingGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Writing & Translation" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setWritingGigs(filteredGigs);
    };

    const filterAdviceGigs = (gigsData) => {
        const filteredGigs = gigsData?.filter(
            (gig) =>
                gig?.selectedCategory?.name === "Consulting & Advice" &&
                (selectedSubCategory === "all" || gig.selectedSubCategory === selectedSubCategory)
        );
        setAdviceGigs(filteredGigs);
    };

    // Fetch a single gig by ID with offers included
    const fetchGigById = async (gigId) => {
        setIsGigLoading(true); // Use dedicated loading state

        setGig(null);
        setGigError(null);
        setOffers([]);
        setOffersLoaded(false);
        setOffersError(null);
        setOfferCount(0); // Reset offer count

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/server/gigs/gig/${gigId}`, {
                withCredentials: true // Ensures cookies are sent
            });

            console.log("Fetched single gig with offers:", response.data);
            setGig(response.data.gig);

            // Update offers from the same response
            if (response.data.offers) {
                setOffers(response.data.offers);
                setOffersLoaded(true);
                setOfferCount(response.data.offers.length); // Set offer count

                // Update cache
                setOffersCache(prev => ({
                    ...prev,
                    [gigId]: response.data.offers
                }));
            }
        } catch (err) {
            console.error("Error fetching gig data:", err);
            setGigError("Failed to fetch gig. Please try again.");
            setOffersError("Failed to fetch offers for this gig.");
        } finally {
            setIsGigLoading(false); // Update correct loading state
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };


    // Load gigs on mount
    useEffect(() => {
        fetchGigs(currentPage);
    }, [currentPage]);

    // Re-filter gigs when selected subcategory changes
    useEffect(() => {
        filterProgrammingGigs(gigs);
        filterDesignGigs(gigs);
        filterMarketingGigs(gigs);
        filterArchitectureGigs(gigs);
        filterAccountingGigs(gigs);
        filterWritingGigs(gigs);
        filterSupportGigs(gigs);
        filterAdviceGigs(gigs);
    }, [selectedSubCategory, gigs]);

    return (
        <GigContext.Provider
            value={{
                gigs,
                programmingGigs,
                selectedSubCategory,
                designGigs,
                marketingGigs,
                architectureGigs,
                accountingGigs,
                writingGigs,
                gigOfferCounts,

                supportGigs,
                adviceGigs,
                setSelectedSubCategory,
                isLoaded,
                error,
                gig,

                offers,
                offersLoaded,
                gigError,
                fetchGigs,
                fetchGigById,
                isGigLoading,
                currentPage,
                totalPages,
                handlePageChange,

            }}
        >
            {children}
        </GigContext.Provider>
    );
};

// Custom Hook
export const useGig = () => useContext(GigContext);