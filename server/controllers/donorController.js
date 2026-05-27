const User = require("../models/User");

// Get all donors
const getDonors = async (req, res) => {
  try {
    const { bloodGroup } = req.query;

    let filter = {
      role: "donor",
    };

    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }

    const donors = await User.find(filter).select(
      "-password"
    );

    res.status(200).json(donors);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Add donor
const addDonor = async (req, res) => {
  try {
    const {
      name,
      email,
      bloodGroup,
      phone,
      location,
    } = req.body;

    const donor = new User({
      name,
      email,
      bloodGroup,
      phone,
      location,
      password: "123456",
      role: "donor",
    });

    await donor.save();

    res.status(201).json({
      message: "Donor Added",
      donor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDonors,
  addDonor,
};