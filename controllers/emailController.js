const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const qrcode = require("qrcode");
require("dotenv").config();

// POST route for sending an email with the QR code
router.post("/send", async (req, res, next) => {
  try {
    const { recipientEmail, qrCodeURL } = req.body;

    // Check if qrCodeURL is empty or undefined
    if (!qrCodeURL || qrCodeURL.trim() === "") {
      return res.status(400).send("QR code URL is missing or empty");
    }

    // Generate QR code as base64 image
    const qrCodeImage = await qrcode.toDataURL(qrCodeURL);

    // Send the email
    await sendEmail(recipientEmail, qrCodeImage);

    // Send a success response
    res.status(200).send("Email sent successfully");
  } catch (error) {
    // Handle any errors that occur during email sending
    next(error);
  }
});

// Function to send an email
async function sendEmail(recipientEmail, qrCodeImage) {
  // Check if qrCodeImage is empty or undefined
  if (!qrCodeImage || qrCodeImage.trim() === "") {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: recipientEmail,
    subject: "QR Code",
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeImage.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = router;
