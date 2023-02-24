import { useState } from "react";
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
import { LoginContext } from "./context/UserContext";

function App() {
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState("");

  return (
    <LoginContext.Provider value={{ user, setUser, userType, setUserType }}>
      <div className="min-w-full min-h-screen overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobPage />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/create" element={<CreateJob op="create" />} />
          {user.email ? (
            <Route
              path="/userJobs"
              element={
                <Jobs
                  url={`http://localhost:8000/api/jobs/find/${user.email}`}
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
