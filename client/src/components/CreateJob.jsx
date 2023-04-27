/* eslint-disable no-sequences */
import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import reqInstance from "./../api";
import { State, City } from "country-state-city";
import {
  MdOutlineAvTimer,
  MdOutlineBadge,
  MdOutlineDescription,
  MdOutlineHome,
  MdOutlineLandscape,
  MdOutlineLocationOn,
  MdOutlinePriceCheck,
  MdPersonOutline,
} from "react-icons/md";
const CreateJob = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  //   const [status, setStatus] = useState("");
  const [land, setLand] = useState("");
  const [completionDays, setCompletionDays] = useState("");
  const [amount, setAmount] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [jobOptions, setJobOptions] = useState("");
  const [images, setImages] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const states = State.getStatesOfCountry("IN");
  // console.log(states);
  const cities = City.getCitiesOfState("IN", state);
  // console.log(cities);

  //   const [latitude, setLatitude] = useState("");
  //   const [longitude, setLongitude] = useState("");

  const [progress, setProgress] = useState(0);

  // const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     // Here we are simulating a delay of 2 seconds to mimic data fetching.
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     setLoadingData(false);
  //   }

  //   fetchData();
  //   console.log(user);
  // }, [user]);
  const uploadAllToCloudinary = async (files, onUploadProgress) => {
    const uploadedImageUrls = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadToCloudinary(files[i], onUploadProgress);
        uploadedImageUrls.push(url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    return uploadedImageUrls;
  };
  const uploadToCloudinary = async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    const cloudName = "dgmcl4cdm";
    const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    formData.append("upload_preset", "nitindemo");
    formData.append("folder", `farmworks/${user.email}`);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(progress);
        },
      });
      console.log("Files uploaded successfully:", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    try {
      // console.log(files);
      const uploadedImageUrls = await uploadAllToCloudinary(files, setProgress);
      // do something with the uploaded image URL
      setImages(uploadedImageUrls);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  // console.log(images);

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

  const handleLocationCLicked = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("clicked");
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setCoordinates({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // console.log(
    //   jobName,
    //   jobDesc,
    //   completionDays,
    //   land,
    //   amount,
    //   coordinates,
    //   jobOptions,
    //   images,
    //   city,
    //   state
    // );

    // console.log(user);
    reqInstance
      .post(`/api/jobs/create`, {
        farmerId: user.email,
        jobName: jobName,
        jobDesc: jobDesc,
        land: land,
        completionDays: completionDays,
        amount: amount,
        coordinates: coordinates,
        jobOptions: jobOptions,
        phoneNumber: user.phoneNumber,
        pictures: images,
        state: state,
        city: city,
      })
      .then((d) => {
        console.log(d.data);
        setLoading(false);
        navigate(`/jobs/${d.data._id}`);
      })
      .catch((err) => {
        setError("Some error has occured!");
        setLoading(false);
        console.log(err.response.data);
      });
  };

  var [minAmount, setMinAmount] = useState(0);

  if (user) {
    return (
      <div className="grid lg:grid-cols-2 mx-auto w-[85%] grid-cols-1 gap-10 my-10">
        <div>
          <form
            className="flex flex-col items-center justify-center h-full w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex-col items-center justify-center w-full">
              <div className="mx-auto">
                <h1 className="text-3xl mt-5">Create a Job</h1>
              </div>

              {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
              <div className="border flex items-center p-2 mt-4 rounded-md">
                <MdOutlineBadge className="text-3xl mr-4 ml-2" />
                <input
                  className="w-[100%] outline-none"
                  type="text"
                  placeholder="Title"
                  value={jobName}
                  required
                  onChange={(e) => setJobName(e.target.value)}
                />
              </div>

              <div className="border flex items-center p-2 mt-4 rounded-md">
                <MdOutlineDescription className="text-3xl mr-4 ml-2" />
                <textarea
                  className="w-[100%] outline-none h-24 resize-y"
                  placeholder="Description 
Give accomodation or shelter facility details
Food details"
                  value={jobDesc}
                  required
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>

              <div className="border flex items-center p-2 mt-4 rounded-md">
                <MdOutlineAvTimer className="text-3xl mr-4 ml-2" />
                <input
                  className="w-full outline-none"
                  type="number"
                  required
                  placeholder="Enter work completion days: "
                  value={completionDays}
                  min={1}
                  onChange={(e) => (
                    setCompletionDays(e.target.value),
                    setMinAmount(e.target.value * 250)
                  )}
                />
              </div>

              <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
                <MdOutlineLandscape className="text-3xl mr-4 ml-2" />
                <div className=" w-full flex justify-evenly items-center gap-5">
                  <input
                    className="w-[60%] h-full outline-none"
                    type="number"
                    placeholder="Lands in acres"
                    required
                    value={land}
                    onChange={(e) => setLand(e.target.value)}
                  />
                  <span className="w-[40%]">acres</span>
                </div>
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

              <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
                <MdOutlinePriceCheck className="text-3xl mr-4 ml-2" />
                <input
                  className="w-full h-full outline-none"
                  type="number"
                  placeholder={`Amount - min ${minAmount} per labour`}
                  min={minAmount}
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="border flex-col items-center p-2 mt-4 rounded-md">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      multiple
                      required
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                <div className="w-[97%] mx-auto my-2">
                  <ProgressBar progress={progress} />
                </div>
              </div>

              <div
                className="p-2 mt-4 border rounded-md"
                onClick={handleLocationCLicked}
              >
                <span>
                  Note: You are required to be at work location to create a
                  job
                </span>
                <div className="border flex items-center p-2 mt-4">
                  <span className="flex mr-4 items-center w-1/2">
                    <MdOutlineHome className="text-3xl mx-2" />
                    <span className="flex justify-start w-full">
                      <input
                        className="w-full h-full outline-none border p-2"
                        type="number"
                        required
                        placeholder="Latitude"
                        value={coordinates.lat}
                        disabled
                      />
                    </span>
                  </span>

                  <span className="flex items-center w-1/2">
                    <MdOutlineHome className="text-3xl mx-2" />
                    <span className="flex justify-start w-full">
                      <input
                        className="w-full h-full outline-none border p-2"
                        type="number"
                        required
                        placeholder="Longitude"
                        value={coordinates.long}
                        disabled
                      />
                    </span>
                  </span>
                  <div className="p-1 border text-3xl mx-2">
                    <MdOutlineLocationOn />
                  </div>
                </div>
              </div>

              <div className="border flex items-center p-2 mt-4">
                <span className="mx-2 text-3xl">
                  <MdPersonOutline />
                </span>
                <span className="flex justify-start w-full">
                  <select
                    defaultValue={"DEFAULT"}
                    onChange={(e) => setJobOptions(e.target.value)}
                    className="border outline-none p-2 w-full"
                    placeholder="Select value"
                    required
                  >
                    <option value="DEFAULT" disabled>
                      Choose a option ...
                    </option>
                    <option className="w-11" value="both">
                      Both
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

              <div className="flex items-center justify-start mt-4 rounded-md">
                <button className="button shadow-sm" type="submit">
                  {loading ? (
                    <span className="loader"></span>
                  ) : (
                    <span>Create</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default CreateJob;
