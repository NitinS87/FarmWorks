import axios from "axios";

const token = localStorage.getItem("Authorization");
let reqInstance = axios.create({
  headers: {
    token: `${token}`,
  },
  baseURL: process.env.REACT_APP_API_URL,
  //   baseURL: "http://localhost:8000/",
});

export default reqInstance;
