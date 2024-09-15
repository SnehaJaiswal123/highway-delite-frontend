import React, { useState } from 'react'
import axios from 'axios';
import image from '../assets/signin.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import '../style/signup.css'

const Signup = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [errorMsg,setErrorMsg]=useState('')
  const [open,setOpen]=useState(false)
  const navigate=useNavigate();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSigin=async()=>{
    console.log(email,password);
       
        const config={
          headers: {
            'Content-Type': 'application/json'
          }
        }
    
        try{
          const response = await axios.post('https://hihway-delite.onrender.com/api/signin',{
              email,
              password
            },
            config
          ) 
          navigate('/home')      
        }
        catch(e){
          console.log(e.response.data.message);
          setErrorMsg(e.response.data.message)
          setOpen(true)          
        }
  }

  return (
    <div className='main'>
         <div className="container">
            <img src={image} alt="" />
            <div className="signup">
         <Box
            className='box'
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            >
            <div>
              <h1>Let Us Know <span>!</span></h1>
            </div>
            <TextField label="Email" variant="standard" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextField label="Password" variant="standard" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button style={{backgroundColor:"#301934"}} variant="contained" 
            onClick={handleSigin}
            >SignIn</Button>
            <Button style={{backgroundColor:"#301934"}} variant="contained"
            onClick={()=>navigate('/signup')}
            >SignUp</Button>
         </Box>
         </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
          {errorMsg}
          </Alert>
        </Snackbar>
         </div>
    </div>
  )
}

export default Signup
