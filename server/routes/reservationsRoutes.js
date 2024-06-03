const express = require("express");
const router = express.Router();
const reservation = require("../controllers/reservationController");

// Route to create a reservation
router.post("/create", reservation.create);

// Route to retrieve reservations for a user
router.get("/:userId", reservation.getReservations);

module.exports = router;
