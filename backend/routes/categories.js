const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
} = require("../controller/categoriescontroller");

router.get("/getCategories", getCategories);

router.post("/addCategory", addCategory);

module.exports = router;
