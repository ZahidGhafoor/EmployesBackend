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

mongoose.connect(mongourl, {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongooDB");
});
mongoose.connection.on("error", (error) => {
  console.log("Error While connecting with mongoDB", error);
});

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

app.post("/updateEmploye", (req, res) => {
  Employe.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/deleteEmploye", (req, res) => {
  Employe.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send("data has been removed");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getallemploye", (req, res) => {
  Employe.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("server running");
});
