const mongoose = require("mongoose");
const User = require("./user");

const ordersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["confirmed", "shipped", "delivered"],
    default: "confirmed",
  },
  shipTo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
