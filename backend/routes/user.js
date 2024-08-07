const express = require("express");
const router = express.Router();
const {
  userProfile,
  addAddress,
  getAddress,
  deleteAddress,
} = require("../controller/userController");

router.get("/userProfile", userProfile);

router.get("/getAddress", getAddress);

router.post("/addAddress", addAddress);

router.post("/deleteAddress", deleteAddress);

module.exports = router;
