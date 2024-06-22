const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  getProduct,
} = require("../controller/productsController");

router.get("/getAllProducts", getAllProducts);

router.get("/getProduct", getProduct);

router.post("/addProduct", addProduct);

module.exports = router;
