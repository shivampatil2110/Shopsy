import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, addProduct } from "../slices/productsSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Subnav = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCategories() {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/categories/getCategories`,
          { withCredentials: true }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  async function fetchProductCategory(categoryId) {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/products/getProductByCategory`,
        {
          withCredentials: true,
          params: { categoryId },
        }
      );
      dispatch(setProducts(response.data));
    } catch (error) {
      toast.error("Error fetching product category:", error);
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="shadow-inner mx-64">
        <div className="container mx-auto px-6 py-3 flex justify-between">
          {categories.map((category) => (
            <>
              <button
                key={category._id}
                className="text-gray-800 hover:text-gray-600 mx-4"
                onClick={() => fetchProductCategory(category._id)}
              >
                <div className="flex flex-col items-center">
                  <div>
                    <img src={category.image} alt="" />
                  </div>
                  <div>
                    <p>{category.name}</p>
                  </div>
                </div>
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subnav;
