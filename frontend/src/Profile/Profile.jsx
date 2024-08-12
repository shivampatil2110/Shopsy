import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const Profile = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    since: "",
    image: "",
    admin: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/user/userProfile`,
          { withCredentials: true }
        );
        setUser({
          email: response.data.email,
          username: response.data.username,
          since: response.data.createdAt,
          admin: response.data.isAdmin,
        });
        console.log(user);
      } catch (error) {}
    }
    getUser();
  }, []);

  function goToAddress() {
    navigate("/profile/address");
  }

  function goToOrders() {
    navigate("/orders");
  }

  async function changeProfilePicture(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({ ...user, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      {/* <pre>{{ user }}</pre> */}
      <Navbar />
      <div class="relative min-w-full min-h-screen">
        <div class="absolute inset-y-0 left-0 w-1/3 p-4 flex justify-center ">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-52 h-52 rounded-full cursor-pointer self-center mb-72"
            onClick={changeProfilePicture}
          />
        </div>
        <hr width="1" size="500" />
        <div className="absolute inset-y-0 right-0 w-2/3 p-4 flex justify-center">
          <div className="flex flex-col min-w-full">
            <div className="flex flex-col space-y-8 min-w-full">
              <div className="mt-20">
                <div className="flex flex-row">
                  <p className="text-gray-900 hover:text-gray-900 rounded-md font-bold">
                    Username:{" "}
                  </p>
                  <p className="text-gray-700 hover:text-gray-700 rounded-md font-medium">
                    {user.username}
                  </p>
                </div>
              </div>
              <hr />
              <div className="">
                <div className="flex flex-row">
                  <p className="text-gray-900 hover:text-gray-900 rounded-md font-bold">
                    E-mail:
                  </p>
                  <p className="text-gray-700 hover:text-gray-700 rounded-md font-medium">
                    {user.email}
                  </p>
                </div>
              </div>
              <hr />
              <div className="">
                <div className="flex flex-row">
                  <p className="text-gray-900 hover:text-gray-900 rounded-md font-bold">
                    Member Since:{" "}
                  </p>
                  <p className="text-gray-700 hover:text-gray-700 rounded-md font-medium">
                    {moment(user.since).format("DD MMMM YYYY")}
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div className="flex flex-rox min-w-full mt-10 ">
              <button
                className="text-white rounded-md shadow bg-yellow-500 py-2 border-2 hover:bg-yellow-600 w-1/2 "
                onClick={goToAddress}
              >
                Your Addresses
              </button>
              <button
                className="text-white rounded-md shadow bg-yellow-500 py-2 border-2 hover:bg-yellow-600 w-1/2"
                onClick={goToOrders}
              >
                Your Orders
              </button>
            </div>
            <div className="flex flex-rox min-w-full mt-1">
              <button
                className="text-white rounded-md shadow bg-yellow-500 py-2 border-2 hover:bg-yellow-600 w-1/2 m-auto"
                onClick={changeProfilePicture}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
