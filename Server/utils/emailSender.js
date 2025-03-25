import nodemailer from "nodemailer";

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'securekds2@gmail.com',
        pass: 'zstc oldk maxp ylen'
    },
    tls: {
        rejectUnauthorized: false
      }
});

// Function to send an email
export const sendEmail = async (to, subject, message) => {
    const mailOptions = {
        from: '"Khadmat Platform" <khadamat-security@khadamat.com>',
        to: to,
        subject: subject,
        html: message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

// Function to send the reset code email
export const sendResetCode = async (email, code) => {
    const subject = "Your Password Reset Code";
    const message = `<p>Your password reset code is: <strong>${code}</strong></p>
                     <p>This code will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>`;

    await sendEmail(email, subject, message);
};



// Function to send the registration email with the password
export const sendRegistrationPassword = async (email, firstName, password) => {
    const subject = "Your Khadmat Platform Account Password";
    
    // Image URL
    const headerImageUrl = "https://res.cloudinary.com/damicjacf/image/upload/v1729534700/freepik__comic-art-graphic-novel-art-comic-illustration-hig__26789_LE_auto_x2_colored_eyjkrx.jpg";

    // Construct the email message with HTML content
    const message = `
        <div class="Container" style="width: 100%; margin: 0; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div class="CoverPhoto" style="min-height: 400px; width: 100%; background: #fff; color: #344767; background-image: url('${headerImageUrl}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
            </div>
            <div style="padding: 20px; text-align: center;">
                <p>Hello ${firstName}!</p>
                <p>Your account has been successfully created. Here is your generated password:</p>
                <p><strong style="font-size: 20px; color: #3E8EDE;">${password}</strong></p>
                <p>Please keep this password secure, and consider updating it after your first login.</p>
            </div>
            <footer style="padding: 10px; background-color: #f9f9f9; text-align: center;">
                <p>If you have any questions or need assistance, feel free to reach out to our support team:</p>
                <p>Email: <a href="mailto:support@khadamt.com">support@khadamt.com</a></p>
                <p>Phone: +1 (234) 567-8901</p>
            </footer>
        </div>
    `;

    await sendEmail(email, subject, message);
};



// Function to send the email verification code
export const sendEmailVerification = async (email, firstName, emailCode) => {
    const subject = "Your Email Verification Code";
    
    // Image URL (Can be customized)
    const headerImageUrl = "https://res.cloudinary.com/damicjacf/image/upload/v1729534700/freepik__comic-art-graphic-novel-art-comic-illustration-hig__26789_LE_auto_x2_colored_eyjkrx.jpg";

    // Construct the email message with HTML content
    const message = `
        <div class="Container" style="width: 100%; margin: 0; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div class="CoverPhoto" style="min-height: 400px; width: 100%; background: #fff; color: #344767; background-image: url('${headerImageUrl}'); background-size: cover; background-repeat: no-repeat; background-position: center;">
            </div>
            <div style="padding: 20px; text-align: center;">
                <p>Hello ${firstName}!</p>
                <p>Here is your email verification code:</p>
                <p><strong style="font-size: 20px; color: #3E8EDE;">${emailCode}</strong></p>
                <p>This code will expire in 2 minutes. Please use it before it expires.</p>
            </div>
            <footer style="padding: 10px; background-color: #f9f9f9; text-align: center;">
                <p>If you have any questions or need assistance, feel free to reach out to our support team:</p>
                <p>Email: <a href="mailto:support@khadamt.com">support@khadamt.com</a></p>
                <p>Phone: +1 (234) 567-8901</p>
            </footer>
        </div>
    `;

    // Call the sendEmail function (you need to implement this)
    await sendEmail(email, subject, message);
};


