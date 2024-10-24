import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Country, State } from "country-state-city";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAddressToNull } from "../slices/addressSlice";
import Cookies from "js-cookie";

const AddAddress = () => {
  const [address, setAddress] = useState({
    country: "India",
    fullName: "",
    mobile: "",
    pincode: "",
    address: "",
    area: "",
    landmark: "",
    city: "",
    state: "Rajasthan",
    instructions: "",
  });
  const addressFromPayload = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    country: [],
    state: [],
  });
  // const addressData = useSelector((state) => state.address);

  const navigate = useNavigate();

  useEffect(() => {
    let country = Country.getAllCountries();
    setLocation((prevLocation) => ({ ...prevLocation, country: country }));
    let state = State.getStatesOfCountry("IN");
    setLocation((prevLocation) => ({ ...prevLocation, state: state }));
    if (addressFromPayload != null) {
      setAddress(addressFromPayload);
    }
    return () => {
      dispatch(setAddressToNull());
    };
  }, []);

  function handelChanges(e) {
    const { id, value } = e.target;
    setAddress({ ...address, [id]: value });
  }

  function handelCountryChange(e) {
    const { id, value } = e.target;
    setAddress({ ...address, [id]: value });
    const countryKey = e.target.selectedOptions[0].getAttribute("countryKey");
    let state = State.getStatesOfCountry(countryKey);
    setLocation({ ...location, state: state });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    try {
      if (addressFromPayload != null) {
        let obj = {};
        obj.address = address;
        obj.userId = Cookies.get("userId");
        await axios.put(
          `${process.env.REACT_APP_SERVER_ADDRESS}/user/editAddress`,
          obj,
          { withCredentials: true }
        );
        toast.success("Address updated successfully");
        navigate("/profile/address");
      } else {
        let response = await axios.post(
          `${process.env.REACT_APP_SERVER_ADDRESS}/user/addAddress`,
          address,
          { withCredentials: true }
        );
        toast.success("Address added successfully");
        navigate("/profile/address");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Add Address</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-gray-700 font-medium mb-2"
              >
                Country/Region
              </label>
              <select
                id="country"
                className="block w-full p-2 border border-gray-300 rounded"
                value={address.country}
                onChange={handelCountryChange}
              >
                {location.country.map((countryName) => (
                  <option
                    value={countryName.name}
                    key={countryName.isoCode}
                    countryKey={countryName.isoCode}
                  >
                    {countryName.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium mb-2"
              >
                Full name (First and Last name)
              </label>
              <input
                type="text"
                id="fullName"
                value={address.fullName}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handelChanges}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium mb-2"
              >
                Mobile number
              </label>
              <input
                type="number"
                id="mobile"
                value={address.mobile}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handelChanges}
              />
              <small className="text-gray-500">
                May be used to assist delivery
              </small>
            </div>
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="block text-gray-700 font-medium mb-2"
              >
                Pincode
              </label>
              <input
                type="number"
                id="pincode"
                value={address.pincode}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handelChanges}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-medium mb-2"
              >
                Flat, House no., Building, Company, Apartment
              </label>
              <input
                type="text"
                id="address"
                value={address.address}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handelChanges}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="area"
                className="block text-gray-700 font-medium mb-2"
              >
                Area, Street, Sector, Village
              </label>
              <input
                type="text"
                id="area"
                value={address.area}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handelChanges}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="landmark"
                className="block text-gray-700 font-medium mb-2"
              >
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                value={address.landmark}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handelChanges}
              />
              <small className="text-gray-500">E.g. near Apollo hospital</small>
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Town/City
                </label>
                <input
                  type="text"
                  id="city"
                  value={address.city}
                  className="block w-full p-2 border border-gray-300 rounded"
                  onChange={handelChanges}
                />
              </div>
              {location.state.length > 0 && (
                <div className="flex-1">
                  <label
                    htmlFor="state"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={address.state}
                    onChange={handelChanges}
                  >
                    {location.state &&
                      location.state.map((stateName) => (
                        <option value={stateName.name} key={stateName.isoCode}>
                          {stateName.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="defaultAddress" className="mr-2" />
              <label htmlFor="defaultAddress" className="text-gray-700">
                Make this my default address
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="instructions"
                className="block text-gray-700 font-medium mb-2"
              >
                Delivery instructions (optional)
              </label>
              <input
                type="text"
                id="instructions"
                value={address.instructions}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={handelChanges}
              />
              <small className="text-gray-500">
                Add preferences, notes, access codes, and more
              </small>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-2 rounded font-medium"
              onClick={handelSubmit}
            >
              {addressFromPayload ? "Edit Address" : "Add address"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
