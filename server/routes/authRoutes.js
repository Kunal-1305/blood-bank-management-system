const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current-user", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route Working",
    user: req.user,
  });
});

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;