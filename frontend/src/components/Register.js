import axios from "axios";
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import "./Register.css"

import rootEndPoint from '../url';

function Register() {

  const { enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async(e)=>{
    e.preventDefault();
    if (!validateInput()) return;
    try{
      const response = await axios.post(`${rootEndPoint.url}/auth/register`, {
        email: email,
        password: password,
        username: username
      })
      enqueueSnackbar("Registered successfully",{variant:"success"});

      navigate("../login", { relative: "path" });

    }
    catch(err){
      enqueueSnackbar(err.response.data.message, { variant:"error" });
    }
  }

  const validateInput = (data) => {
  
    if (username === ""){
     enqueueSnackbar("Username is a required field",{variant:"warning"});
     return false;
    }
    if (username.length < 6){
     enqueueSnackbar("Username must be at least 6 characters",{variant:"warning"});
     return false;
    }
    if (password === ""){
     enqueueSnackbar("Password is a required field",{variant:"warning"});
     return false;
    }
    if (password.length < 6){
     enqueueSnackbar("Password must be at least 6 characters",{variant:"warning"});
     return false;
    }
 
    if (confirmPassword !== password){
     enqueueSnackbar("Passwords do not match",{variant:"warning"});
     return false;
    }
    return true;
   };

  return (
    <div className= "container">
      <form className="form">
        <h1 className='heading'>Register</h1>

        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input 
          type="text" 
          id="email" 
          name="email" 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input 
          type="text"   
          id="password" 
          name="password" 
          value={password}
          onChange = {(e)=>setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          type="text"   
          id="confirmPassword" 
          name="confirmPassword" 
          value={confirmPassword}
          onChange = {(e)=>setConfirmPassword(e.target.value)}
        />
        <button onClick={registerUser}>Register
      </button>
      </form>
    </div>
  )
}

export default Register