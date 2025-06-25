const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/get-period", async (req, res) => {
  const { period, equipment } = req.body;
  try {
    const sql =
      "SELECT DATE(created) AS day, SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) AS equipment, (MAX(val) - MIN(val))/MAX(de_impartit_la) AS daily_consumption FROM reports WHERE created >= ? AND SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) = ? and val!=0 GROUP BY day, equipment ORDER BY day DESC;";
    const [results] = await pool.execute(sql, [`${period}`, `${equipment}`]);

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
router.post("/get-day", async (req, res) => {
  const { period, equipment } = req.body;
  try {
    const sql =
      "SELECT DISTINCT  (created) AS day , (MAX(val) - MIN(val))/MAX(de_impartit_la) AS daily_consumption FROM reports where created like ?  and  SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) = ? and val!=0 GROUP BY(created) ORDER by day ;";
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

router.post("/get-equipments", async (req, res) => {
  try {
    const sql =
      "SELECT DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) AS equipments FROM reports;";

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
        message: "No equipments found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Reports retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error fetching equipments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve equipments",
      error: error.message,
    });
  }
});

router.post("/get-custom-period", async (req, res) => {
  const { start, end, equipment } = req.body;
  console.log(start, end, equipment);
  const newEndDate = new Date(end);
  newEndDate.setDate(newEndDate.getDate() + 1);
  const sqlEnd = newEndDate.toISOString().split("T")[0];
  try {
    const sql =
      "SELECT DATE(created) AS day, SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) AS equipment, (MAX(val) - MIN(val))/MAX(de_impartit_la) AS daily_consumption FROM reports WHERE created >= ? and created <=? AND SUBSTRING_INDEX(SUBSTRING_INDEX(parametru, '.', 2), '.', -1) = ? and val!=0 GROUP BY day, equipment ORDER BY day DESC;";
    const [results] = await pool.execute(sql, [
      `${start} 23:59:00`,
      `${sqlEnd} 23:59:00`,
      `${equipment}`,
    ]);

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
