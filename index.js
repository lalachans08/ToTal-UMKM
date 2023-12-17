const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "34.128.113.176",
  user: "root",
  password: "Total-UMKM",
  database: "capstone_project",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Routes
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(201).json({ message: "User registered successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    db.query(
      "SELECT * FROM user WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else if (results.length > 0) {
          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            const token = jwt.sign({ username: user.username }, "secret-key");
            res.json({ token });
          } else {
            res.status(401).json({ message: "Authentication failed" });
          }
        } else {
          res.status(401).json({ message: "Authentication failed" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
