import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';



const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [loginAttempts, setLoginAttempts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        totalPages: 1,
        totalAttempts: 0,
    });

    const fetchLoginAttempts = async (page = 1, limit = 3) => {
        if (!user?._id) return;

        try {
            console.log(`Fetching login attempts for page: ${page}`);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/server/users/${user._id}/login-attempts`,
                {
                    params: { page, limit },
                    withCredentials: true,
                }
            );
            console.log('Login Attemps', response.data.loginAttempts);

            setLoginAttempts(response.data.loginAttempts);
            setPagination({
                totalPages: response.data.totalPages,
                totalAttempts: response.data.totalAttempts
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch login attempts");
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchLoginAttempts(currentPage);
        }
    }, [user, currentPage]);
    
    const updateUserProfile = async (profileData) => {
        try {
            setIsProfileUpdated(false);
            console.log("Waiting for 2 seconds before updating...");
    
            await new Promise(resolve => setTimeout(resolve, 2000));
    
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/server/users/${user._id}/profile`,
                profileData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
    
            if (response.status === 200) {
                const updatedUserData = response.data.user;
                setUser(prevUser => ({
                    ...prevUser,
                    ...updatedUserData,
                    isProfileUpdated: true
                }));
                setIsProfileUpdated(true);
                
                // Update role states based on isBuyer value
                setIsBuyer(updatedUserData.isBuyer);
                setIsSeller(!updatedUserData.isBuyer);
                
                return { success: true, data: updatedUserData };
            }
            return { success: false, error: 'Update failed' };
        } catch (error) {
            console.error('Profile update error:', error);
            setIsProfileUpdated(false);
            return { success: false, error: error.response?.data?.message || 'Update failed' };
        }
    };
    
    const fetchUserVerificationStatus = async () => {
        if (user?._id) {
            console.log("Starting verification status fetch");
            setIsLoaded(false);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/server/users/verification/status/${user._id}`,
                    { withCredentials: true }
                );
    
                console.log("User Status response:", res.data);
                if (res.status === 200) {
                    setVerificationStatus(res.data);
                    console.log("User Status successfully set in context");
                }
            } catch (error) {
                console.error("Error fetching verification status:", error);
                setError("Error fetching verification status");
            } finally {
                setIsLoaded(true);
            }
        }
    };
    
    useEffect(() => {
        if (user) {
            fetchUserVerificationStatus();
        }
    }, [user]);

    const fetchUserData = async () => {
        console.log("Starting user data fetch");
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/server/users/user`;
            console.log("Fetching from:", url);
            
            const res = await axios.get(url, {
                withCredentials: true
            });

            console.log("Server response:", res.data);

            if (res.data) {
                setUser(res.data);
                setIsProfileUpdated(res.data.isProfileUpdated || false);
                
                // Set buyer/seller status based on isBuyer property
                setIsBuyer(res.data.isBuyer);
                setIsSeller(!res.data.isBuyer);
                
                console.log("User data successfully set in context");
                console.log("Role status - isBuyer:", res.data.isBuyer, "isSeller:", !res.data.isBuyer);
            }
            setIsLoaded(true);

        } catch (error) {
            console.error("Fetch error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setIsLoaded(true);
            setError("Network error. Please check your connection and try again.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const login = (userData) => {
        console.log("Setting user data in context:", userData);
        setUser(userData);
        setIsProfileUpdated(userData.isProfileUpdated || false);
        
        // Set buyer/seller status based on isBuyer property
        setIsBuyer(userData.isBuyer);
        setIsSeller(!userData.isBuyer);
        
        console.log("Login - Role status set to: isBuyer =", userData.isBuyer, "isSeller =", !userData.isBuyer);
    };

    const logout = () => {
        setUser(null);
        setIsProfileUpdated(false);
        setIsSeller(false);
        setIsBuyer(false);
        document.cookie = "accessToken=; Max-Age=0";
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
        return `${import.meta.env.VITE_BACKEND_URL}${cleanPath}`;
    };

    const updateUserCoverImage = (coverImageUrl) => {
        const updatedUser = { ...user, coverImg: coverImageUrl };
        setUser(updatedUser);
    };

    const updateUserProfileImage = (profileImageUrl) => {
        const updatedUser = { ...user, profileImg: profileImageUrl };
        setUser(updatedUser);
    };

    const getProfileImageUrl = () => getImageUrl(user?.profileImg);
    const getCoverImageUrl = () => getImageUrl(user?.coverImg);

    const updateUserVerificationStatus = (newRequest) => {
        setUser(prevUser => {
            const updatedRequests = prevUser?.requests ? [...prevUser.requests, newRequest] : [newRequest];
    
            const updatedUser = {
                ...prevUser,
                requests: updatedRequests,
            };
    
            return updatedUser;
        });
    };

    const fetchUserBySlug = async (slug) => {
        console.log(`Starting fetch for user with slug: ${slug}`);
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/server/users/slug/${slug}`;
            console.log("Fetching from:", url);
    
            const res = await axios.get(url, {
                withCredentials: true
            });
    
            console.log("Server response:", res.data);
    
            if (res.data) {
                return res.data; // Return the user data to be used in the component
            }
            
        } catch (error) {
            console.error("Fetch error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
    
            throw new Error("Failed to fetch user. Please try again.");
        }
    };

    
    return (
        <UserContext.Provider value={{
            user,
            isProfileUpdated,
            isSeller,
            isBuyer,
            isLoaded,
            error,
            setUser,
            loginAttempts,
            pagination,
            currentPage,
            setCurrentPage,
            login,
            logout,
            updateUserProfile,
            verificationStatus,
            updateUserCoverImage,
            updateUserProfileImage,
            updateUserVerificationStatus,
            getImageUrl,
            getProfileImageUrl,
            getCoverImageUrl,
            fetchUserBySlug,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);