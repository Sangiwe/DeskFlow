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

module.exports = {
  createTicket,
};