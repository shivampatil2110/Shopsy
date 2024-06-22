const express = require("express");
const app = express();
const connDB = require("./db/mongo");
const authGuard = require("./util/authGuard");
const setUserName = require("./util/setUserName");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");

app.use(express.json());

connDB();

app.use("/auth", authRoutes);
app.use(setUserName);
app.use(authGuard);
app.use("/products", productsRoutes);

app.listen(3500, () => {
  console.log("listening on 3500");
});
