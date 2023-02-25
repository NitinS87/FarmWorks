import axios from "axios";

const token = localStorage.getItem("Authorization");
let reqInstance = axios.create({
  headers: {
    token: `${token}`,
  },
  baseURL: "http://localhost:8000",
});

export default reqInstance;
