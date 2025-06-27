require("dotenv").config();

const express = require("express");

const reportRoutes = require("./routes/report");

//PORT
const app = express();
const port = process.env.PORT || 3000;

//CORS
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:5174",
    ],
    credentials: true,
  }),
);
app.use(express.json());

//DB connection
const pool = require("./db");
async function checkConnection() {
  try {
    const connection = await pool.getConnection();

    await connection.ping();
    console.log("DB connection successfullyx!");
    connection.release();
  } catch (err) {
    console.error("Failed connection DB:", err);
  }
}

checkConnection();

app.get("/", (req, res) => {
  res.send("Server is running ");
});
// routes
app.use("/api/report", reportRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`The server running on http://localhost:${port}`);
});
