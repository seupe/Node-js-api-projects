require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB using the connection string from the .env file and log the connection status to the console for debugging purposes
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Log MongoDB connection status to the console for debugging purposes and handle connection errors
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Middleware to parse JSON bodies and log requests to the console for debugging purposes
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
