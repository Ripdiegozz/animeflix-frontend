import { Axios } from "axios";

const axios = new Axios({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
