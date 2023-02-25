import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  redirect,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { UserContext } from "../context/UserContext";

const JobPage = () => {
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [job, setJob] = useState("");
  const params = useParams();
  // console.log(params);
  const url = `http://localhost:8000/api/jobs/search/${params.id}`;
  useEffect(() => {
    // console.log("hgcgfdfhtfhf");
    axios.get(url).then((response) => {
      setJob(response.data);
      // console.log(response.data);
    });
  }, [url]);
  const dt1 = new Date(Date.now());
  // const dt2 = new Date(Date(job.createdOn));
  const dt2 = new Date(job.createdOn);
  // console.log(dt2);
  var diffDate = Math.abs(dt1.getTime() - dt2.getTime());
  // console.log(Math.round(diffDate / (3600000 * 24)));
  diffDate = Math.round(diffDate / (3600000 * 24));
  // console.log(job);
  // var cl = "button";
  // console.log(user);

  const handleDelete = (e) => {
    e.preventDefault();

    console.log("delete");
    axios
      .delete(`http://localhost:8000/api/jobs/delete/${params.id}`, { token })
      .then((response) => {
        // console.log(response.data);
        setSuccess(response.data);
        navigate("/userJobs");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response.data);
      });
  };
  const handleApply = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-[85%] h-full relative mx-auto my-16">
      {/* Heading div */}
      {success ? <p className="bg-green-500 p-3 my-2">{success}</p> : null}
      {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
      <div className="flex shadow-md rounded-md p-5 justify-between items-center ">
        <div className="flex items-center justify-around">
          <div className="bg-gray-300 p-2 mx-4">
            <span className="material-symbols-outlined text-6xl">work</span>
          </div>
          <div className="mx-4">
            <h2 className="text-2xl">{job.jobName}</h2>
            <span className="text-xl">{job.farmerId}</span>
          </div>

          <div className="mx-4">
            <span className="text-[#C0C0C0] text-4xl">Price: &#8377;</span>
            <span className="text-[#C0C0C0] text-4xl">{job.amount}</span>
          </div>
        </div>
        {job.farmerId === user?.email ? (
          <div className="flex gap-4">
            <Link to={`/update/${job._id}`}>
              <button className="button">Update</button>
            </Link>
            <button className="button !bg-red-500" onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : (
          <button className="button" onClick={handleApply}>
            Apply For this job
          </button>
        )}
      </div>
      {/* Job overview */}
      <div className="flex lg:flex-row flex-col justify-around ml-2 mt-10">
        {/* Overview */}
        <div className="bg-[#fafafa] lg:w-[40%] w-[85%] px-5 py-2">
          <h1 className="m-1 font-bold text-xl text-gray-400">Overview</h1>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              calendar_month
            </span>
            <div className="flex flex-col">
              <span className="text-gray-500">Date Posted</span>{" "}
              <time>
                Posted on:{" "}
                {diffDate === 1 ? `${diffDate} day` : `${diffDate} days`} ago
              </time>
            </div>
          </div>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              map
            </span>
            <div className="flex flex-col">
              <span className="text-gray-500">Address </span>
              <span>
                {job.state}, {job.district}
              </span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              work
            </span>
            <div className="flex flex-col">
              <span className="text-gray-500">For </span>
              <span>
                {job.jobOptions === "both"
                  ? "Labour and Contractor"
                  : `${job.jobOptions}`}
              </span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              timer
            </span>
            <div className="flex flex-col">
              <span className="text-gray-500">Completion Days </span>
              <span>{job.completionDays} days</span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              landscape
            </span>
            <div className="flex flex-col">
              <span className="text-gray-500">Land </span>
              <span>{job.land} acres</span>
            </div>
          </div>

          <div className="flex items-center my-2">
            <a
              href={`http://maps.google.com/maps?q=${job.coordinates?.lat},${job.coordinates?.long}`}
              target="_blank"
              className="flex items-center hover:scale-105 ease-in-out duration-300"
            >
              <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
                location_on
              </span>
              <div className="flex flex-col">
                <span className="text-gray-500">Maps </span>
                <span>See Location</span>
              </div>
            </a>
          </div>

          {user?.phoneNumber ? (
            <div className="flex items-center my-2">
              <a
                href={`tel:${user?.phoneNumber}`}
                className="flex items-center hover:scale-105 ease-in-out duration-300"
              >
                <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
                  call
                </span>
                <div className="flex flex-col">
                  <span className="text-gray-500">Phone Number </span>
                  <span>{user?.phoneNumber}</span>
                </div>
              </a>
            </div>
          ) : null}
        </div>
        {/* Description */}
        <div className="bg-[#fafafa] lg:w-[40%] w-[85%] overflow-auto px-5 py-2">
          <h1 className="m-1 font-bold text-xl text-gray-400">Description</h1>
          <span className="m-1">{job.jobDesc}</span>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
