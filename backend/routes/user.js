const express = require("express");
const router = express.Router();
const {
  userProfile,
  addAddress,
  getAddress,
  deleteAddress,
  editAddress,
} = require("../controller/userController");

router.get("/userProfile", userProfile);

router.get("/getAddress", getAddress);

router.post("/addAddress", addAddress);

router.post("/deleteAddress", deleteAddress);

router.put("/editAddress", editAddress);

module.exports = router;
