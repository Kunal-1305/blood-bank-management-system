const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

// protected dashboard route
router.get("/", authMiddleware, getDashboardStats);

module.exports = router;