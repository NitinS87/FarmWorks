import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/UserContext";
import HeroBanner from "./HeroBanner";

const Login = () => {
  const { user, setUser, userType, setUserType } = useContext(LoginContext);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(email, password, userType);

    axios
      .post(`http://localhost:8000/api/${type}/login`, {
        email: email,
        password: password,
      })
      .then((d) => {
        console.log(d.data);
        // setUser(d.data.user);
        setUser(d.data.user);
        setUserType(type);
        localStorage.setItem("Authorization", d.data.token);
        localStorage.setItem("User", JSON.stringify(d.data.user));
        localStorage.setItem("Type", JSON.stringify(d.data.type));
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response.data);
      });
  };

  // console.log(user);
  return (
    <div className="grid lg:grid-cols-2 mx-auto w-[85%] grid-cols-1 gap-10 my-10">
      <div className="flex-col">
        <form
          className="flex flex-col items-center h-full w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex-col items-center justify-center w-full">
            <div className="mx-auto">
              <h1 className="text-3xl mt-5">Login Form</h1>
            </div>

            {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">mail</span>
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="email"
                placeholder="E-mail"
                autoComplete="current-email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">
                <span className="material-symbols-outlined"> lock_open </span>
              </span>
              <span className=""></span>
              <input
                className="w-full outline-none "
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4">
              <span className="material-symbols-outlined mx-2">person</span>
              <span className="flex justify-start w-full">
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setType(e.target.value)}
                  className="border outline-none p-2 w-full"
                  placeholder="Select value"
                >
                  <option value="DEFAULT" disabled>
                    Choose a option ...
                  </option>
                  <option className="w-11" value="farmer">
                    Farmer
                  </option>
                  <option className="w-11" value="contractor">
                    Contractor
                  </option>
                  <option className="w-11" value="labour">
                    Labour
                  </option>
                </select>
              </span>
            </div>

            <div className="flex items-center justify-start mt-4 rounded-md">
              <button
                className="button shadow-sm"
                type="submit"
                onSubmit={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
          <div className="mt-5">
            <span> Don't have an account! </span>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
      <div className="hidden lg:block">
        <HeroBanner />
      </div>
    </div>
  );
};

export default Login;
