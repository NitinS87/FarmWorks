import { useEffect, useState } from "react";
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
import { LoginContext } from "./context/UserContext";

function App() {
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    if (userData) setUser(userData);
    // console.log(userData);
    const type = JSON.parse(localStorage.getItem("Type"));
    // console.log(type);
    if (type) setUser(userType);
  }, []);
  return (
    <LoginContext.Provider value={{ user, setUser, userType, setUserType }}>
      <div className="min-w-full min-h-screen overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobPage />} />
          {user?.email ? <Route path="/account" element={<Profile />} /> : null}
          {user?.email ? (
            <Route path="/create" element={<CreateJob />} />
          ) : null}
          {user?.email ? (
            <Route path="/update/:id" element={<UpdateJob />} />
          ) : null}
          {user?.email ? (
            <Route
              path="/userJobs"
              element={
                <Jobs
                  url={`http://localhost:8000/api/jobs/find/${user?.email}`}
                />
              }
            />
          ) : null}
        </Routes>
        <Footer />
      </div>
    </LoginContext.Provider>
  );
}

export default App;
