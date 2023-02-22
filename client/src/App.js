import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import JobPage from "./components/JobPage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
    <div className="min-w-full min-h-screen overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs/:id" element={<JobPage />} />
      </Routes>
    </div>
  );
}

export default App;
