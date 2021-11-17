import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useRef, useEffect, useState } from 'react'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material/';
import { Card, TextField, Container, FormControl, CardContent, Button, Grid, Box } from '@mui/material'
import NavBar from './NavBar'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Navigate } from 'react-router'
const regForName = RegExp(/^[a-zA-Z]/);

function Calculator() {
    const budgetRef = useRef('')
    const titleRef = useRef('')
    const amountRef = useRef('')
    const [state, setstate] = useState({ budget: 0, expenses: 0, balance: 0,userdata:[],index:0 })
    useEffect(() => {
        renddata()
    }, [])

    const renddata = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        let exp = 0
        user.explist.map(ele => {
            exp = ele.amount + exp
        })
        const bud = user.budget
        setstate({index:0, budget: user.budget, expenses: exp, balance: bud - exp ,userdata:user.explist})
    }

    const addBudget = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const bud = parseInt(budgetRef.current.value);
        if (bud > 0) {
            user.budget = user.budget + bud
                    
            localStorage.setItem('user', JSON.stringify(user))
            budgetRef.current.value = ""
        }
        else {
            alert("Budget Shold be more than Zer0")
        }
        renddata()

    }

    const addexpenses = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const usertitle = titleRef.current.value
        const useramount = parseInt(amountRef.current.value)
        if (usertitle != null && regForName.test(usertitle)) {
            localStorage.setItem('user', JSON.stringify(user))
            if (useramount > 0) {
                const expense = { title: usertitle, amount: useramount }
                user.explist = [...user.explist, expense]
                localStorage.setItem('user', JSON.stringify(user))
                titleRef.current.value = ""
                amountRef.current.value = ""

            }
            else {
                alert("Budget Shold be more than Zer0")
            }
        }
        else {
            alert("Please enter correct title")
        }
        renddata()
    }
    const deletes = (index) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            user.explist.splice(index, 1)
            localStorage.setItem('user', JSON.stringify(user));
        }
        const user1 = JSON.parse(localStorage.getItem('user'))
        const userd = user1.explist
        renddata()
    }

    const update = (ele,index) => {
        titleRef.current.value = ele.title
        amountRef.current.value = ele.amount
        setstate({...state,index:index})
    }
    const updatedata=()=>{
        let user=JSON.parse(localStorage.getItem('user'));
        let temp=user.explist
        temp[state.index].title=titleRef.current.value
        temp[state.index].amount=parseInt(amountRef.current.value)
        user.explist=temp
        localStorage.setItem('user',JSON.stringify(user))

        titleRef.current.value=null
        amountRef.current.value=null

        renddata()
    }
    return (
        <>
            {localStorage.getItem('user') === undefined && <Navigate to="/"></Navigate>}
                <div>
                    <NavBar />
                    <Box sx={{ width: "100%", height:"90vh", pl: '2rem', backgroundColor: '#fffaf1' }}>
                        <Grid container spacing={2}>
                            <Grid item lg={5}>
                                <Card sx={{ width: '55ch', height: '25ch', mx: "auto", mt: '3rem' }}>
                                    <CardContent>
                                        <h1 style={{ "color": 'darkblue', textAlign: 'center' }}>Total Budget</h1>
                                        <FormControl sx={{ width: '50ch', mb: '1rem' }}>
                                            <TextField
                                                inputRef={budgetRef}
                                                type="number"
                                                name="budget"
                                                label="Enter Your Budget" />
                                        </FormControl>
                                        <Button variant="contained" onClick={() => addBudget()}>Submit</Button>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={7}>
                                <Box sx={{ display: 'flex', pl: '4rem', backgroundColor: '#fffaf1' }}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Box>
                                                <h1> Budget </h1>
                                                <LocalAtmIcon style={{ fontSize: "100px" }} />
                                                <h1> {state.budget}</h1>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <h1> Expenses</h1>
                                                <AttachMoneyIcon style={{ fontSize: "100px" }} />
                                                <h1>{state.expenses}</h1>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <h1> Balance </h1>
                                                <AccountBalanceWalletIcon style={{ fontSize: "100px" }} />
                                                <h1> {state.balance} </h1>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item lg={5}>
                                <Card sx={{ width: '55ch', mx: "auto" }}>
                                    <CardContent>
                                        <h1 style={{ "color": 'darkblue', textAlign: 'center' }}>Expenses</h1>
                                        <FormControl sx={{ width: '50ch', mb: '1rem' }}>
                                            <TextField
                                                sx={{ mb: '1rem' }}
                                                inputRef={titleRef}
                                                name="title"
                                                focused
                                                label="Expense Title" />
                                            <TextField
                                                inputRef={amountRef}
                                                name="amount"
                                                type="number"
                                                focused
                                                label="Enter Amount" />
                                        </FormControl>
                                        {state.index==0 ?
                                        <Button variant="contained" onClick={() => addexpenses()}>Add Expenses</Button>
                                        :
                                        <Button variant="contained" onClick={() => updatedata()}>Update Task</Button>
                                        }

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={7}>
                                <TableContainer component={Paper} sx={{ mt: '1rem', width: "800px" }}>
                                    <Table >
                                        <TableHead sx={{ backgroundColor: "black" }}>
                                            <TableRow>
                                                <TableCell align="center" sx={{ color: "white", fontSize: '1.5rem' }}>Index</TableCell>
                                                <TableCell align="center" sx={{ color: "white", fontSize: '1.5rem' }}>Title</TableCell>
                                                <TableCell align="center" sx={{ color: "white", fontSize: '1.5rem' }}>Amount</TableCell>
                                                <TableCell align="center" sx={{ color: "white", fontSize: '1.5rem' }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {state.userdata.length ?
                                               state.userdata.map((ele, index) =>
                                                    <TableRow key={index} >
                                                        <TableCell align="center" sx={{ fontSize: '1rem' }}>{index + 1}</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '1rem' }}>{ele.title}</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '1rem' }}>{ele.amount}</TableCell>
                                                        <TableCell align="center" sx={{ fontSize: '1rem' }}>
                                                            <CheckOutlinedIcon sx={{ fontSize: 38, cursor: "pointer", border: '2px' }} onClick={() => update(ele, index)} color="primary" />
                                                            <CloseOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }} onClick={() => deletes(index)} color="warning" />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                :
                                                <TableRow >
                                                    <TableCell align="center" sx={{ fontSize: '1.5rem' }} colSpan="4">Nothing here</TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Box>

                </div>
        </>

    )
}

export default Calculator