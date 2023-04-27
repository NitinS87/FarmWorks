/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import reqInstance from "./../api";
import {
  MdCall,
  MdFilterAlt,
  MdLandscape,
  MdOutlineBadge,
  MdOutlineCalendarToday,
  MdOutlineDescription,
  MdOutlineGroupAdd,
  MdOutlineHome,
  MdOutlineLocationOn,
  MdOutlineThumbsUpDown,
  MdOutlineWorkOutline,
  MdTimer,
  MdWorkOutline,
} from "react-icons/md";

const JobPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, userType } = useContext(UserContext);
  const [job, setJob] = useState("");
  const params = useParams();
  const [apply, setApply] = useState(false);
  const [comments, setComments] = useState("");
  const [check, setCheck] = useState(false);
  const [temp, setTemp] = useState(false);

  // console.log(params);
  const url = `/api/jobs/search/${params.id}`;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async function fetchData() {
    //   // Here we are simulating a delay of 2 seconds to mimic data fetching.
    //   await new Promise((forLoop) => setTimeout(forLoop, 2000));
    //   setLoading(false);
    // }
    // fetchData();

    setLoading(true);
    async function loadData() {
      try {
        axios.get(url).then((response) => {
          setJob(response.data);
          console.log(response.data);

          const jobData = response.data;
          // fetchData();
          // console.log("loop");

          var email = user?.email;
          console.log(user);
          forLoop(jobData, email);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    async function forLoop(jobData, email) {
      for (var i = 0; i < jobData.interested?.length; i++) {
        // console.log("Hey");

        var interestId = jobData.interested[i].id;
        console.log(email, interestId);
        if (interestId === email) {
          // console.log("If checked");
          if (temp) {
            // console.log("Hey");
            setCheck(false);
          } else {
            setCheck(true);
          }
          console.log(check);
          break;
        }
      }
    }

    loadData();
  }, [url, check, apply, user]);
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

  // const handleDelete = (e) => {
  //   e.preventDefault();

  //   console.log("delete");
  //   reqInstance
  //     .delete(`/api/jobs/delete/${params.id}`, { token })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setSuccess(response.data);
  //       navigate("/userJobs");
  //     })
  //     .catch((err) => {
  //       setError(err.response.data);
  //       console.log(err.response.data);
  //     });
  // };
  const handleApply = (e) => {
    e.preventDefault();
    setApply(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    // if (check == false) {
    //   setApply(!apply);
    // }

    reqInstance
      .post("/api/jobs/interested", {
        id: user.email,
        type: userType,
        jobId: job._id,
        comments: comments,
      })
      .then((response) => {
        console.log(response.data);
        if (check === true) {
          setError(response.data);
          setTemp(true);
          setCheck(false);
        } else {
          setSuccess(response.data);
          setTemp(false);
          setCheck(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Some error has occurred");
      });
    setComments("");
  };
  if (loading === null)
    return (
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="loader"></div>
        <span className="text-xl text-center">
          Getting job details...
        </span>
      </div>
    );
  return (
    <div className="w-[85%] h-full relative mx-auto my-16">
      {/* Heading div */}
      {success ? <p className="bg-green-500 p-3 my-2">{success}</p> : null}
      {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
      <div className="flex flex-col lg:flex-row shadow-md rounded-md p-5 justify-between items-center gap-3">
        <div className="flex flex-col lg:flex-row items-center justify-around">
          <div className="flex">
            <div className="bg-gray-300 p-2 mx-4">
              <MdWorkOutline className="text-5xl" />
            </div>
            <div className="mx-4">
              <h2 className="text-2xl">{job.jobName}</h2>
              <span className="text-xl">{job.farmerId}</span>
            </div>
          </div>
          <div className="mx-4">
            <span className="text-[#C0C0C0] text-4xl">Pay: &#8377;</span>
            <span className="text-[#C0C0C0] text-4xl">{job.amount}</span>
          </div>
        </div>
        {job.farmerId === user?.email ? (
          <div className="flex gap-4">
            <Link to={`/update/${job._id}`}>
              <button className="button">Update</button>
            </Link>
            {/* <button className="button !bg-red-500" onClick={handleDelete}>
              Delete
            </button> */}
          </div>
        ) : userType !== "farmer" && user?.email ? (
          check === false ? (
            <button className="button" onClick={handleApply}>
              Apply For this job
            </button>
          ) : (
            <button className="button" onClick={handleApplySubmit}>
              Already applied!
            </button>
          )
        ) : null}
      </div>
      {/* Job overview */}
      <div className="flex lg:flex-row flex-col justify-around ml-2 mt-10">
        {/* Overview */}
        <div className="bg-[#fafafa] lg:w-[40%] w-[85%] px-5 py-2">
          <h1 className="m-1 font-bold text-xl text-gray-400">Overview</h1>
          <div className="flex items-center my-2">
            <MdOutlineCalendarToday className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
            <div className="flex flex-col">
              <span className="text-gray-500">Date Posted</span>{" "}
              <time>
                Posted on:{" "}
                {diffDate === 1 ? `${diffDate} day` : `${diffDate} days`} ago
              </time>
            </div>
          </div>
          <div className="flex items-center my-2">
            <MdFilterAlt className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
            <div className="flex flex-col">
              <span className="text-gray-500">Status </span>
              <span>{job.status}</span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <MdOutlineWorkOutline className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
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
            <MdTimer className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
            <div className="flex flex-col">
              <span className="text-gray-500">Completion Days </span>
              <span>{job.completionDays} days</span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <MdLandscape className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
            <div className="flex flex-col">
              <span className="text-gray-500">Land </span>
              <span>{job.land} acres</span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <MdOutlineHome className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
            <div className="flex flex-col">
              <span className="text-gray-500">State </span>
              <span>
                {job.state}, <span>{job.city}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center my-2">
            <a
              href={`http://maps.google.com/maps?q=${job.coordinates?.lat},${job.coordinates?.long}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center hover:scale-105 ease-in-out duration-300"
            >
              <MdOutlineLocationOn className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
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
                <MdCall className="mr-2 text-5xl p-2 bg-[#e1f1e8]" />
                <div className="flex flex-col">
                  <span className="text-gray-500">Phone Number </span>
                  <span>{user?.phoneNumber}</span>
                </div>
              </a>
            </div>
          ) : null}
        </div>
        {/* Description */}
        <div className="bg-[#fafafa] lg:w-[40%] w-[85%] !overflow-y-auto px-5 py-2 break-words">
          <h1 className="m-1 font-bold text-xl text-gray-400">Description</h1>
          <span className="m-1">{job.jobDesc}</span>
        </div>
      </div>
      <div className="w-[95%] mx-auto flex lg:flex-row flex-col gap-2">
        {job?.pictures?.map((picture, idx) => {
          // console.log(picture);
          return (
            <div key={idx} className="overflow-auto">
              <img src={picture} alt="" className="object-cover" />
            </div>
          );
        })}
      </div>
      {job.farmerId === user?.email ? (
        <div className="lg:w-[50%] w-full mx-auto">
          <div className="flex-col justify-around ml-2 mt-10 bg-[#fafafa] ">
            <div className="px-5 py-2 flex items-center gap-1">
              <MdOutlineThumbsUpDown className="text-3xl" />
              <h1 className="m-1 font-bold text-xl text-gray-400">
                Interested
              </h1>
            </div>

            <div className="mx-2 ">
              {job.interested?.map((interest, idx) => {
                // console.log(interest);
                return (
                  <div
                    key={idx}
                    className="flex gap-2 items-center md:flex-row flex-col border-b-2 pb-2"
                  >
                    <div className="border-r px-2 hidden md:block">
                      <h1>{idx + 1}.</h1>
                    </div>
                    <div className="flex gap-2 items-center">
                      <MdOutlineGroupAdd className="text-3xl" />
                      <h1>{interest.id}</h1>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500">Comments: </span>
                      <h1>{interest.comments}</h1>
                    </div>
                    <div>
                      <Link to={`/profile/${interest.type}/${interest.id}`}>
                        <button className="button">View Details</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      {/* Side-drawer Menu */}
      <div
        className={
          apply
            ? "fixed top-0  left-0 w-screen h-screen bg-black/60 z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <span
          className="material-symbols-outlined absolute right-10 top-4 cursor-pointer text-white"
          onClick={() => setApply(!apply)}
          size={30}
        >
          close
        </span>

        <div className="flex justify-center items-center w-screen h-screen">
          <div className="w-[85%] h-[85%] flex-col items-center justify-center bg-white rounded-md">
            <div className="border flex items-center p-2 mt-4 rounded-md mx-auto md:w-[60%] w-[95%]">
              <MdOutlineBadge className="mr-4 ml-2 text-3xl" />
              <span className="text-gray-400">
                User Email:{" "}
                <span className="text-black mx-2">{user?.email}</span>
              </span>
            </div>
            <div className="border flex items-center p-2 mt-4 rounded-md mx-auto md:w-[60%] w-[95%]">
              <MdOutlineBadge className="mr-4 ml-2 text-3xl" />
              <span className="text-gray-400">
                Job name:{" "}
                <span className="text-black mx-2">{job?.jobName}</span>
              </span>
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md mx-auto md:w-[60%] w-[95%]">
              <MdOutlineDescription className="mr-4 ml-2 text-3xl" />
              <textarea
                className="w-full outline-none h-24 resize-y"
                placeholder="Comments - (minimum 100 words)"
                onChange={(e) => setComments(e.target.value)}
                value={comments}
              />
            </div>

            <div className="w-full flex justify-center items-center mt-4">
              <button
                className="button mx-auto"
                onClick={(e) => {
                  setApply(false);
                  console.log(apply);
                  handleApplySubmit(e);
                }}
              >
                Apply for job!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
