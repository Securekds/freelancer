import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircularProgress, Box } from "@mui/material"; // Import spinner


const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/server/users/me`, 
                    { withCredentials: true }
                  );                console.log('Auth check successful:', response.data); // Log success
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Auth check failed:', err); // Log error
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        checkAuth();
    }, []);

   
    if (loading)
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh", // Full screen height
            }}
          >
            <CircularProgress />
          </Box>
        );

    return isAuthenticated ? children : <Navigate to="/dThZslg3uJ5rQ4OBZImUgcYZo7tGfhpJ/verifyunauth" />;
};

export default ProtectedRoute;
