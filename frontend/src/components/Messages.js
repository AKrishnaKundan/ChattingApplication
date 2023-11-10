import axios from "axios";
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router';

import { useSnackbar } from 'notistack';


import "./Messages.css"
import rootEndPoint from '../url';

function Messages() {
  const navigate = useNavigate();

  const {enqueueSnackbar} = useSnackbar();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async()=>{
    let receiverId = localStorage.getItem("receiver");
      try{
        const response = await axios.get(`${rootEndPoint.url}/messages`, {
          "headers":{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        const allreceivers = response.data.persons;
        let messages = [];
        for (let i=0; i<allreceivers.length; i++){
          if (allreceivers[i].receiverId == receiverId){
            messages = allreceivers[i].messages;
          }
        }
        setMessages(messages);

      }
      catch(err){
        
      }
  }

  const sendMessage = async()=>{
    try{

      const response = await axios.post(`${rootEndPoint.url}/message`, 
        {
          "text": newMessage,
          "receiverId": localStorage.getItem("receiver")
        },
        {
        "headers":{
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          'Content-Type':"application/json"
        }}
      )
      
      const updatedMessages = [...messages, response.data.message];
      setMessages(updatedMessages);
    }
    catch(err){
      if (err.response.status == 401){
        navigate("../login", { relative: "path" });
        enqueueSnackbar("Login to continue", {"variant":"warning"});
      }
      else{
        enqueueSnackbar("Server Error", {"variant":"error"})
      }
    }
  }

  useEffect(()=>{
    fetchMessages();
  }, [])

  return (
    <div className="message-container">
      <h1 className="chatapp">ChatApp</h1>
      <hr style={{ border: '1px solid #000', margin: '20px 10px' }} />
      <div className="message-box">
        {
          messages.map((message, index) => (
            <div className="chat-container">
              <div className="message">
                <div className={message.type}>{message.text}</div>
              </div>
            </div>
          ))          
        }

      </div>
      <input type="text" onChange={(e)=>setNewMessage(e.target.value)}/>
      <button className="send-button"onClick={sendMessage}>
        <img src="./send.png" alt="send"/>
      </button>
    </div>
  )
}

export default Messages