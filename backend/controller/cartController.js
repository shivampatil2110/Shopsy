const Cart = require("../schema/cart");
const User = require("../schema/user");
const mongoose = require("mongoose");

const addItem = async (req, res) => {
  try {
    const productId = req.query.id;
    let { quantity } = req.body;
    let username = req.user;

    let user = await User.findOne({ email: username });

    let productExistsInCart = await Cart.findOne({ productId });

    if (productExistsInCart) {
      let updatedQuantity = quantity + productExistsInCart.quantity;
      let cart = {
        productId,
        quantity: updatedQuantity,
        userId: user.id,
      };
      let response = await Cart.findByIdAndUpdate(
        productExistsInCart.id,
        cart,
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).send(response);
    }

    let cart = new Cart({ productId, quantity, userId: user.id });
    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    res.send(error.message);
  }
};

const getItems = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user });

    let cartItems = await Cart.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(user.id) } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $lookup: {
          from: "categories",
          localField: "productInfo.categoryId",
          foreignField: "_id",
          as: "productInfo.categoryInfo",
        },
      },
      { $unwind: "$productInfo.categoryInfo" },
    ]);

    res.status(200).send(cartItems);
  } catch (error) {
    res.send(404).send({ msg: "No items found in the cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    let { cartId } = req.query.id;
    let count = req.body;

    let response = await Cart.findByIdAndUpdate(
      cartId,
      { $set: { quantity: count } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.send().send(response);
  } catch (error) {
    res.status(500).send({ msg: "cannot update cart" });
  }
};

const deleteItem = async (req, res) => {
  try {
    let cartId = req.query.id;
    await Cart.findByIdAndDelete({ _id: cartId });
    res.status(200).send({ msg: "successfully deleted" });
  } catch (error) {
    res.status(500).send({ msg: "cannot delete cart" });
  }
};

const deleteCart = async (req, res) => {
  try {
    let user = req.cookies.userId;

    await Cart.deleteMany({ userId: user });

    res.status(200).send({ msg: "cart cleared" });
  } catch (error) {
    res.status(500).send({ msg: "cannot delete cart" });
  }
};

module.exports = { addItem, getItems, updateCart, deleteItem, deleteCart };
