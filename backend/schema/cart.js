const mongoose = require("mongoose");
const User = require("./user");
const Products = require("./products");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Products,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
