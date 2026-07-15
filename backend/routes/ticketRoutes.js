const express = require("express");

const {
  createTicket,
  getTickets,
  updateTicketStatus,
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

router.put(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  updateTicketStatus
);

module.exports = router;