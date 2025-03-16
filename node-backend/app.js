const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const egfrRoutes = require("./routes/egfrRoutes");

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// Routes
app.use("/api/users", userRoutes);
app.use("/api/egfrs", egfrRoutes);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://IT21315664:Himasha%401234@cluster0.gt7zi.mongodb.net/mydatabase"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

module.exports = app;
