const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Welcome to the BloodBank Home Route"
  });
});

module.exports = router;
