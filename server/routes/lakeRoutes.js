// lakeRoutes.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
router.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "arbes",
  password: "arbes123",
  database: "LakeSite",
});

// Route to fetch lakes
router.get("/getAll", (req, res) => {
  const query = "SELECT * FROM lakes";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching lakes:", err);
      res.status(500).json({ error: "Failed to fetch lakes" });
      return;
    }
    res.json(results);
  });
});

// Route to insert a lake
router.post("/lakes", (req, res) => {
  const { name, description, location, image_url } = req.body;
  if (!name || !location || !image_url) {
    return res
      .status(400)
      .json({ error: "Name, location, and image URL are required" });
  }

  const query =
    "INSERT INTO lakes (name, description, location, image_url) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [name, description, location, image_url],
    (err, results) => {
      if (err) {
        console.error("Error inserting lake:", err);
        res.status(500).json({ error: "Failed to insert lake" });
        return;
      }
      console.log("Inserted lake:", results);
      res.status(201).json({ message: "Lake inserted successfully" });
    }
  );
});

// Route to update a lake
router.put("/lakes/:id", (req, res) => {
  const lakeId = req.params.id;
  const { name, description, location, image_url } = req.body;

  if (!name || !location || !image_url) {
    return res
      .status(400)
      .json({ error: "Name, location, and image URL are required" });
  }

  const query =
    "UPDATE lakes SET name = ?, description = ?, location = ?, image_url = ? WHERE id = ?";

  connection.query(
    query,
    [name, description, location, image_url, lakeId],
    (err, results) => {
      if (err) {
        console.error("Error updating lake:", err);
        res.status(500).json({ error: "Failed to update lake" });
        return;
      }
      console.log("Updated lake:", results);

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Lake not found" });
      }

      res.status(200).json({ message: "Lake updated successfully" });
    }
  );
});

router.get("/public-api-lakes", (req, res) => {
  const query = "SELECT image_url FROM lakes GROUP BY image_url";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching lakes:", err);
      res.status(500).json({ error: "Failed to fetch lakes" });
      return err;
    }
    // results.map((el, index) => {
    //   console.log("el-----", el);
    //   result.push(el.image_url);
    // });
    res.json(results);
  });
});

module.exports = router;
