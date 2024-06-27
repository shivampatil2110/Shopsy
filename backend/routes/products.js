const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
} = require("../controller/productsController");
const isAdmin = require("../util/checkUserAdmin");

router.get("/getAllProducts", getAllProducts);

router.get("/getProduct", getProduct);

router.post("/addProduct", addProduct);

router.put("/editProduct", isAdmin, editProduct);

router.delete("/deleteProduct", isAdmin, deleteProduct);

module.exports = router;
