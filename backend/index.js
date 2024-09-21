const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors")

const path = require("path");

// Configure environment variables
require("dotenv").config({
  path: "./.env"
});

const errorMiddleware = require("./middleware/error.js");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Enable CORS for all origins
app.use(cors());

// Default route for the root path
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running successfully."
  });
});

// MiddleWare for handling errors
app.use(errorMiddleware);

// Export app module for use in server
module.exports = app;
