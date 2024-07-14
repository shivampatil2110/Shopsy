import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Subnav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        let response = await axios.get(
          "http://localhost:35000/categories/getCategories",
          { withCredentials: true }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="shadow-inner mx-64">
        <div className="container mx-auto px-6 py-3 flex justify-between">
          {categories.map((category) => (
            <>
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="text-gray-800 hover:text-gray-600 mx-4"
              >
                <div className="grid content-center">
                  <div className="flex">
                    <img src={category.image} alt="" />
                  </div>
                  <div className="flex">
                    <p>{category.name}</p>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subnav;
