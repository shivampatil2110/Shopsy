const User = require("../schema/user");
const Orders = require("../schema/orders");
const OrderItems = require("../schema/orderItems");
const Cart = require("../schema/cart");
const Products = require("../schema/products");
const { default: mongoose } = require("mongoose");
const { createInvoice } = require("./Invoice/Invoice");
const moment = require("moment");

const getAllOrders = async (req, res) => {
  try {
    let userId = req.cookies.userId;

    let user = await User.findOne({ _id: userId });

    let orders = await Orders.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "ordersitems",
          localField: "_id",
          foreignField: "orderId",
          as: "orderItems",
        },
      },
      { $unwind: "$orderItems" },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.productId",
          foreignField: "_id",
          as: "orderItems.productInfo",
        },
      },
      { $unwind: "$orderItems.productInfo" },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          shipTo: { $first: "$shipTo" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          products: {
            $push: {
              productId: "$orderItems.productInfo._id",
              name: "$orderItems.productInfo.name",
              description: "$orderItems.productInfo.description",
              price: "$orderItems.productInfo.price",
              quantity: "$orderItems.quantity",
              image: "$orderItems.productInfo.productImage",
              totalPrice: {
                $multiply: [
                  "$orderItems.quantity",
                  "$orderItems.productInfo.price",
                ],
              },
            },
          },
        },
      },
    ]);

    let address = user.address;

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
    let userId = req.cookies.userId;

    let cart = req.body.cart;
    let shipTo = req.body.addressId;

    let totalAmount = 0;
    let itemsArray = [];
    for (let item of cart) {
      let productId = item.productId.toString("hex");
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
      shipTo,
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

const generateInvoice = async (req, res) => {
  const order = req.body;
  const products = [];
  for (let product of order.products) {
    let obj = {};
    obj.item = product.name;
    obj.description = product.description;
    obj.quantity = product.quantity;
    obj.amount = product.totalPrice;
    products.push(obj);
  }
  const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      postal_code: 94111,
    },
    items: products,
    subtotal: order.totalAmount,
    paid: 0,
    invoice_nr: order._id,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  };
  createInvoice(invoice, "invoice.pdf", res);
};

module.exports = {
  getAllOrders,
  getOrder,
  editOrder,
  createOrder,
  deleteOrder,
  generateInvoice,
};
