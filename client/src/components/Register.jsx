import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { State, City } from "country-state-city";
import {
  MdCall,
  MdOutlineBadge,
  MdOutlineDescription,
  MdOutlineHome,
  MdOutlineInfo,
  MdOutlineLock,
  MdPersonOutline,
} from "react-icons/md";
import { FiDatabase } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RiUploadCloud2Line } from "react-icons/ri";
const HeroBanner = React.lazy(() => import("./HeroBanner"));

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState("");
  const [accepts, setAccepts] = useState(false);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("");

  const [progress, setProgress] = useState(0);
  // console.log(state);
  const states = State.getStatesOfCountry("IN");
  // console.log(states);
  const cities = City.getCitiesOfState("IN", state);
  const [loading, setLoading] = useState(false);
  // console.log(cities);
  // console.log(city);

  const submitImage = async () => {
    const data = new FormData();
    const cloudName = "dgmcl4cdm";

    data.append("file", image);
    data.append("upload_preset", "nitindemo");
    data.append("folder", "farmworks"); // set up your upload_preset on cloudinary.

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // console.log(progress);
            setProgress(progress);
          },
        }
      );
      console.log(res.data.secure_url);
      setProfile(res.data.secure_url);
      // return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const ProgressBar = ({ progress }) => (
    <div className="progress">
      <div
        className="progress-bar bg-green-400 rounded-md text-center"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span value={progress}>{`${progress}%`}</span>
      </div>
    </div>
  );

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    // console.log("clicked");
    // console.log(
    //   name,
    //   email,
    //   password,
    //   aadharNumber,
    //   phoneNumber,
    //   state,
    //   city,
    //   userType,
    //   accepts
    // );
    axios
      .post(`/api/${userType}/register`, {
        name: name,
        email: email,
        password: password,
        aadharNumber: aadharNumber,
        phoneNumber: phoneNumber,
        state: state,
        city: city,
        profile: profile,
      })
      .then((d) => {
        console.log(d.data);
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response.data);
        setLoading(false);
      });
  };
  return (
    <div className="grid lg:grid-cols-2 mx-auto w-[85%] grid-cols-1 gap-10 my-10">
      <div className="hidden lg:block">
        <HeroBanner />
      </div>
      <div>
        <form
          className="flex flex-col items-center justify-center h-full w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex-col items-center justify-center w-full">
            <div className="mx-auto">
              <h1 className="text-3xl mt-5">Registration Form</h1>
            </div>
            {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <MdOutlineBadge className="text-3xl mr-4 ml-2" />
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <MdOutlineDescription className="text-3xl mr-4 ml-2" />
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="email"
                placeholder="E-mail"
                value={email}
                autoComplete="current-password"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <MdOutlineLock className="text-3xl mr-4 ml-2" />
              <span className=""></span>
              <input
                className="w-full outline-none "
                type="password"
                placeholder="Password"
                value={password}
                required
                minLength={8}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
              <FiDatabase className="text-3xl mr-4 ml-2" />
              <span className=""></span>
              <input
                className="w-full h-full outline-none  "
                type="tel"
                placeholder="Aadhar-Number"
                value={aadharNumber}
                required
                maxLength={12}
                minLength={12}
                title="Enter correct aadhar number"
                pattern="[2-9][0-9]{11}"
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <MdCall className="text-3xl mr-4 ml-2" />
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="tel"
                placeholder="Phone-Number"
                value={phoneNumber}
                required
                maxLength={10}
                minLength={10}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4">
              <span className="flex mr-4 items-center w-1/2">
                <MdOutlineHome className="text-3xl mr-4 ml-2" />
                <span className="flex justify-start w-full">
                  <select
                    className="border outline-none p-2 w-full"
                    id="state"
                    name="location"
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option className="mx-auto w-11" value="select">
                      State
                    </option>
                    {states.map((d, idx) => (
                      <option key={idx} value={d.isoCode}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </span>
              </span>

              <span className="flex items-center w-1/2">
                <MdOutlineHome className="text-3xl mr-4 ml-2" />
                <span className="flex justify-start w-full">
                  <select
                    className="border outline-none p-2 w-full"
                    name="location"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option className="mx-auto w-11" value="select">
                      City
                    </option>
                    {cities.map((d, idx) => (
                      <option key={idx} value={d.isoCode}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </span>
              </span>
            </div>

            <div className="border flex-col items-center p-2 mt-4 rounded-md">
              <div className="flex">
                <HiOutlinePhotograph className="text-3xl mr-4 ml-2" />
                <input
                  className="w-[100%] outline-none"
                  type="file"
                  placeholder="Profile Picture"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                  type="button"
                  className="p-2 border rounded-md flex items-center"
                  onClick={submitImage}
                >
                  <RiUploadCloud2Line className="text-2xl" />
                  Upload
                </button>
              </div>
              <div className="w-[97%] mx-auto my-2">
                <ProgressBar progress={progress} />
              </div>
            </div>

            <div className="border flex items-center p-2 mt-4">
              <MdPersonOutline className="text-3xl mr-4 ml-2" />
              <span className="flex justify-start w-full">
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="border outline-none p-2 w-full"
                  placeholder="Select value"
                  required
                >
                  <option value="DEFAULT" disabled>
                    Choose a option ...
                  </option>
                  <option className="w-11" value="farmer">
                    Farmer
                  </option>
                  <option className="w-11" value="contractor">
                    Contractor
                  </option>
                  <option className="w-11" value="labour">
                    Labour
                  </option>
                </select>
              </span>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                value={accepts}
                onChange={() => setAccepts(!accepts)}
                className="mr-2"
              />
              <label htmlFor="terms" className="cursor-pointer">
                I agree with all the terms and conditions.
              </label>
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[#52C075]"
              >
                <span className="material-symbols-outlined text-2xl">
                  <MdOutlineInfo />
                </span>
              </Link>
              <br />
            </div>

            <div className="flex items-center justify-start mt-4 rounded-md">
              {accepts ? (
                <button className="button shadow-sm" type="submit">{loading ? (
                  <span className="loader"></span>
                ) : (
                  <span>Register</span>
                )}</button>
              ) : (
                <button
                  disabled={!accepts}
                  className="button shadow-sm bg-gray-300! text-gray-500!"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </form>
        <div className="-mt-1 ">
          <span> Already have an account! </span>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
