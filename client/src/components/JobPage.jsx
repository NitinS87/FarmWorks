import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobPage = () => {
  const [job, setJob] = useState();
  const params = useParams();
  // console.log(params);
  const [url, setUrl] = useState("");
  setUrl(`http://localhost:8000/api/jobs/search/${params.id}`);
  useEffect(() => {
    console.log("useEffect called");
    const getJob = async () => {
      try {
        const res = await axios.get(url);
        setJob(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getJob();
  }, [url]);

  // console.log(job);
  // const job = {
  //   _id: "63f4e209dbfa1eda7207c26d",
  //   farmerId: "raghav@ncuindia.edu",
  //   jobName: "Cultivating",
  //   jobDesc: "yuguygifghisudhsiuhvigsdviugsdvi",
  //   expiredAt: "2023-04-09T15:23:53.998Z",
  //   land: 5,
  //   completionDays: 15,
  //   amount: 5000,
  //   coordinates: {
  //     lat: 65.56,
  //     long: 65.56,
  //   },
  //   jobOptions: "both",
  //   state: "Haryana",
  //   district: "Jhajhar",
  //   createdOn: "2023-02-21T15:23:53.999Z",
  //   __v: 0,
  // };

  return (
    <div className="w-[85%] h-full relative mx-auto my-16">
      {/* Heading div */}
      <div className="shadow-md rounded-md p-5 flex justify-between items-center">
        <div className="flex items-center justify-around">
          <div className="bg-gray-300 p-2 mx-4">
            <span className="material-symbols-outlined">work</span>
          </div>
          <div className="mx-4">
            <h2>{job.jobName}</h2>
            <span>{job.farmerId}</span>
          </div>

          <div className="mx-4">
            <span className="text-[#C0C0C0] text-4xl">&#8377;</span>
            <span className="text-[#C0C0C0] text-4xl">{job.amount}</span>
          </div>
          <div>
            <span>Address</span>
          </div>
        </div>
        <button className="button">Apply For this job</button>
      </div>
      {/* Job overview */}
      <h1>Job overview</h1>

      <div>
        {/* Overview */}
        <div>Overview</div>
        {/* Description */}
        <div>Description</div>
      </div>
    </div>
  );
};

export default JobPage;
