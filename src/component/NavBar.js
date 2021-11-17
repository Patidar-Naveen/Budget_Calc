import React, { Component } from 'react';
import {Box,AppBar, Toolbar, Typography, Button } from "@mui/material";
import {Link} from 'react-router-dom'
import axios from 'axios';
class NavBar extends Component {
    user = JSON.parse(localStorage.getItem('user'))
    logout(){
        let data=JSON.parse(localStorage.getItem('user'))
        axios.put(`http://localhost:3001/user/${data.id}`,data)
                

        localStorage.removeItem('user');
    }
    
    render() {
        return (
                <Box sx={{ flexGrow: 1,pb:'1rem' }}>
                    <AppBar position="static">
                <Toolbar>       
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Hey {this.user.fName } {this.user.lName}
                </Typography>

                <Box sx={{display: 'flex', justifyContent: 'center', p: 1, flexGrow: 5 }}>
                   {/* <Link to="/home" style={{textDecoration:"none",color:"white"}}> <Box sx={{ px: 1, fontSize:20}}>Home</Box> </Link> */}
                   <Link to="/calculator" style={{textDecoration:"none",color:"white"}}> <Box sx={{fontSize:20}}>Calculator</Box> </Link>
                   {/* <Link to="/table" style={{textDecoration:"none",color:"white"}}> <Box sx={{ pl:3,pr: 20,fontSize:20}}>Expenses</Box> </Link> */}
                </Box>


                <Link to="/" style={{textDecoration:"none"}}><Button onClick={()=>this.logout()} variant="contained" color="error">Logout</Button></Link>
                </Toolbar>
                </AppBar>
                </Box>
        );
    }
}

export default NavBar;