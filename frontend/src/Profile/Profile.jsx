import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  useEffect(async () => {
    try {
      let response = await pool.query();
    } catch (error) {}
  }, []);

  return (
    <>
      <div class="relative min-w-full min-h-screen">
        <div class="absolute inset-y-0 left-0 w-1/3 p-4 flex justify-center ">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-52 h-52 rounded-full cursor-pointer self-center mb-72"
          />
        </div>
        <hr width="1" size="500" />
        <div class="absolute inset-y-0 right-0 w-2/3 p-4 flex justify-center">
          <div class="flex flex-col">
            <div className="w-max h-10 mt-20">
              <div className="flex flex-row">
                <p className="font-bold">Name</p>
                <p className="">Shivam Patil</p>
              </div>
            </div>
            <hr />
            <div className="w-max h-10">
              <div className="flex flex-row">
                <p className="font-bold">Name</p>
                <p className="">Shivam Patil</p>
              </div>
            </div>
            <hr />
            <div className="w-max h-10">
              <div className="flex flex-row">
                <p className="font-bold">Name</p>
                <p className="">Shivam Patil</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
