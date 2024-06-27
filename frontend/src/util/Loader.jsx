import React, { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10; // Increment progress by 10% every interval
      });
    }, 500); // Update interval (in milliseconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full max-w-xl">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-blue-500 text-lg font-semibold mt-2 text-center">
          {progress < 100 ? "Loading..." : "Loaded"}
        </p>
      </div>
    </div>
  );
};

export default Loader;
