const express = require("express");

const router = express.Router();

const {
  getDonors,
  addDonor,
} = require("../controllers/donorController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

router.get(
  "/",
  authMiddleware,
  getDonors
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addDonor
);

module.exports = router;