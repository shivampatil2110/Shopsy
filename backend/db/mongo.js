const mongoose = require("mongoose");
let retry_count = 0;

const connectDB = async () => {
  const uri =
    "mongodb+srv://shivampatil2110:5WfJUds8sG14TZav@cluster-e-commerce.bkhmyq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-E-commerce";
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB with Mongoose");
  } catch (e) {
    if (retry_count < 3) {
      console.log(
        "Error connecting to Mongo retrying for " + retry_count + " time"
      );
      retry_count++;
      connectDB();
      return;
    }
    console.error("Failed to connect to MongoDB", e);
    process.exit(1);
  }
};

module.exports = connectDB;
