import React from 'react'
import { Link } from 'react-router-dom';

const Pnf = () => {
  return (
    <div className=" px-4 py-6 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll h-full max-md:px-1.5 mx-md:py-2.5 justify-center items-center">
      <h1 className="text-8xl">404</h1>
      <div className="w-1/2 h-1/2 lg:w-1/3 lg:h-1/3">
        <img
          className="object-cover"
          src="https://cdn.svgator.com/images/2024/04/animated-3D-404-not-found-page-error.gif"
          alt=""
        />
      </div>
      <p className="lg:text-black">
        The page you are looking for is not available
      </p>
      <Link to={"/"} className="no-underline">
        <div className="bg-gray-400 p-1.5 rounded text-sm font-medium  ">
          Go to Home
        </div>
      </Link>
    </div>
  );
}

export default Pnf