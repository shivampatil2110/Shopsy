import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        let response = await axios.get(
          "http://localhost:35000/orders/getAllOrders",
          { withCredentials: true }
        );
        setOrders(response.data);
      } catch (error) {
        toast.error("Error getting orders");
      }
    }
    getOrders();
  }, []);

  return (
    <></>
    // <>
    //   <Navbar />
    //   <div className="bg-white border rounded-md p-4 w-full max-w-7xl mx-auto mt-4">
    //     {/* Order Information */}
    //     <div className="flex justify-between mb-4 ">
    //       <div>
    //         <p className="text-gray-600">ORDER PLACED</p>
    //         <p className="font-semibold">{order.createdAt}</p>
    //       </div>
    //       <div>
    //         <p className="text-gray-600">TOTAL</p>
    //         <p className="font-semibold">{order.totalAmount}</p>
    //       </div>
    //       <div>
    //         <p className="text-gray-600">SHIP TO</p>
    //         <p className="font-semibold">{order.shipTo}</p>
    //       </div>
    //       <div className="text-right">
    //         <p className="text-gray-600">ORDER # {order._id}</p>
    //         <div className="text-blue-500">
    //           <button className="hover:underline">View order details</button> |{" "}
    //           <button className="hover:underline">Invoice</button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Refund Status */}
    //     <div className="border-t pt-4 grid text-left">
    //       <p className="text-xl font-semibold text-green-600 mb-2">
    //         {order.status}
    //       </p>
    //       <p className="text-gray-600 mb-4">
    //         Your return is in transit. Your refund has been issued.{" "}
    //         <span className="text-blue-500 hover:underline cursor-pointer">
    //           When will I get my refund?
    //         </span>
    //       </p>

    //       {/* Product Information */}
    //       <div className="flex items-center mb-4">
    //         <img
    //           src="path-to-your-image.png"
    //           alt="Product"
    //           className="w-16 h-16 object-cover mr-4"
    //         />
    //         <p className="text-gray-800">
    //           {product.description}
    //         </p>
    //       </div>

    //       {/* Buttons */}
    //       <div className="flex space-x-4">
    //         <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
    //           View Return/Refund Status
    //         </button>
    //         <button className="bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300">
    //           Leave seller feedback
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Orders;
