require("dotenv").config();

const express = require("express");

const counterRoutes = require("./routes/counter");

//PORT
const app = express();
const port = process.env.PORT || 3000;

//CORS
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
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
    console.log("DB connection successfully!");
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
app.use("/api/counter", counterRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`The server running on http://localhost:${port}`);
});
