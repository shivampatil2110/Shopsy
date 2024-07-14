import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import Loader from "../util/Loader";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, addProduct } from "../slices/productsSlice";
import Subnav from "../Navbar/Subnav";
import Carousel from "../Carousel/Carousel";

const Products = () => {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get(
          "http://localhost:35000/products/getAllProducts",
          { withCredentials: true }
        );
        // setProducts(response.data);
        dispatch(setProducts(response.data));
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
      <Subnav />
      <div className="container mx-auto">
        {!loading ? (
          <>
            <Carousel productData={products} />
            <div className="h-20"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Products;
