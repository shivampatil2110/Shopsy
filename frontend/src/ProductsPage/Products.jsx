import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import Loader from "../util/Loader";
import Navbar from "../Navbar/Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get(
          "http://localhost:35000/products/getAllProducts",
          { withCredentials: true }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error getting products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Products;
