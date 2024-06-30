import React from "react";

const Profile = () => {
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
            <div>01</div>
            <div>02</div>
            <div>03</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
