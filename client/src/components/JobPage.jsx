import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobPage = () => {
  const [job, setJob] = useState("");
  const params = useParams();
  // console.log(params);
  const url = `http://localhost:8000/api/jobs/search/${params.id}`;
  useEffect(() => {
    console.log("hgcgfdfhtfhf");
    axios.get(url).then((response) => {
      setJob(response.data);
      // console.log(response.data);
    });
  }, [url]);
  const dt1 = new Date(Date.now());
  // const dt2 = new Date(Date(job.createdOn));
  const dt2 = new Date(job.createdOn);
  console.log(dt2);
  var diffDate = Math.abs(dt1.getTime() - dt2.getTime());
  console.log(Math.round(diffDate / (3600000 * 24)));
  diffDate = Math.round(diffDate / (3600000 * 24));
  console.log(job);
  var cl = "button";
  return (
    <div className="w-[85%] h-full relative mx-auto my-16">
      {/* Heading div */}
      <div className="shadow-md rounded-md p-5 flex justify-between items-center">
        <div className="flex items-center justify-around">
          <div className="bg-gray-300 p-2 mx-4">
            <span className="material-symbols-outlined text-6xl">work</span>
          </div>
          <div className="mx-4">
            <h2 className="text-2xl">{job.jobName}</h2>
            <span className="text-xl">{job.farmerId}</span>
          </div>

          <div className="mx-4">
            <span className="text-[#C0C0C0] text-4xl">&#8377;</span>
            <span className="text-[#C0C0C0] text-4xl">{job.amount}</span>
          </div>
          <div>
            <span>Location: </span>
            <span>
              {/* <a
                href={`http://maps.google.com/maps?q=${job.coordinates?.lat},${job.coordinates?.long}`}
              >
                url
              </a> */}
            </span>
          </div>
        </div>
        <button className="button">Apply For this job</button>
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
              <span>Date Posted</span>{" "}
              <time>
                Posted on:{" "}
                {diffDate === 1 ? `${diffDate} day` : `${diffDate} days`} ago
              </time>
            </div>
          </div>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              schedule
            </span>
            <div className="flex flex-col">
              <span>Expiry Date</span>
              <span>Expired in: {job.expiredAt?.slice(0, 10)}</span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              map
            </span>
            <div className="flex flex-col">
              <span>Address </span>
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
              <span>For </span>
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
              <span>Completion Days </span>
              <span>{job.completionDays} days</span>
            </div>
          </div>
          <div className="flex items-center my-2">
            <span className="material-symbols-outlined mr-2 text-4xl p-2 bg-[#e1f1e8]">
              landscape
            </span>
            <div className="flex flex-col">
              <span>Land </span>
              <span>{job.land} acres</span>
            </div>
          </div>
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
