const express = require("express");
const app = express();
const connDB = require("./db/mongo");
const authGuard = require("./util/authGuard");
const setUserName = require("./util/setUserName");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const cartRoutes = require("./routes/cart");

app.use(express.json());

connDB();

app.use("/auth", authRoutes);
app.use(setUserName);
app.use(authGuard);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/cart", cartRoutes);

app.listen(3500, () => {
  console.log("listening on 3500");
});
