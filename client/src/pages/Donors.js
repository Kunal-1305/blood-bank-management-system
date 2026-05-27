import { useEffect, useState } from "react";

import API from "../services/api";

function Donors() {
  const [donors, setDonors] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bloodGroup, setBloodGroup] =
    useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    phone: "",
    location: "",
  });

  const fetchDonors = async () => {
    try {
      let url = "/donors";

      if (bloodGroup) {
        url += `?bloodGroup=${bloodGroup}`;
      }

      const response = await API.get(url);

      setDonors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDonors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloodGroup]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/donors", formData);

      alert("Donor Added");

      fetchDonors();

      setFormData({
        name: "",
        email: "",
        bloodGroup: "",
        phone: "",
        location: "",
      });
    } catch (error) {
      console.log(error);

      alert("Failed");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8">
        Blood Donors
      </h1>

      {/* Admin Add Donor Form */}
      {user?.role === "admin" && (
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Add Donor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              className="border p-2 rounded"
              value={formData.bloodGroup}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="border p-2 rounded"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="border p-2 rounded"
              value={formData.location}
              onChange={handleChange}
            />

            <button className="bg-red-600 text-white p-2 rounded">
              Add Donor
            </button>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="mb-8">
        <select
          className="border p-2 rounded"
          value={bloodGroup}
          onChange={(e) =>
            setBloodGroup(e.target.value)
          }
        >
          <option value="">
            All Blood Groups
          </option>

          <option value="A+">A+</option>
          <option value="A-">A-</option>

          <option value="B+">B+</option>
          <option value="B-">B-</option>

          <option value="O+">O+</option>
          <option value="O-">O-</option>

          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      {/* Donor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white p-6 rounded shadow-md"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              {donor.name}
            </h2>

            <p className="mb-2">
              <strong>Email:</strong> {donor.email}
            </p>

            <p className="mb-2">
              <strong>Blood Group:</strong>{" "}
              {donor.bloodGroup}
            </p>

            <p className="mb-2">
              <strong>Phone:</strong> {donor.phone}
            </p>

            <p className="mb-2">
              <strong>Location:</strong>{" "}
              {donor.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Donors;