import React, { useState, useEffect } from 'react'
import './profilePhoto.css'
import axios from 'axios';
import Badge from '@mui/material/Badge';
import Status from '../../Status';


const API_URL = process.env.REACT_APP_API_URL;

export default function ProfilePhoto(props) {

    const [user, setUser] = useState('');


    const isFollowing = async () => {
        try {
            const updatedProfile = await axios.get(`${API_URL}/follow/request/${props.userId}`,{ withCredentials: true })
            setUser(updatedProfile.data)
        } catch (err) {
            console.log(err)
        }
    
    }

    useEffect(() => {
        const getInfo = async () => {
            try {
                const { userId } = props;
                const profileUser = await axios.get(`${API_URL}/users/visit/${userId}`, { withCredentials: true })
                setUser(profileUser.data)
            } catch (err) {
                console.log(err);
            }
        }
        getInfo(); 
      }, [])

    return (
        <>
        <div className='visit-profile-image' style={{zIndex:2}}>
        <img src={user?.profilePicture} alt="" onClick={() => isFollowing()} />
        {/* <Badge badgeContent=' '
        color="secondary" 
        variant='dot'
        className='profile-name'
        >
            {user ? <h1>{user.username}</h1> : 'unknown'}
            </Badge> */}
            <Status user={user} />
            {user ? <div className='visit-followers'>
                        <h3>Following: {user.following?.length}</h3> 
                        <h3>Followers: {user.followers?.length}</h3>
                     </div> : ''}
            {user ? <p>{user.description}</p> : 'Empty'}
        </div>
        
        </>
    )
}
