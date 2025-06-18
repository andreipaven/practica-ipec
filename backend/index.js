require("dotenv").config();

const express = require("express");

// const adminRoutes = require("./routes/admin");

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
    console.log("Conexiunea la MySQL este OK!");
    connection.release();
  } catch (err) {
    console.error("Eroare la conexiunea MySQL:", err);
  }
}

checkConnection();

app.get("/", (req, res) => {
  res.send("Server is running ");
});
// routes
// app.use("/api/admin", adminRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`The server running on http://localhost:${port}`);
});
