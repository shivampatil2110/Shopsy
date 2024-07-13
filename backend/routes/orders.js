const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  editOrder,
  deleteOrder,
  createOrder,
  generateInvoice,
} = require("../controller/ordersController");
const isAdmin = require("../util/checkUserAdmin");

router.get("/getAllOrders", getAllOrders);

router.get("/getOrder", getOrder);

router.post("/createOrder", createOrder);

router.post("/generateInvoice", generateInvoice);

router.put("/editOrder", isAdmin, editOrder);

router.delete("/deleteOrder", deleteOrder);

module.exports = router;
