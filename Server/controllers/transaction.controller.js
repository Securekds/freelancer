import Transaction from "../models/transaction.model.js";

export const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching transactions for user:", userId); // Log userId

    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    console.log("Fetched Transactions:", transactions); // Log fetched transactions

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Server Error:", error); // Log server error
    res.status(500).json({ message: "Server error." });
  }
};