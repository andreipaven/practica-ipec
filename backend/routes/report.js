const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/get-day", async (req, res) => {
  const { period, equipment } = req.body;
  try {
    const sql =
      "SELECT DATE(created) AS day, SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) AS equipment, MAX(val) - MIN(val) AS daily_consumption FROM reports WHERE created >= ? AND SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) = ? GROUP BY day, equipment ORDER BY day DESC;";
    const [results] = await pool.execute(sql, [`${period}%`, `${equipment}`]);

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
