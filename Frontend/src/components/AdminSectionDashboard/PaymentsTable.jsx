import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";



const PaymentsTable = ({payments}) => {



  return (
    <TableContainer component={Paper}
    sx={{ overflowX: "auto", width: "100%" ,
        background: 'rgba(0, 0, 0, 0.2)',
        marginBottom : '20px',

    }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }} ><strong>Payment ID</strong></TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}><strong>Amount</strong></TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}><strong>Currency</strong></TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}><strong>Status</strong></TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}><strong>Payer ID</strong></TableCell>
            <TableCell sx={{ fontWeight: "bold" , color: 'white'  }}><strong>Created At</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment.paymentId}>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>{payment.paymentId}</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>${payment.amount}</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>{payment.currency}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={payment.status.toLowerCase() === "completed" ? "success" : "warning"}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>{payment.payerId}</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  {new Date(payment.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: "center", color: "white" }}>
                No payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentsTable;
