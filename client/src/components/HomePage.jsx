import React from "react";
import HeroBanner from "./HeroBanner";
import Jobs from "./Jobs"
const HomePage = () => {
  return (
    <div className="mx-auto relative flex flex-col gap-10">
      <HeroBanner />
      <Jobs/>
    </div>
  );
};

export default HomePage;
