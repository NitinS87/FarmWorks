import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginContext } from "./../context/UserContext";

const Jobs = ({ url }) => {
  // const { user, setUser } = useContext(LoginContext);
  const [jobs, setJobs] = useState();
  useEffect(() => {
    axios.get(url).then((response) => {
      setJobs(response.data);
      // console.log(response.data);
    });
  }, []);

  // console.log(user);
  return (
    <div className="w-[80%] relative mx-auto mb-16">
      <h1 className="text-3xl text-gray-500 p-2">Available Jobs</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1  gap-8">
        {jobs
          ?.sort((a, b) =>
            a.createdOn > b.createdOn ? 1 : b.createdOn > a.createdOn ? -1 : 0
          )
          .slice(0, 6)
          ?.map((job, jobIdx) => (
            <div
              className="lg:h-[100px] h-full mx-auto flex flex-col lg:flex-row justify-evenly items-center border-l-4 border-l-[#5FBC7C] border px-8 gap-10"
              key={jobIdx}
            >
              <div className="bg-gray-300 p-2">
                <span className="material-symbols-outlined">work</span>
              </div>
              <div className="h-[70%] my-auto flex-col">
                <div className="mb-3 text-xl">
                  {job.jobName.length > 15
                    ? job.jobName.slice(0, 15) + "..."
                    : job.jobName}
                </div>
                <div className="text-[#C0C0C0]">
                  {job.jobDesc.length > 20
                    ? job.jobDesc.slice(0, 20) + "..."
                    : job.jobDesc}
                </div>
              </div>
              <div>
                <span className="text-[#C0C0C0] text-4xl">&#8377;</span>
                <span className="text-[#C0C0C0] text-4xl">{job.amount}</span>
              </div>
              <div>
                <div className="mt-4 rounded-md">
                  <Link to={`/jobs/${job._id}`}>
                    <button className="bg-[#52c075] p-2 text-white hover:scale-105 hover:text-black duration-300 ease-in-out">
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
