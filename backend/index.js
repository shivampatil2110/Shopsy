const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connDB = require("./db/mongo");
const authGuard = require("./util/authGuard");
const setUserName = require("./util/setUserName");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");

app.use(express.json());
app.use(cookieParser());

connDB();

app.use("/auth", authRoutes);
app.use(setUserName);
app.use(authGuard);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);

app.listen(3500, () => {
  console.log("listening on 3500");
});
