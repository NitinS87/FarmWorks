import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { LoginContext } from "../context/UserContext";
const Navbar = () => {
  const { user, setUser, userType, setUserType } = useContext(LoginContext);
  return (
    <div className="w-full shadow-md text-lg">
      <nav className="w-[85%] h-[20%] flex mx-auto justify-between md:justify-start">
        <div>
          <Link to="/">
            <img src={logo} alt="Farm Works" className="w-24" />
          </Link>
        </div>
        <div className="flex md:w-full justify-between items-center mx-3 w-1/3">
          {user.name ? (
            <div className="hidden md:flex border-x border-x-gray-500 w-[90%] h-[95%] items-center">
              {userType === "labour" ? null : (
                <div className="text-base py-2 px-3">
                  <Link to="/create" className="hover:text-[#5FBC7C]">
                    Create a Job
                  </Link>
                </div>
              )}

              <div className="text-base py-2 px-3">
                <Link to="/userJobs" className="hover:text-[#5FBC7C]">
                  Show my Jobs
                </Link>
              </div>
            </div>
          ) : (
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
          )}

          {user.name ? (
            <Link
              to="/account"
              className="mr-16 flex items-center justify-evenly mx-2"
            >
              <span className="material-symbols-outlined text-2xl lg:text-4xl p-1 rounded-full">
                account_circle
              </span>
              <span className="text-base">{user.name}</span>
            </Link>
          ) : (
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
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
