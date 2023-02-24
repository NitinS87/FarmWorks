import React, { useContext, useState } from "react";
import HeroBanner from "./HeroBanner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import { LoginContext } from "../context/UserContext";

const Register = () => {
  const { user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState("");
  const [accepts, setAccepts] = useState(false);

  // console.log(state);
  const states = State.getStatesOfCountry("IN");
  // console.log(states);
  const cities = City.getCitiesOfState("IN", state);
  // console.log(cities);
  // console.log(city);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked");
    console.log(
      name,
      email,
      password,
      aadharNumber,
      phoneNumber,
      state,
      city,
      userType,
      accepts
    );
    axios
      .post(`http://localhost:8000/api/${userType}/register`, {
        name: name,
        email: email,
        password: password,
        aadharNumber: aadharNumber,
        phoneNumber: phoneNumber,
        state: state,
        city: city,
      })
      .then((d) => {
        console.log(d.data);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response.data);
      });
  };
  return (
    <div className="grid lg:grid-cols-2 mx-auto w-[85%] grid-cols-1 gap-10 my-10">
      <div className="hidden lg:block">
        <HeroBanner />
      </div>
      <div>
        <form
          className="flex flex-col items-center justify-center h-full w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex-col items-center justify-center w-full">
            <div className="mx-auto">
              <h1 className="text-3xl mt-5">Registration Form</h1>
            </div>
            {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">badge</span>
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">mail</span>
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="email"
                placeholder="E-mail"
                value={email}
                autoComplete="current-password"
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
                value={password}
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 focus:border rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">
                <span className="material-symbols-outlined"> demography </span>
              </span>
              <span className=""></span>
              <input
                className="w-full h-full outline-none  "
                type="tel"
                placeholder="Aadhar-Number"
                value={aadharNumber}
                required
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">
                <span className="material-symbols-outlined"> call </span>
              </span>
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="tel"
                placeholder="Phone-Number"
                value={phoneNumber}
                required
                maxLength={10}
                minLength={10}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="border flex items-center p-2 mt-4">
              <span className="flex mr-4 items-center w-1/2">
                <span className="material-symbols-outlined mx-2"> home </span>
                <span className="flex justify-start w-full">
                  <select
                    className="border outline-none p-2 w-full"
                    id="state"
                    name="location"
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option className="mx-auto w-11" value="select">
                      State
                    </option>
                    {states.map((d, idx) => (
                      <option key={idx} value={d.isoCode}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </span>
              </span>

              <span className="flex items-center w-1/2">
                <span className="material-symbols-outlined mx-2"> home </span>
                <span className="flex justify-start w-full">
                  <select
                    className="border outline-none p-2 w-full"
                    name="location"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option className="mx-auto w-11" value="select">
                      City
                    </option>
                    {cities.map((d, idx) => (
                      <option key={idx} value={d.isoCode}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </span>
              </span>
            </div>

            <div className="border flex items-center p-2 mt-4">
              <span className="material-symbols-outlined mx-2">person</span>
              <span className="flex justify-start w-full">
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setUserType(e.target.value)}
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

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                value={accepts}
                onChange={() => (setAccepts(!accepts), console.log(accepts))}
                className="mr-2"
              />
              <label htmlFor="terms">
                I agree with all the terms and conditions.
              </label>
              <br />
            </div>

            <div className="flex items-center justify-start mt-4 rounded-md">
              {accepts ? (
                <button className="button shadow-sm">Register</button>
              ) : (
                <button
                  disabled={!accepts}
                  className="button shadow-sm bg-gray-300"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </form>
        <div className="-mt-1 ">
          <span> Already have an account! </span>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
