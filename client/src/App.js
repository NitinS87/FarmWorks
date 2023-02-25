import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateJob from "./components/CreateJob";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import JobPage from "./components/JobPage";
import Jobs from "./components/Jobs";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";
import UpdateJob from "./components/UpdateJob";
import { UserContext, UserProvider } from "./context/UserContext";

function App() {
  const { user, setUser, setUserType } = useContext(UserContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    // console.log(localStorage.getItem("User"));
    if (userData != null) setUser(userData);
    // console.log(userData);
    const type = JSON.parse(localStorage.getItem("Type"));
    // console.log(localStorage.getItem("Type"));
    // console.log(type);
    if (type != null) setUserType(type);
  }, []);
  return (
    <div className="min-w-full min-h-screen overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/update/:id" element={<UpdateJob />} />
        <Route
          path="/userJobs"
          element={
            <Jobs url={`http://localhost:8000/api/jobs/find/${user?.email}`} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
