const express = require("express");
const app = express();
const path = require("path");
const qrCodeController = require("./controllers/qrCodeController");
const emailController = require("./controllers/emailController");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", qrCodeController);
app.use("/email", emailController);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
