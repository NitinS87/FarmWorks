import React from "react";
import HeroBanner from "./HeroBanner";
import HomePageJobs from "./HomePageJobs";
const HomePage = () => {
  return (
    <div className="mx-auto relative flex flex-col gap-10">
      <HeroBanner />
      <HomePageJobs url="/api/jobs" />
    </div>
  );
};

export default HomePage;
