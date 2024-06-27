import React, { useState } from "react";
import { Buffer } from "buffer";

const ProductCard = ({ product }) => {
  // const [imageBase64, setImageBase64] = useState("");
  // if (product.productImage) {
  //   let image = product.productImage.data.data;
  //   if (image) {
  //     let buffer = Buffer.from(image, "binary").toString("base64");
  //     setImageBase64(`data:image/jpeg;base64,${buffer}`);
  //   }
  // }
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      key={product._id}
    >
      <img
        className="w-full h-56 object-cover object-center"
        // src={imageBase64}
        // alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-gray-900 font-bold text-lg">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.price}</p>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
