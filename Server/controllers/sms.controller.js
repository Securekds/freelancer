import { sendSMS } from "../utils/smsService.js";
import User from "../models/user.model.js";


export const sendVerificationCode = async (req, res) => {
  const { phone, userId } = req.body;

  if (!phone) {
      return res.status(400).json({ message: "Phone number is required!" });
  }

  try {
      // Generate a 6-digit OTP
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiryTime = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

      // Find user by phone or userId and update OTP fields
      const query = userId ? { _id: userId } : { phoneNumber: phone };
      const user = await User.findOneAndUpdate(
          query,
          {
              $set: {
                  phoneNumber: phone,
                  phoneCode: verificationCode,
                  phoneCodeExpiry: expiryTime
              }
          },
          { new: true }
      );

   

      // Send OTP via SMS
      await sendSMS(phone, verificationCode);

      console.log('Verification code stored:', {
          phone,
          code: verificationCode,
          expiry: expiryTime
      });

      res.status(200).json({ message: "Verification code sent!" });
  } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send SMS." });
  }
};

export const verifyOTP = async (req, res) => {
  const { userId, code } = req.body;

  if (!userId || !code) {
      return res.status(400).json({ message: "User ID and code are required!" });
  }

  try {
      const user = await User.findById(userId);

      if (!user) {
          console.log('User not found for ID:', userId);
          return res.status(404).json({ message: "User not found!" });
      }

      console.log('Verification attempt:', {
          userId,
          receivedCode: code,
          storedCode: user.phoneCode,
          isExpired: user.phoneCodeExpiry < new Date()
      });

      // Check if OTP matches
      if (user.phoneCode !== code.toString()) {
          return res.status(400).json({ message: "Invalid verification code!" });
      }

      // Check if OTP is expired
      if (user.phoneCodeExpiry && new Date() > user.phoneCodeExpiry) {
          return res.status(400).json({ message: "Verification code expired! Request a new one." });
      }

      // If everything is valid, verify the phone number
      user.isPhoneVerified = true;
      user.phoneCode = null;
      user.phoneCodeExpiry = null;
      await user.save();

      res.status(200).json({ message: "Phone number verified successfully!" });

  } catch (error) {
      console.error("OTP Verification Error:", error);
      res.status(500).json({ message: "Internal server error!" });
  }
};
