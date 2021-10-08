import React, { useEffect, useState} from 'react'
import axios from 'axios';
import Badge from '@mui/material/Badge';


const API_URL = process.env.REACT_APP_API_URL;

export default function Status({user}) {

    const [loggedUser, setUser] = useState(null)

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const loggedUser = await axios.get(`${API_URL}/profile/info`, { withCredentials: true });
                setUser(loggedUser.data);
            } catch (err) {
                console.log(err)
            }
        }
      getUserDetails();
    }, [])

    return (

        <div>
        {loggedUser ? (<Badge badgeContent=' '
        color={ loggedUser.following.includes(user._id) ?  "secondary": 'primary'}
        variant='dot'
        className='profile-name'
        >
        {user ? <h1>{user.username}</h1> : 'unknown'}
        </Badge>) : 'loading...'}

            
        </div>
    )
}
