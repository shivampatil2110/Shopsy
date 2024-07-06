// ProductInfo.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../util/GlobalState";
import Spinner from "../util/Spinner";
import Navbar from "../Navbar/Navbar";
import Cookies from "js-cookie";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useContext(GlobalContext);

  useEffect(() => {
    let cookies = Cookies.get("userId");
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:35000/products/getProduct?id=${id}`,
          { withCredentials: true }
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching product details");
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const addToCart = async () => {
    try {
      setState({ ...state, cart: state.cart + 1 });
      let quantity = { quantity: 1 };
      await axios.post(
        `http://localhost:35000/cart/addItem?id=${product._id}`,
        quantity,
        { withCredentials: true }
      );
      toast.success("Product added to cart");
    } catch (error) {
      setState({ ...state, cart: state.cart - 1 });
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-20 p-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:space-x-8">
              <img
                className="w-full md:w-1/2 h-64 object-cover"
                src={product.productImage}
                alt={product.name}
              />
              <div className="flex flex-col justify-center md:w-1/2">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl text-gray-800 mb-4">
                  Rs {product.price}
                </p>
                <p className="text-gray-700 mb-6">{product.description}</p>
                <button
                  onClick={addToCart}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductInfo;
