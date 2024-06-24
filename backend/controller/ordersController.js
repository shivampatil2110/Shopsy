const User = require("../schema/user");
const Orders = require("../schema/orders");
const OrderItems = require("../schema/orderItems");
const Cart = require("../schema/cart");
const Products = require("../schema/products");

const getAllOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    let userId = user.id;

    let orders = await Orders.find({ userId });

    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

const getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    let userId = user.id;

    let order = await Orders.findOne({ userId, orderId: req.query.orderId });

    let orderItems = await OrderItems.find({ orderId: order.id });

    let finalArr = [];
    for (const item of orderItems) {
      let productId = item.productId.id.toString("hex");
      let product = await Products.findOne({ _id: productId });
      let obj = {
        quantity: item.quantity,
        totalPrice: item.price,
        productName: product.name,
        productPrice: product.price,
      };
      finalArr.push(obj);
    }
    res.status(200).send(finalArr);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

const editOrder = () => {};

const createOrder = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    let userId = user.id;

    let cart = await Cart.find({ userId });

    let totalAmount = 0;
    let itemsArray = [];
    for (let item of cart) {
      let productId = item.productId.id.toString("hex");
      let product = await Products.findOne({ _id: productId });
      let totalCost = product.price * item.quantity;
      totalAmount += totalCost;
      itemsArray.push({
        productId,
        quantity: item.quantity,
        price: totalCost,
      });
    }

    let order = new Orders({
      userId,
      totalAmount,
    });
    let response = await order.save();

    let orderId = response._id;
    const orderItemsPromises = itemsArray.map((items) => {
      let orderItem = new OrderItems({
        orderId,
        productId: items.productId,
        quantity: items.quantity,
        price: items.price,
      });
      return orderItem.save();
    });
    await Promise.all(orderItemsPromises);
    res.status(200).send("Order created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteOrder = async (req, res) => {};

module.exports = {
  getAllOrders,
  getOrder,
  editOrder,
  createOrder,
  deleteOrder,
};
