
import axios from "axios";
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import "./Login,Register.css"

import rootEndPoint from '../url';

function Login() {

  const { enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = () => {

    if (email === "") {
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    }  
    else if (password === "") {
      enqueueSnackbar("Password is a required field", {variant: "warning"}); 
                                                                                          
      return false;
    }  
    return true;
  };

  const loginUser = async(e)=>{
    e.preventDefault();
    if (!validateInput()) return;
    try{
      const response = await axios.post(`${rootEndPoint.url}/auth/login`, {
        email: email,
        password: password
      })
      enqueueSnackbar("Logged in successfully",{ variant:"success"});

      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("token", response.data.token.token);
      localStorage.setItem("expires", response.data.token.expires);

      navigate("../users", { relative: "path" });

    }
    catch(err){
      console.log(err)
      if (err.response){
        enqueueSnackbar(err.response.data.message, {variant:"error"});
      }else{
        enqueueSnackbar("Server Error", {variant:"error"});
      }
    }
  }

  return (
    <>
      <h1 style={{position: "absolute", top:"4vh", left:"4vw" }}>ChatApp</h1>
      <div className="center">
        <h1>Login</h1>
        <form onSubmit = {(e)=>loginUser(e)}>
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
          {/*<div className="pass">Forgot Password?</div>*/}
          <input type="submit" value="Login"/>
          <div className="signup_link">
            Not a member? <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login