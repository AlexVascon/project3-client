import React, {useState, useEffect} from 'react';
import './friendsList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


const API_URL = process.env.REACT_APP_API_URL;

export default function FriendList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const getFriends = async () => {
            try {
                const users = await axios.get(`${API_URL}/users/friends`, { withCredentials: true })
                setUsers(users.data);
            } catch (err) {
                console.log(err)
            } 
        }
        getFriends();
    }, [])
    return (
        <div className='friends-suggestions'>
        <h1>Your Friends</h1>
            <ul>
                {users ? (users.map(user => {
                   return (
                   <div className='user-suggest'>
            <Link to={`/visit/${user._id}`}>
            <Avatar className='profileImg' alt={user.username} src={user.profilePicture} sx={{ width: 120, height: 120 }}/>
            </Link>
        </div>
                 ) })) : ('...loading')}
            </ul>
        </div>
    )
}
