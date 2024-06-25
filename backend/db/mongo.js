const mongoose = require("mongoose");

const connectDB = async () => {
  const uri =
    "mongodb+srv://shivampatil2110:5WfJUds8sG14TZav@cluster-e-commerce.bkhmyq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-E-commerce";
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB with Mongoose");
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    process.exit(1);
  }
};

module.exports = connectDB;
