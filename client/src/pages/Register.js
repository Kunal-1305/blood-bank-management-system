import { useState } from "react";

import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    phone: "",
    location: "",
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
        "/auth/register",
        formData
      );

      alert(response.data.message);

      console.log(response.data);

      setFormData({
        name: "",
        email: "",
        password: "",
        bloodGroup: "",
        phone: "",
        location: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full border p-2 mb-4 rounded"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border p-2 mb-4 rounded"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border p-2 mb-4 rounded"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            className="w-full border p-2 mb-4 rounded"
            value={formData.bloodGroup}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 mb-4 rounded"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border p-2 mb-4 rounded"
            value={formData.location}
            onChange={handleChange}
          />

          <button className="w-full bg-red-600 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;