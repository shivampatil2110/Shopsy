const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
} = require("../controller/categoriescontroller");
const isAdmin = require("../util/checkUserAdmin");

router.get("/getCategories", getCategories);

router.post("/addCategory", isAdmin, addCategory);

module.exports = router;
