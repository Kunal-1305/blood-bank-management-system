const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  deleteRequest,
  updateRequestStatus,
} = require("../controllers/requestController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

router.post("/", authMiddleware, createRequest);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteRequest
);

router.get("/", authMiddleware, getRequests);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateRequestStatus
);

module.exports = router;