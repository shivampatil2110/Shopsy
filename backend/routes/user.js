const express = require("express");
const router = express.Router();
const {
  userProfile,
  addAddress,
  getAddress,
  deleteAddress,
  editAddress,
  updateProfile,
} = require("../controller/userController");

router.get("/userProfile", userProfile);

router.get("/getAddress", getAddress);

router.post("/addAddress", addAddress);

router.post("/deleteAddress", deleteAddress);

router.put("/editAddress", editAddress);

router.post("/updateProfile", updateProfile);

module.exports = router;
