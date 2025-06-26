const express = require("express");
const router = express.Router();

router.post("/AdminLogin", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "admin123") {
    return res.json({ success: true, message: "Logged in" });
  } else {
    return res.json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
