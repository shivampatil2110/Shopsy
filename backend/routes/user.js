const express = require("express");
const router = express.Router();
const {
  userProfile,
  addAddress,
  getAddress,
} = require("../controller/userController");

router.get("/userProfile", userProfile);

router.get("/getAddress", getAddress);

router.post("/addAddress", addAddress);

module.exports = router;
