import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../util/GlobalState";
import { toast } from "react-toastify";
import Spinner from "../util/Spinner";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useContext(GlobalContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:35000/cart/getItems",
          { withCredentials: true }
        );
        setCart(response.data);
        setLoading(false);
        calculateTotalCost(response.data);
      } catch (error) {
        toast.error("Error fetching cart items");
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalCost(cart);
    setCartSize(cart);
  }, [cart]);

  const calculateTotalCost = (items) => {
    let total = 0;
    for (let item of items) {
      let quantity = item.quantity;
      let price = item.productInfo.price;
      total = total + quantity * price;
    }
    setTotalPrice(total);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:35000/cart/deleteItem?id=${productId}`,
        { withCredentials: true }
      );
      setCart(cart.filter((product) => product._id !== productId));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Error removing item from cart");
    }
  };

  const setCartSize = (cart) => {
    let quantity = 0;
    for (let item of cart) {
      quantity += item.quantity;
    }
    setState({ ...state, cart: quantity });
  };

  return (
    <>
      <div className="container mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    className="w-16 h-16 object-cover mr-4"
                    // src={product.image}
                    // alt={product.name}
                  />

                  <div className=" flex flex-col">
                    <div className="flex justify-start">
                      <h2 className="text-lg font-semibold ">
                        {product.productInfo.name}
                      </h2>
                    </div>

                    <div className="flex">
                      <p className="text-gray-600 mr-1">
                        Rs.{product.productInfo.price}
                      </p>
                      <p className="text-gray-600">x{product.quantity}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="">
              <hr />
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">
                Total: Rs {totalPrice.toFixed(2)}
              </p>
              <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">
                Checkout
              </button>
            </div>
          </div>
          // <></>
        )}
      </div>
    </>
  );
};

export default Cart;
