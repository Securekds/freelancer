import axios from 'axios';

const INFOPBIP_API_KEY = "0181dd356840023e38b75c7ed25087ad-b400fbc3-f587-4571-835b-1d7f69f9f97a";
const INFOPBIP_BASE_URL = "https://2mzpwl.api.infobip.com";

export  const sendSMS = async (phoneNumber, verificationCode) => {
  try {
    const response = await axios.post(
      `${INFOPBIP_BASE_URL}/sms/2/text/advanced`,
      {
        messages: [
          {
            destinations: [{ to: phoneNumber }],
            text: `Your verification code is: ${verificationCode}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `App ${INFOPBIP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ SMS Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ SMS Failed:", error.response?.data || error.message);
    throw error;
  }
};


