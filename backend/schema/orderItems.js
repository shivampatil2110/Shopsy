const mongoose = require("mongoose");
const Orders = require("./orders");
const Products = require("./products");

const orderItemsSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Orders,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Products,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrdersItems = mongoose.model("OrdersItems", orderItemsSchema);

module.exports = OrdersItems;
