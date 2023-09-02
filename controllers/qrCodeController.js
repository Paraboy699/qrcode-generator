const express = require("express");
const router = express.Router();
const qrcode = require("qrcode");

// GET route for rendering the index page
router.get("/", (req, res) => {
  res.render("index", { qrCodeURL: null });
});

// POST route for generating a QR code
router.post("/generate", async (req, res, next) => {
  try {
    const { text } = req.body;
    const qrCodeURL = await generateQRCode(text);
    res.render("index", { qrCodeURL });
  } catch (error) {
    next(error);
  }
});

async function generateQRCode(text) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(text, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}

module.exports = router;
