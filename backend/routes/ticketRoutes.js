const express = require("express");

const {
  createTicket,
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

module.exports = router;