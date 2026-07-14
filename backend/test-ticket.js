const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Ticket = require("./models/Ticket");

dotenv.config();

const testTicketModel = async () => {
  try {
    await connectDB();

    const ticket = await Ticket.create({
      title: "Test laptop issue",
      description: "This is a temporary ticket used to test the model.",
      priority: "Medium",
      createdBy: "employee-001",
      createdByName: "DeskFlow Employee",
    });

    console.log("Ticket created successfully:");
    console.log(ticket);

    await Ticket.findByIdAndDelete(ticket._id);
    console.log("Temporary test ticket deleted");

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Ticket model test failed:");
    console.error(error.message);
    process.exit(1);
  }
};

testTicketModel();