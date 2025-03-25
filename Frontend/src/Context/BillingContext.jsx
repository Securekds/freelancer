import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from './UserContext.jsx';


const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
      const { user } = useUser(); 
      const userId = user?._id; // Extract userId

  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]); // State for invoices
  const [loadingInvoices, setLoadingInvoices] = useState(true); // Loading state for invoices
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [error, setError] = useState(null);
  const [errorTransaction, setErrorTransaction] = useState(null);
  const [errorInvoices, setErrorInvoices] = useState(null); // Error state for invoices


  useEffect(() => {
    if (!userId) return;

    const fetchWallet = async () => {
      try {
        const response  = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/server/wallet/balance/${userId}`,
          { withCredentials: true }
        );
        const fetchedWallet = response.data.wallet;
        setWallet(fetchedWallet);

        setWallet(data);
      } catch (err) {
        setError("Failed to fetch wallet balance.");
      } finally {
        setLoadingWallet(false);
      }
    };
    const fetchTransactions = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/server/transactions/user-transactions/${userId}`,
            { withCredentials: true }
          );
          console.log("Transactions Response:", response.data); // Log transactions response
          const fetchedTransactions = response.data.transactions || response.data; // Handle both cases
          setTransactions(fetchedTransactions);
        } catch (err) {
          console.error("Transactions Error:", err); // Log transactions error
          setErrorTransaction("Failed to fetch transactions.");
        } finally {
          setLoadingTransactions(false);
        }
      };

      const fetchInvoices = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/server/invoices/user-invoices/${userId}`,
            { withCredentials: true }
          );
          console.log("Invoices Response:", response.data); // Log invoices response
          const fetchedInvoices = response.data.invoices || response.data; // Handle both cases
          setInvoices(fetchedInvoices);
        } catch (err) {
          console.error("Invoices Error:", err); // Log invoices error
          setErrorInvoices("Failed to fetch invoices.");
        } finally {
          setLoadingInvoices(false);
        }
      };

    fetchWallet();
    fetchInvoices(); // Fetch invoices
    fetchTransactions();
  }, [userId]);


  return (
    <BillingContext.Provider
     value={{ wallet,
      transactions,
       loadingWallet,
        loadingTransactions,
         error ,
          errorTransaction,
          errorInvoices, 
          invoices, 
          loadingInvoices,


           }}>
      {children}
    </BillingContext.Provider>
  );
};

// Hook for easy access
export const useBilling = () => useContext(BillingContext);
