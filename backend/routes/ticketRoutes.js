const express = require("express");

const {
  createTicket,
  getTickets,
} = require("../controllers/ticketController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Employee"),
  createTicket
);

router.get("/", protect, getTickets);

module.exports = router;