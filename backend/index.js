const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connDB = require("./db/mongo");
const { json, urlencoded } = require("body-parser");
const authGuard = require("./util/authGuard");
const setUserName = require("./util/setUserName");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const userRoutes = require("./routes/user");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "https://shopsy-two.vercel.app",
    credentials: true,
  })
);

connDB();

app.use("/auth", authRoutes);
app.use(setUserName);
app.use(authGuard);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);

app.listen(35000, () => {
  console.log("listening on 35000");
});
