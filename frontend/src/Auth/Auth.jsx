import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../util/GlobalState";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.email.value);
    if (isLogin) {
      let login = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      try {
        await axios.post("http://localhost:35000/auth/login", login, {
          withCredentials: true,
        });
        toast.success("Successfully Logged In");
        setState({ ...state, isLoggedIn: true });
        navigate("/products");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      if (e.target.password.value === e.target.confirmPassword.value) {
        let signup = {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        };
        try {
          await axios.post("http://localhost:35000/auth/register", signup, {
            withCredentials: true,
          });
          toast.success("Successfully Signed Up");
          setState({ ...state, isLoggedIn: true });
          navigate("/products");
        } catch (error) {
          toast.console.warning(error.response.data.message);
        }
      } else {
        toast.error("Password do not match");
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
              type="password"
              id="password"
              name="password"
              value={isLogin ? login.password : signup.password}
              onChange={isLogin ? handleLoginChanges : handleSignupChanges}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          {!isLogin && (
            <div>
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
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <div className="mt-4 justify-between">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-sm ${
              isLogin
                ? "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-1/2"
                : "bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-1/2"
            } hover:underline focus:outline-none`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-sm ${
              !isLogin
                ? "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-1/2"
                : "bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-1/2"
            } hover:underline focus:outline-none`}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
