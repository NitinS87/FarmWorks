import axios from "axios";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import reqInstance from "./api";
// import AppliedJobs from "./components/AppliedJobs";
// import CreateJob from "./components/CreateJob";
// import Footer from "./components/Footer";
// import HomePage from "./components/HomePage";
// import JobPage from "./components/JobPage";
// import Jobs from "./components/Jobs";
// import Login from "./components/Login";
// import Navbar from "./components/Navbar";
// import Profile from "./components/Profile";
// import Register from "./components/Register";
// import UpdateJob from "./components/UpdateJob";
// import ViewProfile from "./components/ViewProfile";
// import HomePageJobs from "./components/HomePageJobs";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
// import TermsAndConditions from "./components/TermsAndConditions";

import { UserContext } from "./context/UserContext";
// import loader from "./assets/loader.gif";
const AppliedJobs = React.lazy(() => import("./components/AppliedJobs"));
const CreateJob = React.lazy(() => import("./components/CreateJob"));
const Footer = React.lazy(() => import("./components/Footer"));
const HomePage = React.lazy(() => import("./components/HomePage"));
const JobPage = React.lazy(() => import("./components/JobPage"));
const Jobs = React.lazy(() => import("./components/Jobs"));
const Login = React.lazy(() => import("./components/Login"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const Profile = React.lazy(() => import("./components/Profile"));
const Register = React.lazy(() => import("./components/Register"));
const UpdateJob = React.lazy(() => import("./components/UpdateJob"));
const ViewProfile = React.lazy(() => import("./components/ViewProfile"));
const HomePageJobs = React.lazy(() => import("./components/HomePageJobs"));
const TermsAndConditions = React.lazy(() =>
  import("./components/TermsAndConditions")
);

// axios.defaults.baseURL = "https://farm-works-server.vercel.app/";
axios.defaults.baseURL = "https://farm-works-server.vercel.app/";
// axios.defaults.headers.common["token"] = localStorage.getItem("Authorization");
function App() {
  const { user, setUser, userType, setUserType } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // const userData = JSON.parse(localStorage.getItem("User"));
    // // console.log(localStorage.getItem("User"));
    // if (userData != null) setUser(userData);
    // // console.log(userData);
    // const type = JSON.parse(localStorage.getItem("Type"));
    // // console.log(localStorage.getItem("Type"));
    // // console.log(type);
    // if (type != null) setUserType(type);
    setLoading(true);
    async function loadData() {
      var token = localStorage.getItem("Authorization");
      if (token)
        reqInstance.get("/profile").then((response) => {
          setUser(response.data.user);
          setUserType(response.data.type);
        });
      setLoading(false);
    }

    loadData();
  }, [setUser, setUserType]);

  // console.log(user);
  if (loading === true) {
    console.log("Loading...");
    return (
      <React.Fragment>
        <LoadingScreen />
      </React.Fragment>
    );
  } else {
    return (
      <div className="min-w-full min-h-screen overflow-hidden relative">
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Suspense fallback={<LoadingScreen />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/jobs/home"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <HomePageJobs />
              </Suspense>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <JobPage />
              </Suspense>
            }
          />
          <Route
            path="/account"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <CreateJob />
              </Suspense>
            }
          />
          <Route
            path="/update/:id"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <UpdateJob />
              </Suspense>
            }
          />
          <Route
            path="/appliedJobs"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <AppliedJobs />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <TermsAndConditions />
              </Suspense>
            }
          />
          <Route
            path="/profile/:type/:profileId"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <ViewProfile />
              </Suspense>
            }
          />
          <Route
            path="/showAllJobs"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Jobs url={`api/jobs/`} />
              </Suspense>
            }
          />
          <Route
            path="/userJobs"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Jobs url={`api/jobs/find/${user?.email}`} />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
