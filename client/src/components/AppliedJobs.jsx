import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reqInstance from "../api";
import { UserContext } from "../context/UserContext";
import { MdWorkOutline } from "react-icons/md";
const AppliedJobs = () => {
  const { userType, user } = useContext(UserContext);
  console.log(user);
  const email = user?.email;
  const url = `/api/${userType}/interested/${email}`;
  var [jobs, setJobs] = useState();
  useEffect(() => {
    reqInstance.get(url).then((response) => {
      setJobs(response.data);
      console.log(response.data);
    });
  }, [url]);

  if (jobs?.length > 1) {
    jobs = jobs?.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  }
  // console.log(user);
  return (
    <div className="w-[80%] relative mx-auto mb-16">
      <h1 className="text-3xl text-gray-500 p-2">Available Jobs</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1  gap-8">
        {jobs?.map((job, jobIdx) => (
          <div
            className="lg:h-[100px] h-full mx-auto flex flex-col lg:flex-row justify-evenly items-center border-l-4 border-l-[#5FBC7C] border px-8 gap-10 my-2"
            key={jobIdx}
          >
            <div className="bg-gray-300 p-2">
              <MdWorkOutline className="text-4xl" />
            </div>
            <div className="flex-col items-center">
              <span className="text-gray-300">Comments</span>
              <div className="text-xl">
                {job.comments.length > 15
                  ? job.comments.slice(0, 15) + "..."
                  : job.comments}
              </div>
            </div>
            <div>
              <div className="mt-4 lg:m-0 rounded-md">
                <Link to={`/jobs/${job.jobId}`}>
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

export default AppliedJobs;
