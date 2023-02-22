import React from "react";
import HeroBanner from "./HeroBanner";

const Login = () => {
  return (
    <div className="grid lg:grid-cols-2 mx-auto w-[85%] grid-cols-1 gap-10 my-10">
      <div>
        <section className="flex flex-col items-center h-full w-full">
          <div className="flex-col items-center justify-center w-full">
            <div className="mx-auto">
              <h1 className="text-3xl mt-5">Login Form</h1>
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">mail</span>
              <span className=""></span>
              <input
                className="w-[100%] outline-none"
                type="email"
                placeholder="E-mail"
              />
            </div>

            <div className="border flex items-center p-2 mt-4 rounded-md">
              <span className="material-symbols-outlined mr-4 ml-2">
                <span className="material-symbols-outlined"> lock_open </span>
              </span>
              <span className=""></span>
              <input
                className="w-full outline-none "
                type="text"
                placeholder="Password"
              />
            </div>

            <div className="border flex items-center p-2 mt-4">
              <span className="material-symbols-outlined mx-2">person</span>
              <span className="flex justify-start w-full">
                <select
                  className="border outline-none p-2 w-full"
                  id="state"
                  name="location"
                >
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
              <button className="button shadow-sm">Login</button>
            </div>
          </div>
        </section>
      </div>
      <div className="hidden lg:block">
        <HeroBanner />
      </div>
    </div>
  );
};

export default Login;
