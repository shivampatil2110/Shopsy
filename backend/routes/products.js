const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
} = require("../controller/productsController");

router.get("/getAllProducts", getAllProducts);

router.get("/getProduct", getProduct);

router.post("/addProduct", addProduct);

router.put("/editProduct", editProduct);

router.delete("/deleteProduct", deleteProduct);

module.exports = router;
