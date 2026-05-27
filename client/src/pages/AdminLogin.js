import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/auth/login",
        formData
      );

      // check admin role
      if (
        response.data.user.role !== "admin"
      ) {
        alert("Access Denied");

        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Admin Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="w-full border p-2 mb-4 rounded"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            onChange={handleChange}
          />

          <button className="w-full bg-red-600 text-white p-2 rounded">
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;