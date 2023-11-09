import axios from 'axios'

import React,{useEffect, useSyncExternalStore} from 'react'
import rootEndPoint from '../url' 
import { useSnackbar } from 'notistack';

function Users() {

    const {enqueueSnackbar} = useSnackbar();
    
    const fetchUsers = async()=>{
        try{
            const response = await axios.get(`${rootEndPoint.url}/allusers`);
            console.log(response);
        }
        catch(err){
            enqueueSnackbar("Server Error")
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    return (
        <div class="user-container">

        </div>
    )
}

export default Users