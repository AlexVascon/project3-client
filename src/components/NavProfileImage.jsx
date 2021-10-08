import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default function NavProfileImage(props) {

    const [user, setUser] = useState(props.user);
    useEffect(() => {
        setUser(user)
    }, [])

    useEffect(() => {
        const getInfo = async() => {

            try {
                const res = await axios.get(`${API_URL}/profile/info`, { withCredentials: true })
                setUser(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getInfo(); 
      }, [])

    return (
        <div>
        {user.profilePicture ? (<Link to='/profile' className='nav-avatar'>
            <Avatar alt={user.username} src={user.profilePicture} sx={{ width: 55, height: 55 }} />
            </Link>) : (<Link to='/profile' className='nav-avatar'>
            <Avatar alt={props.user?.username} src={props.user?.profilePicture} sx={{ width: 55, height: 55 }} />
            </Link>)}
        </div>
    )
}
