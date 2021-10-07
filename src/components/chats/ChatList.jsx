import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chat from './Chat';
const API_URL = process.env.REACT_APP_API_URL;

export default function ChatList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/users/friends`, { withCredentials: true })
        .then(response => {
            setUsers(response.data);
        })
        .catch(err => console.log('could not retrieve list of users. Error:', err));
    }, [])
    return (
       
            <div className='friends-suggestions'>
                 <h1>Chat List</h1>
            <ul>
                {users.map(user => {
                   return <Chat key={user._id} user={user}/>
                })}
            </ul>
             </div>
           
    )
}