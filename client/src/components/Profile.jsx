import React, { useContext } from "react";
import profilePic from "../assets/profile.jpg";
import tractor from "../assets/tractor.jpg";
import { UserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser, setUserType } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    setUser(null);
    setUserType(null);
    localStorage.clear();
    navigate("/");
  };
  // console.log(user, userType);
  if (user) {
    return (
      <div className="lg:w-[75%] mx-auto h-full p-2 my-10 w-[85%]">
        <div className="h-[50%] md:h-[60%] relative">
          <div className="h-[40%] ">
            <div className="flex justify-center">
              <img
                className="rounded-lg z-[-1] absolute w-[70%] h-[70%] object-cover"
                src={tractor}
                alt=""
              />
              <div className="z-[-1] rounded-lg absolute w-[70%] h-[70%] bg-gray-700/[0.4]"></div>
            </div>
          </div>
          {user.profile ? (
            <img
              src={user.profile}
              className="border-white border-[1px] mx-auto rounded-full shadow-xl w-[30%]"
              alt="your photos"
            />
          ) : (
            <img
              src={profilePic}
              className="border-white border-[1px] mx-auto rounded-full shadow-xl w-[30%]"
              alt="default"
            />
          )}
        </div>
        <div className="flex-col gap-10 mx-auto lg:w-[70%] w-[95%]">
          <div className="border flex items-center p-2 mt-4 rounded-md">
            <span className="material-symbols-outlined mx-2">badge</span>
            <span className="mr-3">Name: </span>
            <span>{user.name}</span>
          </div>
          <div className="border flex items-center p-2 mt-4 rounded-md">
            <span className="material-symbols-outlined mx-2">mail</span>
            <span className="mr-3">Email: </span>
            <span>{user.email}</span>
          </div>
          <div className="border flex items-center p-2 mt-4 rounded-md">
            <div className="flex items-center border p-2 rounded-md w-[45%] mr-2">
              <span className="material-symbols-outlined mx-2"> home </span>
              <span className="mr-3">State: </span>
              <span>{user.state}</span>
            </div>
            <div className="flex items-center border p-2 rounded-md w-[45%]">
              <span className="material-symbols-outlined mx-2"> home </span>
              <span className="mr-3">City: </span>
              <span>{user.city}</span>
            </div>
          </div>
          <div className="border flex items-center p-2 mt-4 rounded-md">
            <span className="material-symbols-outlined mx-2">demography</span>
            <span className="mr-3">Aadhar Number: </span>
            <span>{user.aadharNumber}</span>
          </div>
          <div className="border flex items-center p-2 mt-4 rounded-md">
            <span className="material-symbols-outlined mx-2"> call </span>
            <span className="mr-3">Phone Number: </span>
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        {/* <div className="w-full flex justify-center mt-2">
          <Link to="/update">
            <button className="button"> Update</button>
          </Link>
        </div> */}
        <div className="w-full flex justify-center mt-2">
          <button className="button !bg-red-500 mx-auto" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Profile;
