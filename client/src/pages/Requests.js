import { useEffect, useState } from "react";

import API from "../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    bloodGroup: "",
    units: "",
    hospital: "",
    patientName: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await API.get("/requests");

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/requests", formData);

      alert("Blood Request Added");

      fetchRequests();

      setFormData({
        bloodGroup: "",
        units: "",
        hospital: "",
        patientName: "",
      });
    } catch (error) {
      console.log(error);

      alert("Failed");
    }
  };

  const deleteRequest = async (id) => {
    try {
      await API.delete(`/requests/${id}`);

      alert("Request Deleted");

      fetchRequests();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, {
        status,
      });

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8">
        Blood Requests
      </h1>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow-md mb-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            className="border p-2 rounded"
            value={formData.bloodGroup}
            onChange={handleChange}
          />

          <input
            type="number"
            name="units"
            placeholder="Units Needed"
            className="border p-2 rounded"
            value={formData.units}
            onChange={handleChange}
          />

          <input
            type="text"
            name="hospital"
            placeholder="Hospital Name"
            className="border p-2 rounded"
            value={formData.hospital}
            onChange={handleChange}
          />

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            className="border p-2 rounded"
            value={formData.patientName}
            onChange={handleChange}
          />

          <button className="bg-red-600 text-white p-2 rounded">
            Add Request
          </button>
        </form>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white p-6 rounded shadow-md"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              {request.bloodGroup}
            </h2>

            <p className="mb-2">
              <strong>Units:</strong>{" "}
              {request.units}
            </p>

            <p className="mb-2">
              <strong>Hospital:</strong>{" "}
              {request.hospital}
            </p>

            <p className="mb-2">
              <strong>Patient:</strong>{" "}
              {request.patientName}
            </p>

            <p className="mt-4 mb-4">
              <span
                className={`px-3 py-1 rounded text-white ${
                  (request.status || "Pending") ===
                  "Accepted"
                    ? "bg-green-600"
                    : (request.status ||
                        "Pending") === "Rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {request.status || "Pending"}
              </span>
            </p>

            {user?.role === "admin" && (
              <>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "Accepted"
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "Rejected"
                      )
                    }
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>

                <button
                  onClick={() =>
                    deleteRequest(request._id)
                  }
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;