const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  editOrder,
  deleteOrder,
  createOrder,
} = require("../controller/ordersController");
const isAdmin = require("../util/checkUserAdmin")

router.get("/getAllOrders", getAllOrders);

router.get("/getOrder", getOrder);

router.post("/createOrder", createOrder);

router.put("/editOrder", editOrder);

router.delete("/deleteOrder", deleteOrder);

module.exports = router;
