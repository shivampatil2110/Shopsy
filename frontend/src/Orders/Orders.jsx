import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../util/Spinner";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      try {
        let response = await axios.get(
          "http://localhost:35000/orders/getAllOrders",
          { withCredentials: true }
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
      let response = await axios.post(
        "http://localhost:35000/orders/generateInvoice",
        order,
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
                  <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                    View Return/Refund Status
                  </button>
                  <button className="bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300">
                    Leave seller feedback
                  </button>
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
