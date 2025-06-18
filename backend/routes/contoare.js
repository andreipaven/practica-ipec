const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/get", async (req, res) => {
  try {
    const sql = "SELECT * FROM reports";
    const [results] = await pool.execute(sql);

    if (!results) {
      return res.status(500).json({
        success: false,
        message: "Database error - no results returned",
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No reports found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve reports",
      error: error.message,
    });
  }
});

module.exports = router;
