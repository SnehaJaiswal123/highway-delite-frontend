import axios from 'axios';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useLocation,useNavigate } from 'react-router-dom';

const OTPPage = () => {
  const [errorMsg,setErrorMsg]=useState('')
  const [open,setOpen]=useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);


  const location = useLocation();
  const data = location.state;  

  const navigate=useNavigate()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Ensure input is numeric

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to the next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    const otpString = otp.join(''); // Convert array to a string
    data["otp"]=otpString
        
    try{
        const config={
        headers: {
            'Content-Type': 'application/json'
        }
        } 
       await axios.post("https://hihway-delite.onrender.com/api/verify",data,config)
       navigate('/home')
       
    }
    catch(e){
          console.log(e.response.data.message);
          setErrorMsg(e.response.data.message)
          setOpen(true)         
    }
    
  };

  // Check if all OTP fields are filled
  const isOtpFilled = otp.every((value) => value !== '');

  return (
    <div style={styles.container}>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.otpContainer}>
          {otp.map((data, index) => (
            <input
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              style={styles.otpInput}
            />
          ))}
        </div>
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            backgroundColor: isOtpFilled ? '#007bff' : '#d3d3d3',
            cursor: isOtpFilled ? 'pointer' : 'not-allowed',
          }}
          disabled={!isOtpFilled}
        >
          Verify OTP
        </button>
      </form>
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
  );
};

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  otpInput: {
    width: '40px',
    height: '40px',
    margin: '0 5px',
    textAlign: 'center',
    fontSize: '20px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
  },
};

export default OTPPage;
