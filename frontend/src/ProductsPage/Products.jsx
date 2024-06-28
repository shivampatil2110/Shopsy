import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import Loader from "../util/Loader";
import Spinner from "../util/Spinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get(
          "http://localhost:35000/products/getAllProducts",
          { withCredentials: true }
        );
        setProducts(response.data);
        console.log(products);
        setLoading(false);
      } catch (error) {
        toast.error("Error getting products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto">
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Products;
