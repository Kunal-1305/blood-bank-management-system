import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await API.get("/dashboard");

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Dashboard
      </h1>

      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, {user?.name}
        </h2>

        <p className="mb-2">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="mb-2">
          <strong>Blood Group:</strong> {user?.bloodGroup}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold text-red-600">
            Total Donors
          </h3>

          <p className="text-3xl mt-4">
            {stats.totalDonors}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold text-blue-600">
            Total Requests
          </h3>

          <p className="text-3xl mt-4">
            {stats.totalRequests}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold text-yellow-600">
            Pending Requests
          </h3>

          <p className="text-3xl mt-4">
            {stats.pendingRequests}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold text-green-600">
            Accepted Requests
          </h3>

          <p className="text-3xl mt-4">
            {stats.acceptedRequests}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;