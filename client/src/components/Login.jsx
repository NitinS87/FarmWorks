import axios from "axios";
import React, { Suspense, useContext, useState } from "react";
import { MdLockOutline, MdMailOutline, MdPersonOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
const HeroBanner = React.lazy(() => import("./HeroBanner"));

const Login = () => {
  const { setUser, setUserType } = useContext(UserContext);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if (type !== "") {
      axios
        .post(`/api/${type}/login`, {
          email: email,
          password: password,
        })
        .then((d) => {
          console.log(d.data);
          // setUser(d.data.user);
          setUser(d.data.user);
          setUserType(type);
          localStorage.removeItem("Authorization");
          localStorage.setItem("Authorization", d.data.token);
          // localStorage.setItem("User", JSON.stringify(d.data.user));
          // localStorage.setItem("Type", JSON.stringify(d.data.type));
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setError(err.response.data);
          console.log(err.response.data);
          setLoading(false);
        });
    }

    // console.log(email, password, type);
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
              <span className="mr-4 ml-2">
                <MdMailOutline className="text-3xl" />
              </span>
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="email"
                placeholder="E-mail"
                autoComplete="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="mr-4 ml-2">
                <MdLockOutline className="text-3xl" />
              </span>
              <span className=""></span>
              <input
                className="w-full outline-none "
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                name="password"
                minLength={8}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4">
              <span className="material-symbols-outlined mx-2">
                <MdPersonOutline className="text-3xl" />
              </span>
              <span className="flex justify-start w-full">
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setType(e.target.value)}
                  className="border outline-none p-2 w-full"
                  placeholder="Select value"
                  required
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
              >{loading ? (
                <span className="loader"></span>
              ) : (
                <span>Login</span>
              )}
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
        <Suspense fallback={<LoadingScreen />}><HeroBanner /></Suspense>
      </div>
    </div>
  );
};

export default Login;
