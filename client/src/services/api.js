import axios from "axios";

const API = axios.create({
  baseURL: "https://blood-bank-management-system-rjfy.onrender.com/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;