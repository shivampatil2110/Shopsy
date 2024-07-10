import React from "react";
import Navbar from "../Navbar/Navbar";

const Orders = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-9/12 border-2 border-black h-80">
          <div className="flex justify-between">
            <div className="flex">
              <div>
                <p>Order Placed</p>
                <p>26 Feb 2022</p>
              </div>
              <div>
                <p>Total</p>
                <p>3034</p>
              </div>
              <div>
                <p>Ship To</p>
                <p>o4mom</p>
              </div>
            </div>
            <div className="">
              <p>Order ID 6754-765435678-6543-43</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
