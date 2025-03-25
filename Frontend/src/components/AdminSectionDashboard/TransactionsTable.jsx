import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";

const TransactionsTable = ({transactions}) => {
 

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
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Type</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Currency</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Method</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {transactions.length > 0 ? (
  transactions.map((transaction) => (
    <TableRow key={transaction.id}>
      <TableCell sx={{ color: "white" }}>
        {new Date(transaction.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold" }}>{transaction.type}</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold" }}>${transaction.amount.toFixed(2)}</TableCell>
      <TableCell sx={{ color: "white" }}>{transaction.currency}</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold" }}>{transaction.method}</TableCell>
      <TableCell>
        <Chip
          label={transaction.status}
          color={
            transaction.status === "completed"
              ? "success"
              : transaction.status === "pending"
              ? "warning"
              : "error"
          }
        />
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={6} sx={{ textAlign: "center", color: "gray", fontStyle: "italic" }}>
      No transactions found
    </TableCell>
  </TableRow>
)}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
