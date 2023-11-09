import axios from "axios";
import React,{useEffect} from 'react'

import "./Messages.css"
import rootEndPoint from '../url';

function Messages() {
  
  const fetchMessages = async()=>{
      let _id = localStorage.getItem("_id");
      try{
        const response = await axios.get(`${rootEndPoint.url}/messages`);
        console.log(response);
      }
      catch(err){
        
      }
  }

  useEffect(()=>{
    fetchMessages();
  }, [])

  return (
    <div className="container">

    </div>
  )
}

export default Messages