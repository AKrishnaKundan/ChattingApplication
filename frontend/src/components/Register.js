import axios from "axios";
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import "./Login,Register.css"

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

      localStorage.clear();
      navigate("../login", { relative: "path" });

    }
    catch(err){
      if (err.response){
      enqueueSnackbar(err.response.data.message, { variant:"error" });
      }
      else{
        enqueueSnackbar("Server Error", { variant:"error" })
      }
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
    <>
      <h1 style={{position: "absolute", top:"4vh", left:"4vw" }}>ChatApp</h1>
      <div className="center">
        <h1>Register</h1>
        <form onSubmit = {(e)=>registerUser(e)}>
          <div className="txt_field">
            <input type="text" required="" onChange={(e)=> setUsername(e.target.value)}/>
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input type="text" required="" onChange={(e)=> setEmail(e.target.value)}/>
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input type="password" required="" onChange={(e)=> setPassword(e.target.value)}/>
            <span></span>
            <label>Password</label>
          </div>
          <div className="txt_field">
            <input type="password" required="" onChange={(e)=> setConfirmPassword(e.target.value)}/>
            <span></span>
            <label>Confirm Password</label>
          </div>
          {/*<div className="pass">Forgot Password?</div>*/}
          <input type="submit" value="Register" style={{marginBottom:"20px"}}/>
          <div className="signup_link">
            Already a member ?<a href="/login">Login</a>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register