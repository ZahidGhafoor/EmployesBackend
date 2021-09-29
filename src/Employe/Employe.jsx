import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import "./Employe.scss";

import CircularProgress from "@material-ui/core/CircularProgress";









const Style = makeStyles({
  btn: {
    margin: "0.5rem 0",
    width: "100%",
    background: "red",
    height: "3rem",
    color: "#fff",
    position: "relative",

    float: "right",
    "&:hover": {
      color: "red",
      transition: ".5s ease-in-out",
    },
  },
});


const Employe = () => {

  const classes = Style();
  const [loading, setLoading] = useState(false)

  const [FullName, useFullName] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Salary: "",
    Position: "",
    ID: ""


  });

  const InputEvent = (event) => {

    const { value, name } = event.target;

    useFullName((pValue) => {
      return {
        ...pValue,
        [name]: value,
      }
    })


  };

  const CheckedInputEvent = (event) => {

    const { name, checked } = event.target;

    useFullName((pValue) => {
      return {
        ...pValue,
        [name]: checked,
      }
    })

  }

  const AddEmploye = async () => {

    setLoading(true)

    const resolved = {
      data: null,
      error: null,
    };
    try {
      resolved.data = await axios({
        url: "http://localhost:8000/newEmploye",
        method: "POST",

        data: {
          "name": FullName.Name,
          "email": FullName.Email,
          "phone": FullName.Phone,
          "picture": "url",
          "salary": FullName.Salary,
          "position": FullName.Position,
          "id": FullName.ID
        },
      });
      setLoading(false)

      if (resolved.data == null) {
        alert("something went wrong")
      }
      else { alert(`${FullName.Name} has been added successfully in employee list`) }

    } catch (err) {
      setLoading(false)
      if (err.message) {
        resolved.error = err.message;
      } else {
        resolved.error = "Something went wrong in spred default fee";
      }

    }

    return resolved;
  }



  const UpdateEmploye = async () => {

    const resolved = {
      data: null,
      error: null,
    };
    try {
      setLoading(true)
      resolved.data = await axios({
        url: "http://localhost:8000/updateEmploye",
        method: "POST",



        data: {
          "name": FullName.Name,
          "email": FullName.Email,
          "phone": FullName.Phone,
          "picture": "url",
          "salary": FullName.Salary,
          "position": FullName.Position,
          "id": FullName.ID
        },
      });
      setLoading(false)
      alert("Current Employee Updated successfully")
    } catch (err) {
      resolved.error = "Something went wrong in spred default fee"
      alert("Something went wrong")
    }
    return resolved;
  }

  return (
    <>
      <form>

        <div className="Checkout_full_div">
          <div className="Checkout_main_div">
            <div className="header_div">
              <p className="header_ptag">SHOPPING INFORMATION</p>
              <br />
              <p className="header_ptag2">Where your order will be delivered</p>
            </div>
            <div className="about">
              <p className="about_ptag">Shipping Details</p>\
              <div className="about_input">
                <TextField
                  type="text"
                  name="Name"
                  label="Name"
                  variant="outlined"
                  onChange={InputEvent}
                  value={FullName.Name}
                  style={{ width: "100%", marginRight: "15px", marginBottom: "10px" }}
                />
                <TextField
                  type="email"
                  name="Email"
                  label="Email"
                  variant="outlined"
                  onChange={InputEvent}
                  value={FullName.email}
                  style={{ width: "100%", marginRight: "15px", marginBottom: "10px" }}
                />
                <TextField
                  type="number"
                  name="Phone"
                  label="Phone"
                  variant="outlined"
                  onChange={InputEvent}
                  value={FullName.Phone}
                  style={{ width: "100%", marginBottom: "10px" }}
                />

                <TextField
                  type="text"
                  name="Salary"
                  label="Salary"
                  variant="outlined"
                  onChange={InputEvent}
                  value={FullName.COUNTRY}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <TextField
                  type="text"
                  name="Position"
                  label="Position"
                  variant="outlined"
                  onChange={InputEvent}
                  value={FullName.STATE}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <TextField
                  type="text"
                  name="ID"
                  label="ID"
                  variant="outlined"
                  onChange={InputEvent}
                  value={FullName.ID}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
            </div>
            <div className="button" >
              <Button disabled={FullName.Name == "" || FullName.Email == "" || FullName.Phone == "" || FullName.Salary == "" || FullName.Position == "" || FullName.ID == "" ? true : false} id='materialbtn4' variant="contained" onClick={AddEmploye} className={classes.btn}>
                {loading == true ?
                  <CircularProgress />
                  : "Add New Employ"}
              </Button>
              <Button id='materialbtn4' variant="contained" onClick={UpdateEmploye} className={classes.btn}>
                UPDATE EXISTING EMPLOYEE
              </Button>
            </div>

          </div>
        </div>
      </form>
    </>
  )
}

export default Employe
