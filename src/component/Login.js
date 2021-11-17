import React, { useState, useEffect, useRef } from 'react'
import { Card, TextField, FormControl, CardContent, Button, Alert, InputAdornment, IconButton, InputLabel, OutlinedInput } from '@mui/material'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box } from '@mui/system';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import SocialButton from './SocialButton'

export default function Login() {
    const [data, setData] = useState([]);
    const [flag, setflag] = useState(0);
    const [showPassword, setshowPassword] = useState(0)
    const [error, seterror] = useState('')
    const [captcha, setcaptcha] = useState(0)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    useEffect(() => {
        axios.get('http://localhost:3001/user')
            .then(res => {
                setData(res.data)
            })
    }, [])

    const checkdata = () => {
        console.log(data)
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        data.forEach(ele => {
            if(ele.Pass !== "socialLogin"){
            const bytes = CryptoJS.AES.decrypt(ele.Pass, 'secret key 123');
            const decryptpass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if (email === ele.Email && password === decryptpass) {
                console.log(decryptpass)
                if (captcha) {
                    setflag(1);
                    localStorage.setItem('user', JSON.stringify(ele));
                    console.log("successsss")
                }
                else {
                    alert("Please Verify Captcha")
                }
            }
        }
        })
        if (!flag) {
            seterror("Email or Password does not match")
        }
    }
    const verify = () => {
        setcaptcha(1);
    }

    const handleSocialLogin = (user) => {
        console.log(user);
        let userlogin = data.find(x => x.Email === user._profile.email)
        let userIndex = data.indexOf(userlogin)
        console.log(userlogin)
        console.log(userIndex)

        if (userIndex + 1) {
            localStorage.setItem('user', JSON.stringify(data[userIndex]));
            setflag(1);
        }
        else {
            let formData = {
                fName: user._profile.firstName,
                lName: user._profile.lastName,
                uName: user._profile.id,
                Email: user._profile.email,
                Pass: 'socialLogin',
                budget: 0,
                explist: []

            };
            axios.post(`http://localhost:3001/user`, formData)
            localStorage.setItem('user', JSON.stringify(formData));
            setflag(1);
        }
        // data.forEach(ele=>{

        //     if(user._profile.email===ele.Email && 'socialLogin'===ele.Pass){
        //         localStorage.setItem('user',JSON.stringify(ele));
        //         console.log("successsss")      
        //         setflag(1);          
        //     }

        // })
        // if(localStorage.getItem('user')!=undefined){
        //     console.log("new User")
        //     let formData = {
        //         fName: user._profile.firstName,
        //         lName: user._profile.lastName,
        //         uName: user._profile.id,
        //         Email: user._profile.email,
        //         Pass: 'socialLogin',
        //         budget:0,
        //         expenses:[]
        //       };
        //       axios.post(`http://localhost:3001/user`,formData)
        //     localStorage.setItem('user',JSON.stringify(formData));
        //       setflag(1);
        // }      
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };


    return (
        <Box>
            {!flag ?
                <Box sx={{ width: "100%", height: "100vh", backgroundImage: `radial-gradient( circle farthest-corner at 10% 20% ,#00d4ff 0%,#094679,#020024)`, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Box >
                        <h4 style={{ fontSize: '1.6em', marginBottom: '-120px', color: "#f37e0f", my: 0 }}>Hey User</h4>
                        <h1 style={{ fontSize: '8em', color: 'white' }}>Welcome</h1>
                        <h6 style={{ fontSize: '1.6em', textAlign: 'right', color: 'white', marginTop: "-100px" }}>Back</h6>
                    </Box>
                    <Card sx={{ width: '45ch', px: "2vh" }}>
                        <CardContent>
                            <h1 style={{ textAlign: 'center', fontFamily: "'Playball',cursive", color: "#f37e0f", fontSize: '2em' }}>User Login</h1>
                            {error.length > 1 && <Alert severity="warning">{error}</Alert>}

                            <FormControl fullWidth >
                                <TextField
                                    inputRef={emailRef}
                                    label="Email"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <AccountCircle color="info" />
                                            </InputAdornment>
                                        )
                                    }}
                                /></FormControl>
                            <FormControl variant="outlined" fullWidth sx={{ my: 3 }}
                            >
                                <InputLabel  >Password</InputLabel>
                                <OutlinedInput
                                    inputRef={passwordRef}
                                    type={showPassword ? 'text' : 'password'}
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
                                    label="Password"
                                />

                            </FormControl>

                            <ReCAPTCHA
                                sitekey="6LdfthwdAAAAAMiSOmrQnUUQ_QCkd8yTnp5l9wGz"
                                onChange={verify}
                            />
                            <Box sx={{ textAlign: 'center' }} >
                                <Button sx={{ mt: "2ch", px: '4ch', mb: '-2ch' }} variant="contained" onClick={checkdata}>Login</Button></Box><br />
                            <SocialButton
                                style={{ background: "lightblue", fontSize: 25,margin:'10px ',marginLeft:"30px"}}
                                provider="facebook"
                                appId="2681549665473780"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                className="mb-3">
                                <FacebookIcon style={{ color: "blue", fontSize: 25 }} />
                                Facabook
                            </SocialButton>

                            <SocialButton
                                style={{ fontSize: 25, color: "red" }}
                                provider="google"
                                appId="619498450685-64ejiqbv14i11vbtq8nuee022d9jf9kv.apps.googleusercontent.com"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                            ><GoogleIcon style={{ color: "red", fontSize: 25 }} />
                                Google
                            </SocialButton>
                            <br />
                            <span>Not Registered? <Link to="/registration">Click here to Register</Link></span>

                        </CardContent>
                    </Card>

                </Box>
                :
                <Navigate to="/calculator"></Navigate>}
        </Box>
    )
}
