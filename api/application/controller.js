const express = require("express");

const router = express.Router();

router.get("/healthcheck", function (req, res) {
  res.json({
    status: true,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
