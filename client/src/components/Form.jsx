import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [desc, setDesc] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  async function addPhotoByLink(e) {
    e.preventDefault();
    await axios.post("/upload-by-link", { link: photoLink });
  }
  return (
    <div className="w-full flex mt-8 gap-2 justify-center mb-8 mx-4">
      <form>
        <h2 className="text-2xl mt-4">Title</h2>
        <input
          type="text"
          placeholder="Title for your place, should be short and catchy as in advertisement"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Address</h2>
        <input
          type="text"
          placeholder="address for your place"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm">more = better</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add using a link...."
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            onClick={addPhotoByLink}
            className="bg-gray-200 px-4 rounded-2xl"
          >
            Add&nbsp;photo
          </button>
        </div>
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload
          </button>
        </div>
        <h2 className="text-2xl mt-4">Description</h2>
        <textarea
          placeholder="Enter some description of your place"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <h2 className="text-2xl mt-4">Extra Info</h2>
        <textarea
          placeholder="House rules, etc"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Check in & Check out times</h2>
        <p className="text-gray-500 text-sm">
          Add check in and check out time accordingly, remember to have extra
          time for cleaning
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2">Check out time</h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2">Max numbor of guests</h3>
            <input
              type="number"
              min="1"
              placeholder="Number of guests allowed"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-rose-500 my-4 w-full rounded-2xl p-2 text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
