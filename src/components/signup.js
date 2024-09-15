import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/signup.png";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../style/signup.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Signup = () => {
  const names = [];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [contact, setContact] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSigup = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "https://hihway-delite.onrender.com/api/signup",
        {
          email,
          password,
          fname,
          lname,
          contactMode: contact,
        },
        config
      );
      const data = {
        email,
        password,
        fname,
        lname,
        contactMode: contact,
      };

      navigate(`/otp`, { state: data });
    } catch (e) {
      console.log(e.response.data.message);
      setErrorMsg(e.response.data.message);
      setOpen(true);
    }
  };
  return (
    <div className="main">
      <div className="container">
        <img src={image} alt="" />
        <div className="signup">
          <Box
            className="box"
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <h1>Let Us Know <span>!</span></h1>
              <a href="" onClick={()=>navigate('/')}>Sign<span>In</span></a>
            </div>
            <TextField
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              label="First Name"
              variant="standard"
            />
            <TextField
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              label="Last Name"
              variant="standard"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Set Password"
              variant="standard"
            />
            <TextField
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              label="Retype Password"
              variant="standard"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="standard"
            />
            <TextField
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              label="Contact Mode"
              variant="standard"
            />
            <Button
              style={{ backgroundColor: "#301934" }}
              variant="contained"
              onClick={handleSigup}
            >
              SignUp
            </Button>
          </Box>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Signup;
