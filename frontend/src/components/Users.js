import axios from 'axios'

import React,{useState, useEffect} from 'react'
import rootEndPoint from '../url' 
import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router';

import "./Users.css"

function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const {enqueueSnackbar} = useSnackbar();
    
    const fetchUsers = async()=>{
        try{
            const token = localStorage.getItem("token");
            
            const response = await axios.get(`${rootEndPoint.url}/allusers`, {
                "headers":{
                    "Authorization": `Bearer ${token}`
                }
            });
            setUsers(response.data);
        }
        catch(err){
            if (err.response && err.response.status === 401){
                localStorage.clear();
                navigate("../login", { relative: "path" });
                enqueueSnackbar("Login to continue", {"variant":"warning"});
            }
            else{
                enqueueSnackbar("Server Error", {"variant":"error"});
            }
        }
    }

    const openChat = (receiverId, receiverName)=>{
        localStorage.setItem("receiverId", receiverId)
        localStorage.setItem("receiverName", receiverName)

        navigate("../messages", { relative: "path"});
    }

    const logoutUser = ()=>{
        localStorage.clear();
        navigate("../login", { relative: "path"});
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    return (
        <div className="user-container">
            <h1 className="chatapp">ChatApp</h1>
            <button 
                className="logout"
                onClick={logoutUser}
            >
                Logout
            </button>
            <hr style={{ border: '1px solid #000', margin: '20px 10px' }} />
            <div className="allusers">
            {
                (users).map((user)=>(
                    (user._id !== localStorage.getItem("userId")) && 
                    <div key={user._id} className="userbox" onClick={()=>{
                        openChat(user._id, user.username);
                    }}>
                        <div className='img-box'>
                            <img src="./user-outline.png" alt=""/>
                        </div>
                        <div className="user-name">{user.username}</div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Users;