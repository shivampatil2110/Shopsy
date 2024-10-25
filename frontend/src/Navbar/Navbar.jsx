import React, { useContext, useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../util/GlobalState";
import axios from "axios";
import { toast } from "react-toastify";
import AddProductDialog from "../ProductsPage/AddProduct";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, addProduct } from "../slices/productsSlice";
import { updateProfile } from "../slices/userSlice";

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  let profile = useSelector((pro) => pro?.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const getCartSize = async () => {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/cart/getItems`,
          {
            withCredentials: true,
          }
        );
        let quantity = 0;
        for (let item of response.data) {
          quantity += item.quantity;
        }
        setState({ ...state, cart: quantity });
      } catch (error) {
        toast.error("Cannot get cart items");
      }
    };
    const checkUserAdmin = () => {
      if (Cookies.get("isAdmin")) {
        state.isAdmin = Cookies.get("isAdmin");
      }
    };
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
    async function getUserProfile() {
      try {
        let user = await axios.get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/user/userProfile`,
          { withCredentials: true }
        );
        dispatch(updateProfile(user.data.userImage));
      } catch (error) {
        toast.error("Cannot get user profile");
      }
    }

    fetchCategories();
    getCartSize();
    checkUserAdmin();
    getUserProfile();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  async function fetchProductByCategory(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const value = selectedOption.value;
    const key = selectedOption.id;
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/products/getProductByCategory`,
        {
          withCredentials: true,
          params: { categoryId: key },
        }
      );
      setSelectedCategory(value);
      dispatch(setProducts(response.data));
    } catch (error) {
      toast.error("Error fetching product category:", error);
    }
  }

  const logout = () => {
    Cookies.remove("isAdmin");
    Cookies.remove("jwtToken");
    Cookies.remove("userEmail");
    Cookies.remove("userId");
    navigate("/");
  };

  return state.isLoggedIn ? (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 ">
              <Link to="/">
                <img className="h-8 w-24" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 w-96">
                <SearchBar onSearch={onSearch} />
              </div>
            </div>
            <select
              className="bg-gray-200 rounded-r-lg"
              style={{ height: `2.6rem`, fieldSizing: "content" }}
              onChange={fetchProductByCategory}
              value={selectedCategory}
            >
              <option value="" disabled hidden>
                All
              </option>
              {categories.map((category) => (
                <option
                  value={category.name}
                  key={category._id}
                  id={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {state.isAdmin == "true" && (
            <button
              className="text-white rounded-md shadow bg-yellow-500 p-2 ml-80 hover:bg-yellow-600"
              onClick={handleOpenDialog}
            >
              Add Products
            </button>
          )}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 relative text-white">
              <button
                onClick={goToCart}
                type="button"
                className="cursor-pointer"
              >
                <FaCartShopping size={25}></FaCartShopping>
                <div className=" absolute bottom-4 left-7">
                  <span>{state.cart}</span>
                </div>
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-blue-500 text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          <div>
            <img
              src={!profile ? "https://via.placeholder.com/40" : profile}
              alt="Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="flex flex-col absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Cart
            </Link>
            <button className="w-full bg-blue-500 text-white px-3 py-2 rounded-md text-base font-medium">
              Login
            </button>
          </div>
        </div>
      )}
      {isDialogOpen && (
        <AddProductDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
      )}
    </nav>
  ) : null;
};

export default Navbar;
