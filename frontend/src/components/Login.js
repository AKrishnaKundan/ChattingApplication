
import axios from "axios";
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import "./Login.css"

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
      enqueueSnackbar(err.response.data.message, {variant:"error"});
    }
  }

  return (
    <div className= "container">
      <form className="form">
        <h1 className='heading'>Login</h1>

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
        <button onClick={loginUser}>Login</button>
      </form>
    </div>
  )
}

export default Login