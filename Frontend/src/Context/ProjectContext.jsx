import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjectByConversationId = async (conversationId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/server/projects/by-conversation/${conversationId}`,
        { withCredentials: true }
      );

      console.log("Projects For Selected Conversation", response.data);
      setProject(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  const sendValidationRequest = async (projectId, lastPrice, deliveryTimeISO) => {
    setLoading(true);
    setError(null);
  
    try {
      // Validate input data
      if (!lastPrice || !deliveryTimeISO) {
        throw new Error('Last price and delivery date are required.');
      }
  
      // Sanitize lastPrice: Remove commas and convert to number
      const sanitizedLastPrice = parseFloat(lastPrice.replace(/,/g, ''));
  
      // Validate the numeric value
      if (isNaN(sanitizedLastPrice)) {
        throw new Error('Invalid price format');
      }
  
      // Send the validation request to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/projects/${projectId}/validation-request`,
        { 
          lastPrice: sanitizedLastPrice,
          deliveryTime: deliveryTimeISO // Send ISO date string
        },
        { withCredentials: true }
      );
  
      // Update the local project state
      setProject(response.data.project);
  
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const declineOffer = async (projectId,) => {
    setLoading(true);
    setError(null);

    try {
      // Send the decline request to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/projects/${projectId}/decline`,
        {},
        { withCredentials: true }
      );

      // Update the local project state
      setProject(response.data.project);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const acceptOffer = async (projectId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/projects/${projectId}/accept`,
        {},
        { withCredentials: true }
      );

      // Update the local project state
      setProject(response.data.project);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendProjectToBuyer = async (projectId) => {
    setLoading(true);
    setError(null);
  
    try {
      // Send the request to the backend to update the project status
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/projects/${projectId}/send-to-buyer`,
        {},
        { withCredentials: true }
      );
  
      // Update the local project state
      setProject(response.data.project);
  
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const releaseFunds = async (projectId) => {
    setLoading(true);
    setError(null);
  
    try {
      // Send the request to the backend to release funds
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/projects/${projectId}/release-funds`,
        {},
        { withCredentials: true }
      );
  
      // Update the local project state
      setProject(response.data.project);
  
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleNotSatisfied = async (projectId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/server/projects/${projectId}/request-changes`,
        {},
        { withCredentials: true }
      );
  
      // Update the local project state
      setProject(response.data.project);
  
    
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        fetchProjectByConversationId,
        loading,
        error,
        setProject,
        declineOffer,
        acceptOffer,
        sendValidationRequest,
        sendProjectToBuyer,
        handleNotSatisfied,
        releaseFunds
      }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
