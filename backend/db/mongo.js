const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = "mongodb://127.0.0.1:27017/E-commerce";
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB with Mongoose");
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    process.exit(1);
  }
};

module.exports = connectDB;
