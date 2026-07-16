const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Ticket title is required"],
      trim: true,
      maxlength: [100, "Ticket title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Ticket description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    priority: {
      type: String,
      required: [true, "Ticket priority is required"],
      enum: {
        values: ["Low", "Medium", "High"],
        message: "{VALUE} is not a valid priority",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["Open", "In Progress", "Resolved"],
        message: "{VALUE} is not a valid status",
      },
      default: "Open",
    },

    createdBy: {
      type: String,
      required: [true, "Ticket creator is required"],
    },

    createdByName: {
      type: String,
      required: [true, "Ticket creator name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;