import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reqInstance from "../api";
import { State, City } from "country-state-city";
import { MdOutlineHome, MdWorkOutline } from "react-icons/md";

const Jobs = ({ url }) => {
  // const { user, setUser } = useContext(LoginContext);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const states = State.getStatesOfCountry("IN");
  // console.log(states);
  const cities = City.getCitiesOfState("IN", state);
  var [jobs, setJobs] = useState();
  useEffect(() => {
    reqInstance.get(url).then((response) => {
      setJobs(response.data);
      // console.log(response.data);
    });
  }, [url]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .post(`/api/jobs/searchFilter`, {
        state: state,
        city: city,
      })
      .then((d) => {
        console.log(d.data);
        setJobs(d.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Some error has occured!");
        console.log(err.response.data);
        setLoading(false);
      });
  };
  // console.log(user);
  if (jobs?.length > 1) {
    jobs = jobs?.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  }
  return (
    <div className="w-[80%] relative mx-auto mb-16">
      <div>
        {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
        <h1 className="text-3xl text-gray-500 p-2">Available Jobs</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="border flex md:flex-row flex-col items-center p-2 mt-4 justify-start">
            <span className="flex lg:mr-4 items-center w-full lg:w-1/3 my-2">
              <MdOutlineHome className="text-3xl mx-2" />
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

            <span className="flex items-center w-full lg:w-1/3 my-2">
              <MdOutlineHome className="text-3xl mx-2" />
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
            <div className="flex items-center justify-start mx-4 rounded-md w-full">
              <button className="button shadow-sm" type="submit">
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <span>Filter</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 w-full">
        {jobs?.map((job, jobIdx) => (
          <div
            className="lg:h-[100px] w-full h-full mx-auto flex lg:flex-row flex-col justify-center items-center border-x-4 border-x-[#5FBC7C] border lg:px-8 gap-2 lg:gap-10 my-2"
            key={jobIdx}
          >
            <div className="flex items-center gap-2">
              <div className="bg-gray-300 p-2 mr-4">
                <MdWorkOutline className="text-4xl" />
              </div>
              <div className="flex-col">
                <div className="mb-3 text-xl">
                  {job.jobName.length > 10
                    ? job.jobName.slice(0, 10) + "..."
                    : job.jobName}
                </div>
                <div className="text-[#C0C0C0]">
                  {job.jobDesc.length > 10
                    ? job.jobDesc.slice(0, 10) + "..."
                    : job.jobDesc}
                </div>
              </div>
            </div>
            <div>
              <span className="text-[#C0C0C0] text-4xl">&#8377;</span>
              <span className="text-[#C0C0C0] text-4xl">{job.amount}</span>
            </div>
            <div>
              <div className="mt-4 rounded-md">
                <Link to={`/jobs/${job._id}`}>
                  <button className="bg-[#52c075] p-4 font-semibold text-xl lg:text-base text-white hover:scale-105 hover:text-black duration-300 ease-in-out">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
