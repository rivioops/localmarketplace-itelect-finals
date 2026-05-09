const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Load local env file
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Use MONGO_URI from Render Environment Variables
const mongoURI = process.env.MONGO_URI || process.env.DATABASE;

if (!mongoURI) {
  throw new Error(
    "MongoDB connection string is missing. Please add MONGO_URI in Render Environment Variables."
  );
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((err) => {
    console.log("DATABASE CONNECTION FAILED! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
  });

// Render automatically provides process.env.PORT
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

const server = app.listen(port, host, () => {
  console.log(`App running on ${host}:${port}...`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});