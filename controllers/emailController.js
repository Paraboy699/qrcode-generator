const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST route for sending an email with the QR code
router.post("/send", async (req, res, next) => {
  try {
    const { recipientEmail, qrCodeURL } = req.body;
    await sendEmail(recipientEmail, qrCodeURL);
    res.send("Email sent successfully");
  } catch (error) {
    next(error);
  }
});

async function sendEmail(recipientEmail, qrCodeURL) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "myassa92@gmail.com",
      pass: "asaeqndzxtayfscr",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: recipientEmail,
    subject: "QR Code",
    html: `<img src="${qrCodeURL}">`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = router;
