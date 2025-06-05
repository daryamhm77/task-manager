const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
