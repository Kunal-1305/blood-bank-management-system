const BloodRequest = require("../models/BloodRequest");

// Create blood request
const createRequest = async (req, res) => {
  try {
    const { bloodGroup, units, hospital, patientName } =
      req.body;

    const newRequest = new BloodRequest({
      requester: req.user.id,
      bloodGroup,
      units,
      hospital,
      patientName,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Blood Request Created",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    await BloodRequest.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Request Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all blood requests
const getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().populate(
      "requester",
      "name email bloodGroup"
    );

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update request status
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedRequest =
      await BloodRequest.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      message: "Request Status Updated",
      request: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRequest,
  getRequests,
  deleteRequest,
  updateRequestStatus,
};