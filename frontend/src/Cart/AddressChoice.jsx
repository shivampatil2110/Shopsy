import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Spinner from "../util/Spinner";
import { counter } from "@fortawesome/fontawesome-svg-core";

const AddressChoice = ({ sendDataToParent }) => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addressId, setAddressId] = useState("");

  useEffect(() => {
    async function getUserAddress() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/user/getAddress`,
          { withCredentials: true }
        );
        setAddress(response.data.address);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getUserAddress();
  }, []);

  function handleSubmit() {
    sendDataToParent(addressId);
  }

  function handleSelect(addressId) {
    setAddressId(addressId);
  }

  return (
    <>
      <div className="container min-h-lvh">
        <h1 className="text-2xl font-bold mb-4">Choose Address</h1>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : address.length === 0 ? (
          <p className="text-gray-600">No address added</p>
        ) : (
          <div className="space-y-4">
            {address.map((address) => (
              <div
                key={address._id}
                className="flex items-center p-4 bg-white shadow-md rounded-lg ml-2"
              >
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => {
                    handleSelect(address._id);
                  }}
                />
                <label for="default-radio-1" class="ms-2 font-medium ">
                  <strong>{address.fullName}</strong> {address.address}{" "}
                  {address.area} {address.landmark}, {address.city},{" "}
                  {address.state}, {address.country}, {address.pincode}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="text-right">
          <button
            className={`py-2 px-4 rounded-md shadow ${
              addressId != ""
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-yellow-500 neutral-200 cursor-not-allowed"
            } text-white my-2`}
            disabled={addressId == ""}
            onClick={handleSubmit}
          >
            Select Address
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressChoice;
