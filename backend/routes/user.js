const express = require("express");
const router = express.Router();
const { userProfile } = require("../controller/userController");

router.get("/userProfile", userProfile);

module.exports = router;
