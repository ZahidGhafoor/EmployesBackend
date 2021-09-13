const express = require("express");
const app = express();
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
require("./Emplyee");

app.use(bodyParser.json());
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

app.get("/", (req, res) => {
  res.send("welcome to Backend");
});

app.post("/send", (req, res) => {
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

app.post("/delete", (req, res) => {
  Employe.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send("data has been removed");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(3000, () => {
  console.log("server running");
});
