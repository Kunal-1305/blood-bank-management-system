const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");

const getDashboardStats = async (req, res) => {
  try {
    // total donors
    const totalDonors = await User.countDocuments({
      role: "donor",
    });

    // total requests
    const totalRequests =
      await BloodRequest.countDocuments();

    // pending requests
    const pendingRequests =
      await BloodRequest.countDocuments({
        status: "Pending",
      });

    // accepted requests
    const acceptedRequests =
      await BloodRequest.countDocuments({
        status: "Accepted",
      });

    res.status(200).json({
      totalDonors,
      totalRequests,
      pendingRequests,
      acceptedRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};