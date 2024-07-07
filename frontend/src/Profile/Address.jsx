import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Address = () => {
  let [address, setAddress] = useState([]);

  const navigate = useNavigate();

  function addAddress() {
    navigate("/profile/address/addAddress");
  }

  useEffect(() => {
    async function getUserAddress() {
      try {
        let response = await axios.get(
          "http://localhost:35000/user/getAddress",
          {
            withCredentials: true,
          }
        );
        setAddress(response.data.address);
      } catch (error) {
        toast.error("Error getting user address");
      }
    }
    getUserAddress();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row m-20 min-w-full flex-wrap space-x-14">
        <div
          className="h-70 w-60 flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer"
          onClick={addAddress}
        >
          <div className="grid justify-items-center text-center">
            <div className="text-5xl p-1">+</div>
            <div className="text-xl  p-1">Add Address</div>
          </div>
        </div>
        {address.map((address) => (
          <div className="h-70 w-60 border-2 border-gray-300 rounded drop-shadow-md">
            <div className="flex items-start flex-col p-4">
              <p className="font-semibold">{address.fullName}</p>
              <p>{address.address}</p>
              <p>{address.area}</p>
              <p>{address.landmark}</p>
              <p>
                {address.city}, {address.state} {address.pincode}
              </p>
              <p>{address.country}</p>
              <p>Phone Number: {address.mobile}</p>
              <div className="items-end">
                <button type="button" className="cursor-pointer">
                  Edit
                </button>
                <span>|</span>
                <button type="button" className="cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Address;
