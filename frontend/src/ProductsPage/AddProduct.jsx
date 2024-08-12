import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, addProduct } from "../slices/productsSlice";

const AddProductDialog = ({ isOpen, onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    imageBase64: "",
  });
  const [categories, setCategories] = useState([]);
  const [isFormValid, setIsFormValid] = useState(true);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    async function getCategories() {
      try {
        let response = await axios.get(
          "http://localhost:35000/categories/getCategories",
          { withCredentials: true }
        );
        setCategories(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getCategories();
  }, []);

  // useEffect(() => {
  //   const checkFormValidity = () => {
  //     const { name, price, stock, category, description, imageBase64 } =
  //       product;
  //     if (name && price && stock && category && description && imageBase64) {
  //       setIsFormValid(true);
  //     } else {
  //       setIsFormValid(false);
  //     }
  //   };
  //   checkFormValidity();
  // }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({ ...product, imageBase64: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/products/addProduct`,
        product,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      let newProduct = {
        _id: uuidv4(),
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        createdAt: Date.now(),
        editedAt: Date.now(),
      };
      dispatch(addProduct(newProduct));
      toast.success("Product added successfully");
      setProduct({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        image: "",
      }); // Clear the form
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Product Price"
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Product Stock"
          className="mb-2 p-2 border rounded w-full"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mb-2 p-2 border rounded w-full"
        >
          <option value="" disabled hidden>
            Select Category
          </option>
          {/* <option value="" disabled></option> */}
          {categories.map((category) => (
            <option value={category.name} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="block w-full text-sm text-slate-800
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100 cursor-pointer"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-neutral-200 text-white py-2 px-4 rounded-md hover:bg-neutral-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`py-2 px-4 rounded-md shadow ${
              isFormValid
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "neutral-200 cursor-not-allowed"
            } text-white`}
            disabled={!isFormValid}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductDialog;
