import React from 'react'
import PaymentsTable from './PaymentsTable'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionsTable from './TransactionsTable';

function UserFulldeatils() {
        const { userId } = useParams();
        const [payments, setPayments] = useState([]);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const fetchPayments = async () => {
                try {
                    const response = await axios.get
                    (
                        `${import.meta.env.VITE_BACKEND_URL}/server/get/payment/${userId}`,
                        { withCredentials: true }

                    );
                    setPayments(response.data.data);
                    console.log('User Payments' , response.data.data)
                } catch (error) {
                    console.error("Error fetching payments:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchPayments();
        }, [userId]);


        const [transactions, setTransactions] = useState([]);

        useEffect(() => {
          const fetchTransactions = async () => {
            try {
              const res = await axios.get
              (
                `${import.meta.env.VITE_BACKEND_URL}/server/get/transactions/${userId}`,
                { withCredentials: true }
               );
              setTransactions(res.data.data);
              console.log('User Transaction' ,res.data.data )
            } catch (error) {
              console.error("Error fetching transactions:", error);
            }
          };
      
          fetchTransactions();
        }, [userId]);


  

  return (
    <div
    style={{
        display : 'flex',
        flexDirection : 'column',
        gap : '5px',
        width : '96%'
    }}
    >
        <div className="PaymentRecord">
            <div style={{color : 'white' , fontWeight :'bold'}} >
                User Payment Record
            </div>
            <PaymentsTable payments={payments} />
        </div>
        <div className="PaymentRecord">
        <div style={{color : 'white' , fontWeight :'bold'}} >
                User Transaction
            </div>
            <TransactionsTable transactions={transactions} />
        </div>
      
    </div>
  )
}

export default UserFulldeatils
