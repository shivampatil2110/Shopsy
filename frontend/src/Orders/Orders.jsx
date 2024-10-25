import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { GlobalContext } from "../util/GlobalState";
import Spinner from "../util/Spinner";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/orders/getAllOrders`,
          { withCredentials: true }
        );
        response.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error getting orders");
      }
    }
    getOrders();
  }, []);

  function truncateText(text) {
    if (text.length > 60) {
      return text.slice(0, 57) + "...";
    }
    return text;
  }

  async function generateInvoice(order) {
    try {
      console.log(order);
      let userId = Cookie.get("userId");
      let response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/orders/generateInvoice`,
        { order, userId },
        {
          withCredentials: true,
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateOrderStatus(event, orderId) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const value = selectedOption.value;
    try {
      let response = await axios.patch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/orders/editOrder`,
        { orderId, value },
        { withCredentials: true }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: value } : order
        )
      );
    } catch (error) {
      toast.error(error);
    }
  }

  function redirectToProductPage(productId) {
    navigate(`/products/${productId}`);
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : orders.length == 0 ? (
        <p className="text-gray-600">No orders to show</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div className="bg-white border rounded-md p-4 w-full max-w-7xl mx-auto mt-4">
              {/* Order Information */}
              <div className="flex justify-between mb-4 ">
                <div>
                  <p className="text-gray-600">ORDER PLACED</p>
                  <p className="font-semibold">
                    {moment(order.createdAt).format("DD MMMM YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">TOTAL</p>
                  <p className="font-semibold">Rs.{order.totalAmount}</p>
                </div>
                <div>
                  <p className="text-gray-600">SHIP TO</p>
                  <p className="font-semibold">{order.shipTo}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">ORDER # {order._id}</p>
                  <div className="text-blue-500">
                    <button className="hover:underline">
                      View order details
                    </button>{" "}
                    |{" "}
                    <button
                      className="hover:underline"
                      onClick={() => {
                        generateInvoice(order);
                      }}
                    >
                      Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Refund Status */}
              <div className="border-t pt-4 grid text-left">
                <p className="text-xl font-semibold text-green-600 mb-2">
                  {order.status.toUpperCase()}
                </p>

                {order.products.map((product) => (
                  <div
                    className="items-center mb-4 cursor-pointer"
                    onClick={() => {
                      redirectToProductPage(product.productId);
                    }}
                  >
                    <img
                      src="path-to-your-image.png"
                      alt="Product"
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <p className="text-gray-800">{product.name}</p>
                    <p className="text-gray-600">
                      {truncateText(product.description)}
                    </p>
                    <p className="text-gray-400">
                      {" "}
                      <strong>Total Price:</strong> Rs.{product.totalPrice}
                    </p>
                    <hr />
                  </div>
                ))}

                {/* Buttons */}
                <div className="flex space-x-4">
                  {state.isAdmin != "true" && (
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                      Leave seller feedback
                    </button>
                  )}

                  {state.isAdmin == "true" && (
                    <select
                      className="bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300"
                      onChange={(e) => updateOrderStatus(e, order._id)}
                      disabled={
                        order.status === "delivered" ||
                        order.status === "Delivered"
                      }
                    >
                      <option value="Update Status">Update Status</option>
                      {order.status === "confirmed" && (
                        <option value="shipped">Shipped</option>
                      )}
                      {order.status === "shipped" && (
                        <option value="delivered">Delivered</option>
                      )}
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
