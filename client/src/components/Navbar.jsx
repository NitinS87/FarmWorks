import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { UserContext } from "../context/UserContext";
import {
  MdClose,
  MdEdit,
  MdOutlineAccountCircle,
  MdOutlineMapsHomeWork,
  MdOutlineMenu,
  MdWorkOutline,
} from "react-icons/md";
const Navbar = () => {
  const { user, userType } = useContext(UserContext);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  return (
    <div className="w-full shadow-md text-lg">
      <nav className="w-[85%] h-[20%] flex mx-auto justify-between md:justify-start">
        <div>
          <Link to="/">
            <img src={logo} alt="Farm Works" className="w-24" />
          </Link>
        </div>
        <div className="flex md:w-full justify-between items-center mx-3 w-1/3">
          {user?.name ? (
            <div className="hidden md:flex border-x border-x-gray-500 w-[90%] h-[95%] items-center">
              {userType === "labour" ? (
                <div className="text-base py-2 px-3">
                  <Link to="/appliedJobs" className="hover:text-[#5FBC7C]">
                    Applied Jobs
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-base py-2 px-3">
                    <Link to="/create" className="hover:text-[#5FBC7C]">
                      Create a Job
                    </Link>
                  </div>

                  <div className="text-base py-2 px-3">
                    <Link to="/userJobs" className="hover:text-[#5FBC7C]">
                      Show my Jobs
                    </Link>
                  </div>
                </>
              )}
              {userType === "contractor" ? (
                <div className="text-base py-2 px-3">
                  <Link to="/appliedJobs" className="hover:text-[#5FBC7C]">
                    Applied Jobs
                  </Link>
                </div>
              ) : null}
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

          {user?.name ? (
            <Link
              to="/account"
              className="mr-1 flex items-center justify-evenly"
            >
              <span className="text-2xl lg:text-4xl p-1 rounded-full">
                <MdOutlineAccountCircle />
              </span>
              <span className="text-base">{user.name}</span>
            </Link>
          ) : (
            <div className="mx-2 hidden md:flex">
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
        {/* Menu Icon */}
        <div
          onClick={handleNav}
          className="block md:hidden cursor-pointer z-10 mt-6"
        >
          {nav ? (
            <MdClose className="text-3xl" />
          ) : (
            <MdOutlineMenu className="text-3xl" />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-white duration-300 z-10 overflow-hidden text-black"
              : "fixed left-[100%] top-20 h-[90%] w-full flex flex-col items-center justify-between ease-in duration-300 text-black"
          }
        >
          <ul className="w-full p-4">
            {user?.name ? (
              <>
                <li className="border-b-2 py-6">
                  <Link
                    to="/appliedJobs"
                    className="hover:text-[#5FBC7C] text-xl font-medium flex mx-1 items-center"
                    onClick={handleNav}
                  >
                    <MdOutlineMapsHomeWork className="mx-2" />
                    Applied Jobs
                  </Link>
                </li>
                <li className="border-b-2 py-6">
                  <Link
                    to="/create"
                    className="hover:text-[#5FBC7C] text-xl font-medium flex mx-1 items-center"
                    onClick={handleNav}
                  >
                    <span className="mr-2">
                      <MdEdit className="text-3xl" />
                    </span>
                    Create a Job
                  </Link>
                </li>
                <li className="border-b-2 py-6">
                  <Link
                    to="/userJobs"
                    className="hover:text-[#5FBC7C] text-xl font-medium flex mx-1 items-center"
                    onClick={handleNav}
                  >
                    <span className="material-symbols-outlined mr-2">
                      <MdWorkOutline className="text-3xl" />
                    </span>
                    Show my Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="border-b-2 py-6">
                  <Link
                    to="/login"
                    className="hover:text-[#5FBC7C]"
                    onClick={handleNav}
                  >
                    I'm Farmer
                  </Link>
                </li>
                <li className="border-b-2 py-6">
                  <Link
                    to="/login"
                    className="hover:text-[#5FBC7C]"
                    onClick={handleNav}
                  >
                    I'm Contractor
                  </Link>
                </li>
                <li className="border-b-2 py-6">
                  <Link
                    to="/login"
                    className="hover:text-[#5FBC7C]"
                    onClick={handleNav}
                  >
                    I'm Labour
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="flex flex-col w-full p-4">
            {user?.name ? null : (
              <>
                <Link to="/login" onClick={handleNav}>
                  <button className="w-full my-2 p-3 button text-primary border border-secondary rounded-2xl shadow-xl">
                    Sign In
                  </button>
                </Link>
                <Link to="/register" onClick={handleNav}>
                  <button className="w-full my-2 p-3 button text-btnText rounded-2xl shadow-xl">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
