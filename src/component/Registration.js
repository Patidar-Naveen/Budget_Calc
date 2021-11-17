import React, { useState, useRef } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { Card, TextField, FormControl, CardContent, Button, Alert, FormControlLabel, Checkbox, Grid, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForUserName = RegExp(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

export default function Registration() {
  const [state, setState] = useState();
  const [data, setdata] = useState('');
  const [flag1, setflag1] = useState(0);
  const [errors, seterror] = useState(' ');
  const [showPassword, setshowPassword] = useState(0)
  const [showcPassword, setshowcPassword] = useState(0)


  const fname = useRef(null)
  const lname = useRef(null)
  const username = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const cpassword = useRef(null)

  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        let error = regForName.test(value) ? " " : "First Name should be character";
        seterror(error);
        break;
      case "lname":
        let error2 = regForName.test(value)
          ? " "
          : "Last Name should be character";
        seterror(error2);

        break;
      case "username":
        let error3 = regForUserName.test(value) ? " " : "Invalid Username";
        seterror(error3);

        break;
      case "email":
        let error4 = regForEmail.test(value) ? " " : "Enter Correct Email-Id";
        seterror(error4);

        break;
      case "password":
        let error5 = regForpassword.test(value)
          ? " "
          : "Password Should Contain atleast 8 character with Upper, lower and special character";
        seterror(error5);
        setdata(value)
        break;
      case "cpassword":
        let error6 = value === data ? "" : "Password does not match";
        seterror(error6);
        break;
    }
  };
  const validate = () => {
    if (errors.length <= 1) {
      const encyPass = CryptoJS.AES.encrypt(JSON.stringify(password.current.value), 'secret key 123').toString();
      setflag1(1);
      let formData = {
        fName: fname.current.value,
        lName: lname.current.value,
        uName: username.current.value,
        Email: email.current.value,
        Pass: encyPass,
        budget:0,
        explist: []
      };
      console.log(formData)
      setState(formData)
      axios.post(`http://localhost:3001/user`, formData)
      alert("form Validate");

    }
    else {
      seterror("Enter all details");
    }
  };
  return (
    <div>
      {!flag1 ?
        <Box sx={{ width: "100%", height: "100vh", backgroundImage: `radial-gradient( circle farthest-corner at 10% 20% ,#00d4ff 0%,#094679,#020024)`, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Card sx={{ width: "71ch", mb: "5rem", mt: "7rem" }}>
            <CardContent>
              <h1 style={{ fontFamily:"Yuji Syuku", textAlign: "center" }}>
                User Registration 
              </h1>

              {errors.length > 1 && <Alert severity="warning">{errors}</Alert>}
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <FormControl sx={{ my: 1 }} fullWidth >
                    <TextField
                      onChange={handler}
                      name="fname"
                      inputRef={fname}
                      label="First Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6}>
                  <FormControl sx={{ my: 1 }} fullWidth >
                    <TextField
                      onChange={handler}
                      name="lname"
                      inputRef={lname}
                      label="Last Name"
                    />
                  </FormControl>
                </Grid>


                <Grid item lg={6}>
                  <FormControl sx={{ mb: 1 }} fullWidth>
                    <TextField
                      onChange={handler}
                      name="username"
                      inputRef={username}
                      label="Username"
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6}>
                  <FormControl sx={{ mb: 1 }} fullWidth>
                    <TextField
                      onChange={handler}
                      name="email"
                      inputRef={email}
                      label="Email"
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6}>
                  <FormControl variant="outlined" fullWidth sx={{ mb: 1 }}>
                    <InputLabel  >Password</InputLabel>
                    <OutlinedInput
                      inputRef={password}
                      type={showPassword ? 'text' : 'password'}
                      onChange={handler}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            color="info"
                            onClick={() => setshowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password" />
                  </FormControl>
                </Grid>
                <Grid item lg={6}>
                  <FormControl variant="outlined" fullWidth sx={{ mb: 1 }}>
                    <InputLabel  >Conform Password</InputLabel>
                    <OutlinedInput
                      inputRef={cpassword}
                      type={showcPassword ? 'text' : 'password'}
                      onChange={handler}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            color="info"
                            onClick={() => setshowcPassword(!showcPassword)}
                            edge="end"
                          >
                            {showcPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Conform Password" />
                  </FormControl>
                </Grid>
                <Grid item lg={12}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      onClick={validate}
                      sx={{ px: "8vh", py: "1.5vh" }}
                      variant="contained">
                      Register
                    </Button><br />
                    <FormControl className="mt-2">
                      <span> Already Registered? <Link className="mt-5 pt-4" to="/">Click here to Login</Link></span>
                    </FormControl></Box></Grid>
              </Grid>

            </CardContent>
          </Card>
          <Box sx={{ml:"-4rem"}}>
            <h4 style={{ fontSize: '1.6em', marginBottom: '-120px', color: "#f37e0f", my: 0}}>New ...?</h4>
            <h1 style={{ fontSize: '8em',color: 'white'}}>Register</h1>
            <h6 style={{ fontSize: '1.6em', textAlign: 'right',color: 'white', marginTop: "-100px" }}>Here</h6>
          </Box>
        </Box>
        :
        <Navigate to="/"></Navigate>}
    </div>
  );
}
