const express = require("express");
const app = express();
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("./Emplyee");
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
const Employe = mongoose.model("employee");

const mongourl =
  "mongodb+srv://cnq:W4kG2Dp5HLHuDVwc@cluster1.vef2z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//  "mongodb://localhost/zahidbackend";

mongoose.connect(mongourl, {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongooDB");
});
mongoose.connection.on("error", (error) => {
  console.log("Error While connecting with mongoDB", error);
});

// Post request to Add new Employe

app.post("/newEmploye", (req, res) => {
  const employee = new Employe({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send("Success");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post request for update existing Employe in dataBese

app.post("/updateEmploye", (req, res) => {
  Employe.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      picture: req.body.picture,
      salary: req.body.salary,
      position: req.body.position,
      id: req.body.id,
    },
    { new: true }
  )
    .then((data) => {
      console.log("UPDATED ==== ", data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post request for delete employee from dataBese

app.post("/deleteEmploye", (req, res) => {
  Employe.findOneAndDelete({ _id: req.body.id })
    .then((data) => {
      console.log("The employe deleted = ", data);
      res.send("Employee has been deleted");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get request to get all the existing Employe from dataBese

app.get("/getallemploye", (req, res) => {
  Employe.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/", (req, res) => {
  res.send({ msg: "SERVER RUNNINGsdf" });
});

app.listen(8000, () => {
  console.log("server running");
});
