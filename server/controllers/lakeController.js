app.get("/api/lakes", (req, res) => {
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
