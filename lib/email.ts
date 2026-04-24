import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (toEmail: string, otp: string) => {
  const mailOptions = {
    from: `"AIOS SECURITY" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🛡️ AIOS Agent - Security Token",
    html: `
      <div style="font-family: monospace; background-color: #000; color: #10b981; padding: 20px; border-radius: 5px;">
        <h2>AIOS Authentication</h2>
        <p>Your highly secure One-Time Password is:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; color: #fff;">${otp}</h1>
        <p>This code expires in 5 minutes. DO NOT SHARE.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};