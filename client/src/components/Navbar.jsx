import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
const Navbar = () => {
  return (
    <div className="w-full shadow-md text-lg">
      <nav className="w-[85%] h-[20%] flex mx-auto justify-between md:justify-start">
        <div>
          <Link to="/">
            <img src={logo} alt="Farm Works" className="w-24" />
          </Link>
        </div>
        <div className="flex md:w-full justify-between items-center mx-3 w-1/3">
          <div className="hidden md:flex border-x border-x-gray-500 w-[80%] h-[95%] items-center">
            <div className="text-base py-2 px-3">
              <Link to="/login" className="hover:text-[#5FBC7C]">
                I'm Farmer
              </Link>
            </div>
            <div className="text-base py-2 px-3">
              <Link to="/login" className="hover:text-[#5FBC7C]">
                I'm Contractor
              </Link>
            </div>
            <div className="text-base py-2 px-3">
              <Link to="/login" className="hover:text-[#5FBC7C]">
                I'm Labour
              </Link>
            </div>
          </div>

          <div className="flex mx-2">
            <Link to="/login">
              <button className="border border-[#1c8249] lg:py-2 lg:px-6 mr-2 hover:text-[#1c8249] p-1 duration-300 ease-in-out hover:border-black hover:scale-105">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-[#1c8249] lg:py-2 lg:px-6 p-1 text-white text-lg hover:bg-black hover:text-white border border-[#1c8249] duration-300 ease-in-out hover:scale-105">
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
