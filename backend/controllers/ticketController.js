const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        success: false,
        message: "Title, description and priority are required",
      });
    }

    const allowedPriorities = ["Low", "Medium", "High"];

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be Low, Medium or High",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdBy: req.user.id,
      createdByName: req.user.name,
    });

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error(`Create ticket error: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the ticket",
    });
  }
};

const getTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.role === "Admin") {
      tickets = await Ticket.find().sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({
        createdBy: req.user.id,
      }).sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error(`Get tickets error: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving tickets",
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
};