import Wallet from '../models/buyerswallet.model.js';



export const getUserWallet = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from params

    
    const wallet = await Wallet.findOne({ userId });
    
    if (!wallet) {
      console.log("No wallet found for user:", userId);
      return res.status(404).json({ message: "Wallet not found" });
    }

    console.log("Wallet found:", wallet);
    res.status(200).json({wallet});
  } catch (error) {
    console.error("Wallet fetch error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message // Send actual error in development
    });
  }
};