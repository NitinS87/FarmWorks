import React, { Suspense } from "react";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
// import HeroBanner from "./HeroBanner";
// import HomePageJobs from "./HomePageJobs";
const HeroBanner = React.lazy(() => import("./HeroBanner"));
const HomePageJobs = React.lazy(() => import("./HomePageJobs"));

const HomePage = () => {
  return (
    <div className="mx-auto relative flex flex-col gap-10">
      <Suspense fallback={<LoadingScreen />}><HeroBanner /></Suspense>
      <Suspense fallback={<LoadingScreen />}><HomePageJobs url="/api/jobs" /></Suspense>
    </div>
  );
};

export default HomePage;
