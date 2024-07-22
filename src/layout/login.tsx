import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Avatar } from "@mui/material";


import { auth } from "../services/firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";
import AlertDialog from './alert';

interface Service {
    email: string;
    password: string;
  }
  
  const initialValues: Service = {
    email: '',
    password: ''
  };

const Login = () => {

  
const [values, setValues] = useState<Service>(initialValues);
const [open, setOpen] = React.useState(false);
const [data, setData] = React.useState('');

const handleClose = async () => {
   setOpen(false);
 };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {

    signInWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    const user = userCredential.user;
    localStorage.setItem("token",JSON.stringify(user))
    window.location.reload();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setData("Email ou senha incorreto!")
    setOpen(true);
  });


   // handleClose();
  };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3,paddingTop:'100px',display:'flex',flexDirection:'row' }}>


<AlertDialog
          open={open}
          data={data}
          onClose={handleClose}
        />

<div style={{paddingLeft:'100px',paddingTop:'100px'}}>

<Avatar src="./logo.png" alt="uploaded image" variant="square" sx={{ width: 200, height: 200 }}/>
</div>

<div style={{paddingLeft:'200px',paddingTop:'100px'}}>
<TextField
              required
              fullWidth
              margin="normal"
              label="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />

<TextField
              required
              fullWidth
              margin="normal"
              type="password"
              label="senha"
              name="password"
              value={values.password}
              onChange={handleChange}
            />

    <Button onClick={handleSubmit} variant="contained" color="primary">Entrar</Button>

    </div>
        </Box>
    )
}

export default Login;