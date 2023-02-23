import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import JobPage from "./components/JobPage";
import Jobs from "./components/Jobs";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";

function App() {
  const user = {
    farmerId: "raghav@ncuindia.edu",
  };
  return (
    <div className="min-w-full min-h-screen overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="/account" element={<Profile />} />
        <Route
          path="/userJobs"
          element={
            <Jobs
              url={`http://localhost:8000/api/jobs/find/${user.farmerId}`}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
