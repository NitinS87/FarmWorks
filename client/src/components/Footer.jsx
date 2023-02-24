import React from "react";
import logo from "../assets/logo.jpg";
const Footer = () => {
  return (
    <div className="bg-[#282828] mt-5">
      <div className=" w-[80%] mx-auto">
        <div>
          <img className="relative h-[5%] w-[5%] ml-8 top-5" src={logo} />
        </div>
        <div className="border mt-8 border-[#343434]"></div>

        <div className="xl:w-[75%] flex justify-between flex-wrap gap-10 lg:gap-10 ml-16 mt-8 text-white">
          <div className="w-[20%] xl:w-fit">
            <h2 className="text-[16px] xl:py-[10px] py-[15px]">Company</h2>
            <ul className="text-[#73817E] flex flex-col gap-[10px] leading-[24px] font-[400]  ">
              <li className="hover:underline hover:text-white">
                <a href="#">About</a>
              </li>
              <li className="hover:underline hover:text-white">
                <a href="#">Jobs</a>
              </li>
              <li className="hover:underline hover:text-white">
                <a href="#">Branding</a>
              </li>
              <li className="hover:underline hover:text-white">
                <a href="#">Newsroom</a>
              </li>
              <li className="hover:underline text-[#1f1f1f00] select-none">
                <a href="#">.</a>
              </li>
            </ul>
          </div>

          <div className="w-[20%] xl:w-fit">
            <h2 className="text-[16px]  xl:py-[10px] py-[15px]">Resources</h2>
            <ul className="text-[#73817E] flex flex-col gap-[10px] leading-[24px] font-[400] ">
              <li className="hover:underline hover:text-white">
                <a href="#">Colleges</a>
              </li>
              <li className="hover:underline hover:text-white">
                <a href="#">Support</a>
              </li>
              <li className="hover:underline hover:text-white">
                <a href="#">Safety</a>
              </li>
              <li className="hover:underline hover:text-white">
                <a href="#">Blog</a>
              </li>
              <li className="hover:underline hover:text-white">
                <a href="#">Feedback</a>
              </li>
            </ul>
          </div>

          <div className="w-[40%] xl:w-fit md:w-[20%]">
            <h2 className="text-[16px]  xl:py-[10px] py-[15px]">Policies</h2>
            <ul className="text-[#73817E] flex flex-col gap-[10px] leading-[24px] font-[400] ">
              <li className="hover:underline hover:text-white duration-150">
                <a href="#">Terms</a>
              </li>
              <li className="hover:underline hover:text-white duration-150">
                <a href="#">Privacy</a>
              </li>
              <li className="hover:underline hover:text-white duration-150">
                <a href="#">Cookie Settings</a>
              </li>
              <li className="hover:underline hover:text-white duration-150">
                <a href="#">Guidelines</a>
              </li>
              <li className="hover:underline hover:text-white duration-150">
                <a href="#">Acknowledgements</a>
              </li>
              <li className="hover:underline hover:text-white duration-150">
                <a href="#">Licenses</a>
              </li>
              <li className="hover:underline hover:text-white duration-150">
                <a href="#">Moderation</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border mt-8 border-[#343434]"></div>
        <div className="flex justify-between items-center">
          <div className="text-[#73817E]">
            © 2023 FarmWorks. All Rights Reserved.
          </div>
          <div className="text-white text-[23px] flex gap-7 relative ">
            <a href="#">
              <i className="fa-brands fa-twitter hover:text-green-500"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram hover:text-green-500"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-square-facebook hover:text-green-500"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-youtube hover:text-green-500"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
