const express = require("express");
const router = express.Router();
const {
  addItem,
  getItems,
  updateCart,
  deleteItem,
  deleteCart,
} = require("../controller/cartController");

router.post("/addItem", addItem);

router.get("/getItems", getItems);

router.put("/updateCart", updateCart);

router.delete("/deleteItem", deleteItem);

router.delete("/deleteCart", deleteCart);

module.exports = router;
