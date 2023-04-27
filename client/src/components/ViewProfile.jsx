import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import profilePic from "../assets/profile.jpg";
import tractor from "../assets/tractor.jpg";
import {
  MdCall,
  MdOutlineBadge,
  MdOutlineHome,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FiDatabase } from "react-icons/fi";

const ViewProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const type = params.type;
  const email = params.profileId;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/profile/${type}/${email}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  }, [email, type]);

  if (loading === null)
    return (
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="loader"></div>
        <span className="text-xl text-center">
          Getting your profile...
        </span>
      </div>
    );
  return (
    <div className="lg:w-[75%] mx-auto h-full p-2 my-10 w-[85%]">
      <div className="h-[50%] md:h-[60%] relative">
        <div className="h-[40%] ">
          <div className="flex justify-center">
            <img
              className="rounded-lg z-[-1] absolute w-[70%] h-[70%] object-cover"
              src={tractor}
              alt="tractor"
            />
            <div className="z-[-1] rounded-lg absolute w-[70%] h-[70%] bg-gray-700/[0.4]"></div>
          </div>
        </div>
        {user?.profile ? (
          <img
            src={user?.profile}
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
          <MdOutlineBadge className="text-3xl mx-2" />
          <span className="mr-3">Name: </span>
          <span>{user?.name}</span>
        </div>
        <div className="border flex items-center p-2 mt-4 rounded-md">
          <span className="mx-2">
            <MdOutlineMailOutline className="text-2xl" />
          </span>
          <span className="mr-3">Email: </span>
          <span>{user?.email}</span>
        </div>
        <div className="border flex items-center p-2 mt-4 rounded-md md:flex-row flex-col">
          <div className="flex items-center border p-2 rounded-md w-full md:w-[45%] lg:mr-2 mb-2 lg:mb-0">
            <span className="mx-2">
              <MdOutlineHome className="text-3xl" />
            </span>
            <span className="mr-3">State: </span>
            <span>{user?.state}</span>
          </div>
          <div className="flex items-center border p-2 rounded-md w-full md:w-[45%]">
            <span className="material-symbols-outlined mx-2">
              {" "}
              <MdOutlineHome className="text-3xl" />{" "}
            </span>
            <span className="mr-3">City: </span>
            <span>{user?.city}</span>
          </div>
        </div>
        <div className="border flex items-center p-2 mt-4 rounded-md">
          <span className="material-symbols-outlined mx-2">
            <FiDatabase className="text-3xl" />
          </span>
          <span className="mr-3">Aadhar Number: </span>
          <span>{user?.aadharNumber}</span>
        </div>
        <div className="border flex items-center p-2 mt-4 rounded-md">
          <span className="mx-2">
            {" "}
            <MdCall className="text-3xl" />{" "}
          </span>
          <span className="mr-3">Phone Number: </span>
          <span>{user?.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
