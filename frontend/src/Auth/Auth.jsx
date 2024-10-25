import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../util/GlobalState";
import Cookies from "js-cookie";
import login_bg from "../images/login_bg.jpg";
import { FaEye } from "react-icons/fa6";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useContext(GlobalContext);
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (Cookies.get("jwtToken")) {
      navigate("/products");
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    console.log(process.env.REACT_APP_SERVER_ADDRESS);
    e.preventDefault();
    if (isLogin) {
      let login = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      try {
        let response = await axios.post(
          `${process.env.REACT_APP_SERVER_ADDRESS}/auth/login`,
          login,
          {
            withCredentials: true,
          }
        );
        toast.success("Successfully Logged In");
        setState({
          ...state,
          isLoggedIn: true,
          isAdmin: response.data.isAdmin,
        });
        navigate("/products");
      } catch (error) {
        toast.error(error.message);
        return;
      }
    } else {
      if (e.target.password.value === e.target.confirmPassword.value) {
        let signup = {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        };
        try {
          let response = await axios.post(
            `${process.env.REACT_APP_SERVER_ADDRESS}/auth/register`,
            signup,
            {
              withCredentials: true,
            }
          );
          toast.success("Successfully Signed Up");
          setState({ ...state, isLoggedIn: true, isAdmin: response.isAdmin });
          navigate("/products");
        } catch (error) {
          toast.warning(error.response.data.message);
          return;
        }
      } else {
        toast.error("Password do not match");
        return;
      }
    }
    getCartSize();
  };

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

  const handleLoginChanges = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSignupChanges = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  return (
    <>
      <img
        src={login_bg}
        alt=""
        className=" absolute -z-10 overflow-y-hidden blur-sm"
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md ">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="Username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={signup.username}
                  onChange={handleSignupChanges}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={isLogin ? login.email : signup.email}
                onChange={isLogin ? handleLoginChanges : handleSignupChanges}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={isLogin ? login.password : signup.password}
                onChange={isLogin ? handleLoginChanges : handleSignupChanges}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <div className="relative bottom-8 flex" style={{ left: "22rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <FaEye size={25} />
                </button>
              </div>
            </div>
            {!isLogin && (
              <div style={{ marginTop: "0px" }}>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={signup.confirmPassword}
                  onChange={handleSignupChanges}
                  className="p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
                <div
                  className="relative bottom-8 flex"
                  style={{ left: "22rem" }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <FaEye size={25} />
                  </button>
                </div>
              </div>
            )}
            <button
              type="submit"
              className=" w-full bg-yellow-500 text-white py-2 px-4 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
          <div className="mt-4 flex">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <span className="text-blue-800 bold hover:cursor-pointer">
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
