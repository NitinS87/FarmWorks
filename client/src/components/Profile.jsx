import React, { useContext } from "react";
import profilePic from "../assets/profile.jpg";
import tractor from "../assets/tractor.jpg";
import { LoginContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser, userType, setUserType } = useContext(LoginContext);
  const navigate = useNavigate();
  var demoData = {
    name: "neeraj",
    email: "neeraj@email",
    state: "haryana",
    district: "gurugram",
    phoneNumber: "111111111",
    aadharNumber: "101201201201",
  };
  const handleLogout = (e) => {
    e.preventDefault();

    setUser(null);
    setUserType(null);
    navigate("/");
  };
  console.log(user, userType);
  return (
    <>
      <div className="lg:w-[75%] mx-auto h-full p-2 my-10">
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
          <img
            src={profilePic}
            className="border-white border-[1px] mx-auto rounded-full shadow-xl w-[30%]"
            alt=""
          />
        </div>
        <div className="w-[70%] mx-auto bg-slate-200 p-5 overflow-auto">
          <div className="md:flex justify-between border-b-[1px] p-2 border-white">
            <div className="md:text-xl text-center text-lg text-slate-700 font-bold">
              Name
            </div>
            <div className="md:text-xl text-center text-lg text-slate-500 font-semibold">
              {demoData.name}
            </div>
          </div>
          <div className="md:flex justify-between border-b-[1px] p-2 border-white">
            <div className="md:text-xl text-center text-lg text-slate-700 font-bold">
              Email
            </div>
            <div className="md:text-xl text-center text-lg text-slate-500 font-semibold">
              {demoData.email}
            </div>
          </div>
          <div className="md:flex justify-between border-b-[1px] p-2 border-white">
            <div className="md:text-xl text-center text-lg text-slate-700 font-bold">
              State
            </div>
            <div className="md:text-xl text-center text-lg text-slate-500 font-semibold">
              {demoData.state}
            </div>
          </div>
          <div className="md:flex justify-between border-b-[1px] p-2 border-white">
            <div className="md:text-xl  text-center text-lg text-slate-700 font-bold">
              District
            </div>
            <div className="md:text-xl text-center text-lg text-slate-500 font-semibold">
              {demoData.district}
            </div>
          </div>
          <div className="md:flex justify-between border-b-[1px] p-2 border-white">
            <div className="md:text-xl text-center text-lg text-slate-700 font-bold">
              Phone Number
            </div>
            <div className="md:text-xl text-center text-lg text-slate-500 font-semibold">
              {demoData.phoneNumber}
            </div>
          </div>
          <div className="md:flex justify-between border-b-[1px] p-2 border-white">
            <div className="md:text-xl text-center text-lg text-slate-700 font-bold">
              Aadhar Number
            </div>
            <div className="md:text-xl text-center text-lg text-slate-500 font-semibold">
              {demoData.aadharNumber}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button className="button !bg-red-500 mx-auto" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
