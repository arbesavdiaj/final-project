const database = require("../config/database");

const reservation = {
  create: async (req, res) => {
    try {
      const { user_id, lake_id, reservation_date } = req.body;
      const [result] = await database.query(
        "INSERT INTO reservations (user_id, lake_id, reservation_date) VALUES (?, ?, ?)",
        [user_id, lake_id, reservation_date]
      );
      res.json(result);
    } catch (error) {}
  },

  getReservations: async (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM reservations WHERE user_id = ?";

    try {
      const [results] = await database.query(sql, [userId]);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error retrieving reservations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = reservation;
