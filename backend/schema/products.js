const mongoose = require("mongoose");
const categories = require("./categories");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: String,
    required: true,
    min: 5,
  },
  productImage: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: categories,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
