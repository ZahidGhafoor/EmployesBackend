const mongoose = require("mongoose");

const EmployeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  picture: String,
  salary: String,
  position: String,
  id: String,
});

mongoose.model("employee", EmployeSchema);
