import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineAvTimer,
  MdOutlineBadge,
  MdOutlineDescription,
  MdOutlineHome,
  MdOutlineLandscape,
  MdOutlinePriceCheck,
  MdPersonOutline,
  MdFilterList,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import reqInstance from "../api";
import { UserContext } from "../context/UserContext";
import { State, City } from "country-state-city";

const UpdateJob = () => {
  const [job, setJob] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  //   const [status, setStatus] = useState("");
  const params = useParams();
  const [land, setLand] = useState("");
  const [completionDays, setCompletionDays] = useState("");
  const [amount, setAmount] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [jobOptions, setJobOptions] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  //   const [latitude, setLatitude] = useState("");
  //   const [longitude, setLongitude] = useState("");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const states = State.getStatesOfCountry("IN");
  // console.log(states);
  const cities = City.getCitiesOfState("IN", state);
  // console.log(cities);

  navigator.geolocation.watchPosition(function (position) {
    // console.log("Latitude is :", position.coords.latitude);
    // console.log("Longitude is :", position.coords.longitude);
    setCoordinates({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  });

  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoadingData(true);
    axios.get(`/api/jobs/search/${params.id}`).then((response) => {
      setJobName(response.data.jobName);
      setJobDesc(response.data.jobDesc);
      setLand(response.data.land);
      setCompletionDays(response.data.completionDays);
      setAmount(response.data.amount);
      setCoordinates(response.data.coordinates);
      setJobOptions(response.data.jobOptions);
      setJobStatus(response.data.jobOptions);
      setJob(response.data);
      setState(response.data.state);
      setCity(response.data.city);
      setLoadingData(false);
    });
  }, [params.id]);

  // console.log(
  //   jobName,
  //   jobDesc,
  //   jobOptions,
  //   amount,
  //   completionDays,
  //   land,
  //   coordinates
  // );

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
    //   jobOptions
    // );

    console.log(user);
    reqInstance
      .put(`/api/jobs/update/${job._id}`, {
        farmerId: user.email,
        jobName: jobName,
        jobDesc: jobDesc,
        land: land,
        completionDays: completionDays,
        amount: amount,
        coordinates: coordinates,
        jobOptions: jobOptions,
        status: jobStatus,
        state: state,
        city: city,
      })
      .then((d) => {
        console.log(d.data);
        setLoading(false);
        navigate(`/jobs/${d.data._id}`);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
        console.log(err.response.data);
      });
  };
  if (loadingData === null)
    return (
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="loader"></div>
        <span className="text-xl text-center">
          Getting Jobs...
        </span>
      </div>
    );
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
                  <h1 className="text-3xl mt-5">Update a Job</h1>
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
                    placeholder="Description - (minimum 100 words)"
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
                    placeholder="Enter work completion days: "
                    value={completionDays}
                    required
                    onChange={(e) => setCompletionDays(e.target.value)}
                  />
                </div>

                <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
                  <MdOutlineLandscape className="text-3xl mr-4 ml-2" />
                  <div className=" w-full flex justify-evenly items-center gap-5">
                    <input
                      className="w-[60%] h-full outline-none"
                      type="number"
                      placeholder="Lands in acres"
                      value={land}
                      required
                      onChange={(e) => setLand(e.target.value)}
                    />
                    <span className="w-[40%]">acres</span>
                  </div>
                </div>

                <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
                  <MdOutlinePriceCheck className="text-3xl mr-4 ml-2" />
                  <input
                    className="w-full h-full outline-none"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    required
                    onChange={(e) => setAmount(e.target.value)}
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

                <div className="p-2 mt-4 border rounded-md">
                  <span>
                    Note: You are required to be at work location to create a
                    job
                  </span>
                  <div className="border flex items-center p-2 mt-4">
                    <span className="flex mr-4 items-center w-1/2">
                      <MdOutlineHome className="text-3xl mr-4 ml-2" />
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
                      <MdOutlineHome className="text-3xl mr-4 ml-2" />
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
                  </div>
                </div>

                <div className="border flex items-center p-2 mt-4">
                  <MdFilterList className="text-3xl mr-4 ml-2" />
                  <span className="flex justify-start w-full">
                    <select
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setJobStatus(e.target.value)}
                      className="border outline-none p-2 w-full"
                      placeholder="Select value"
                      required
                      value={jobStatus}
                    >
                      <option value="DEFAULT" disabled>
                        Choose a option ...
                      </option>
                      <option className="w-11" value="hiring">
                        Hiring
                      </option>
                      <option className="w-11" value="ongoing">
                        Ongoing
                      </option>
                      <option className="w-11" value="completed">
                        Completed
                      </option>
                    </select>
                  </span>
                </div>
                <div className="border flex items-center p-2 mt-4">
                  <span className="material-symbols-outlined mx-2 text-3xl">
                    <MdPersonOutline />
                  </span>
                  <span className="flex justify-start w-full">
                    <select
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setJobOptions(e.target.value)}
                      className="border outline-none p-2 w-full"
                      placeholder="Select value"
                      required
                      value={jobOptions}
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
                      <span>Update</span>
                    )}
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

export default UpdateJob;
