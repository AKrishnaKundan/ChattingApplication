import axios from "axios";
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router';

import { useSnackbar } from 'notistack';
import "./Messages.css";

import rootEndPoint from "../url";

function Messages() {
  const navigate = useNavigate();

  const {enqueueSnackbar} = useSnackbar();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async()=>{
    let receiverId = localStorage.getItem("receiverId");
      try{
        const response = await axios.get(`${rootEndPoint.url}/messages`, {
          "headers":{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        const allreceivers = response.data.persons;
        let chatMessages = [];
        for (let i=0; i<allreceivers.length; i++){
          if (allreceivers[i].receiverId == receiverId){
            chatMessages = allreceivers[i].messages;
            break;
          }
        }
        setMessages(chatMessages);
      }
      catch(err){
        enqueueSnackbar("Login to continue", {variant:"warning"});
        localStorage.clear();
        navigate("../login", { relative: "path" });
      }
  }

  const sendMessage = async()=>{
    try{
      const response = await axios.post(`${rootEndPoint.url}/message`, 
        {
          "text": newMessage,
          "receiverId":localStorage.getItem("receiverId")
        },
        {
        "headers":{
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          'Content-Type':"application/json"
        }}
      )
      setNewMessage("");
    }
    catch(err){
      console.log(err);
      if (err.response && err.response.status == 401){
        localStorage.clear();
        navigate("../login", { relative: "path" });
        enqueueSnackbar("Login to continue", {"variant":"warning"});
      }
      else{
        enqueueSnackbar("Server Error", {"variant":"error"})
      }
    }
  }

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newMessage.length>0) {
      sendMessage();
    }
  };

  useEffect(()=>{
    fetchMessages();

    const pollingInterval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => {
      clearInterval(pollingInterval);
    };

  }, [])

  return (
    <div className="message-container" onKeyDown={handleKeyDown}>
      <div className="receiver-name">
            <img src="./arrow-left.png" className="left-arrow" alt=""
            onClick={()=>navigate("../users", { relative: "path" }) }
            />
            <img 
              src="./user-outline.png" 
              className="user-symbol" 
              alt=""
            />
          <h1>{localStorage.getItem("receiverName")}</h1>
      </div>
      <hr style={{ border: '1px solid #000', margin: '20px 10px' }} />
      
      <div className="message-box">
        {
          messages.map((message, index) =>{

            return (
            <div className="chat-container" key={index}>
              
              <div className="message" >
                <div className={message.type} style={{fontWeight:700}}>
                    <div>{message.text}</div>
                    <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
                </div>
              </div>
            </div>
            );
            
          }) 
          
  
        }

      </div>
      <input 
        type="text" 
        placeholder="Enter Message"
        value={newMessage} 
        onChange={(e)=>setNewMessage(e.target.value)}
      />
      <button className="send-button" onClick={sendMessage} disabled={newMessage.length === 0}>
        <img src="./send.png" alt="send"/>
      </button>
      
    </div>
  )
}

export default Messages;