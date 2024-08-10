import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addAddressToPayload } from "../slices/addressSlice"; // Adjust the path

const Address = () => {
  let [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();
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
        setAddresses(response.data.address);
      } catch (error) {
        toast.error("Error getting user address");
      }
    }
    getUserAddress();
  }, []);

  async function deleteAddress(addressId) {
    try {
      let response = await axios.post(
        "http://localhost:35000/user/deleteAddress",
        { addressId },
        {
          withCredentials: true,
        }
      );
      setAddresses(response.data.address);
      toast.success("Address deleted successfully");
    } catch (error) {
      toast.error("Error deleting address");
    }
  }

  function editAddress(address) {
    try {
      dispatch(addAddressToPayload(address));
      navigate("/profile/address/addAddress");
      console.log(address);
    } catch (error) {
      console.log(error);
    }
  }

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
        {addresses.map((address) => (
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
                <button
                  type="button"
                  className="cursor-pointer text-blue-800"
                  onClick={() => {
                    editAddress(address);
                  }}
                >
                  Edit
                </button>
                <span>|</span>
                <button
                  type="button"
                  className="cursor-pointer text-blue-800"
                  onClick={() => {
                    deleteAddress(address._id);
                  }}
                >
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
