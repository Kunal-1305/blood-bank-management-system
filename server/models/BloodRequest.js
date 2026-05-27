const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    units: {
      type: Number,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BloodRequest",
  bloodRequestSchema
);