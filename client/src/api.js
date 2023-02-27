import axios from "axios";

const token = localStorage.getItem("Authorization");
let reqInstance = axios.create({
  headers: {
    token: `${token}`,
  },
  baseURL: "https://farm-works-server.vercel.app/",
});

export default reqInstance;
