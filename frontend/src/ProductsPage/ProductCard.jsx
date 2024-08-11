import React, { useContext, useEffect, useState } from "react";
import { Buffer } from "buffer";
import { GlobalContext } from "../util/GlobalState";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onClick }) => {
  const [imageBase64, setImageBase64] = useState("");
  const [state, setState] = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (product.productImage) {
      let image = product.productImage;
      if (image) {
        setImageBase64(image);
        console.log(image);
      }
    }
  }, []);

  async function updateCartValue(e) {
    e.stopPropagation();
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
  }

  function handelRedirect(id) {
    navigate(`/products/${id}`);
  }

  function truncateText(text) {
    if (text.length > 60) {
      return text.slice(0, 57) + "...";
    }
    return text;
  }

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      key={product._id}
      onClick={() => handelRedirect(product._id)}
    >
      <img
        className="w-full h-56 object-cover object-center bg-cover"
        src={imageBase64}
        alt={product.name}
      />
      <div className="p-4 grid">
        <h2 className="text-gray-900 font-bold text-lg">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.price}</p>
        <p className="text-gray-700 mt-2 ">
          {truncateText(product.description)}
        </p>
        <button
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-blue-500"
          onClick={updateCartValue}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
