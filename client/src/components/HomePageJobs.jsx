import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reqInstance from "../api";
import { MdWorkOutline } from "react-icons/md";

const HomePageJobs = ({ url }) => {
  // const { user, setUser } = useContext(LoginContext);
  let [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    reqInstance.get(url).then((response) => {
      setJobs(response.data);
      setLoading(false);
      // console.log(response.data);
    });
  }, [url]);

  // console.log(user);
  if (jobs?.length > 1) {
    jobs = jobs?.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  }
  if (loading === null)
    return (
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="loader"></div>
        <span className="text-xl text-center">
          Getting jobs...
        </span>
      </div>
    );
  return (
    <div className="w-[80%] relative mx-auto mb-16">
      <h1 className="text-3xl text-gray-500 p-2">Available Jobs</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 w-full">
        {jobs?.slice(0, 6)?.map((job, jobIdx) => (
          <div
            className="lg:h-[100px] w-full h-full mx-auto flex lg:flex-row flex-col justify-center items-center border-x-4 border-x-[#5FBC7C] border lg:px-8 gap-2 lg:gap-10 my-2"
            key={jobIdx}
          >
            <div className="flex items-center gap-2">
              <div className="bg-gray-300 p-2">
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
      <div className="mx-auto mt-4">
        <Link to="/showAllJobs">
          <button className="button">View all jobs</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePageJobs;
