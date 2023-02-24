import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/UserContext";

const CreateJob = ({ op }) => {
  const { user, setUser } = useContext(LoginContext);
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
  //   const [latitude, setLatitude] = useState("");
  //   const [longitude, setLongitude] = useState("");

  navigator.geolocation.watchPosition(function (position) {
    // console.log("Latitude is :", position.coords.latitude);
    // console.log("Longitude is :", position.coords.longitude);
    setCoordinates({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(
      jobName,
      jobDesc,
      completionDays,
      land,
      amount,
      coordinates,
      jobOptions
    );

    console.log(user);
    axios
      .post(`http://localhost:8000/api/jobs/create`, {
        farmerId: user.email,
        jobName: jobName,
        jobDesc: jobDesc,
        land: land,
        completionDays: completionDays,
        amount: amount,
        coordinates: coordinates,
        jobOptions: jobOptions,
      })
      .then((d) => {
        console.log(d.data);
        navigate(`/jobs/${d.data._id}`);
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response.data);
      });
  };

  return (
    <div>
      {user.email ? (
        <div className="grid lg:grid-cols-2 mx-auto w-[85%] grid-cols-1 gap-10 my-10">
          <div>
            <form
              className="flex flex-col items-center justify-center h-full w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex-col items-center justify-center w-full">
                <div className="mx-auto">
                  {op === "create" ? (
                    <h1 className="text-3xl mt-5">Create a Job</h1>
                  ) : (
                    <h1 className="text-3xl mt-5">Update a Job</h1>
                  )}
                </div>

                {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
                <div className="border flex items-center p-2 mt-4 rounded-md">
                  <span className="material-symbols-outlined mr-4 ml-2">
                    badge
                  </span>
                  <input
                    className="w-[100%] outline-none"
                    type="text"
                    placeholder="Title"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                  />
                </div>

                <div className="border flex items-center p-2 mt-4 rounded-md">
                  <span className="material-symbols-outlined mr-4 ml-2">
                    description
                  </span>
                  <textarea
                    className="w-[100%] outline-none h-24 resize-y"
                    placeholder="Description - (minimum 100 words)"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>

                <div className="border flex items-center p-2 mt-4 rounded-md">
                  <span className="material-symbols-outlined mr-4 ml-2">
                    <span className="material-symbols-outlined"> update </span>
                  </span>
                  <input
                    className="w-full outline-none"
                    type="number"
                    placeholder="Enter work completion days: "
                    value={completionDays}
                    onChange={(e) => setCompletionDays(e.target.value)}
                  />
                </div>

                <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
                  <span className="material-symbols-outlined mr-4 ml-2">
                    <span className="material-symbols-outlined">
                      {" "}
                      landscape{" "}
                    </span>
                  </span>
                  <div className=" w-full flex justify-evenly items-center gap-5">
                    <input
                      className="w-[60%] h-full outline-none"
                      type="number"
                      placeholder="Lands in acres"
                      value={land}
                      onChange={(e) => setLand(e.target.value)}
                    />
                    <span className="w-[40%]">acres</span>
                  </div>
                </div>

                <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
                  <span className="material-symbols-outlined mr-4 ml-2">
                    <span className="material-symbols-outlined">
                      {" "}
                      payments{" "}
                    </span>
                  </span>
                  <input
                    className="w-full h-full outline-none"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="p-2 mt-4 border rounded-md">
                  <span>
                    Note: You are required to be at work location to create a
                    job
                  </span>
                  <div className="border flex items-center p-2 mt-4">
                    <span className="flex mr-4 items-center w-1/2">
                      <span className="material-symbols-outlined mx-2">
                        {" "}
                        home{" "}
                      </span>
                      <span className="flex justify-start w-full">
                        <input
                          className="w-full h-full outline-none border p-2"
                          type="number"
                          placeholder="Latitude"
                          value={coordinates.lat}
                          disabled
                        />
                      </span>
                    </span>

                    <span className="flex items-center w-1/2">
                      <span className="material-symbols-outlined mx-2">
                        {" "}
                        home{" "}
                      </span>
                      <span className="flex justify-start w-full">
                        <input
                          className="w-full h-full outline-none border p-2"
                          type="number"
                          placeholder="Longitude"
                          value={coordinates.long}
                          disabled
                        />
                      </span>
                    </span>
                  </div>
                </div>

                <div className="border flex items-center p-2 mt-4">
                  <span className="material-symbols-outlined mx-2">person</span>
                  <span className="flex justify-start w-full">
                    <select
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setJobOptions(e.target.value)}
                      className="border outline-none p-2 w-full"
                      placeholder="Select value"
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
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default CreateJob;