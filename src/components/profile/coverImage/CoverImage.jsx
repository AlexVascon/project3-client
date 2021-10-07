import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProfileImage from '../profileImage/ProfileImage'


const API_URL = process.env.REACT_APP_API_URL;

export default function CoverImage(props) {

    const [file, setFile] = useState('');

    const handleUpload = async (e) => {

        try {
        const uploadData = new FormData();
        uploadData.append('coverPicture', e.target.files[0]);
        const res = await axios.post(`${API_URL}/profile/upload/coverPicture`, uploadData, { withCredentials: true });
        setFile(res.secure_url);
        props.history?.push('/profile')
        } catch(err) {
            console.log(err)
        }
      };

    useEffect(() => {
        const getInfo = async() => {

            try {
                const res = await axios.get(`${API_URL}/profile/info`, { withCredentials: true })
                setFile(res.data.coverPicture)
            } catch(err) {
                console.log(err)
            }
        }
        getInfo(); 
      })
    
    return (
        <div id='backdrop' className='backdrop' style={{backgroundImage: `url(${file})`}}>
            <label htmlFor='coverFile' className='backdrop-select' style={{zIndex:1}}>
            <input style={{display: 'none'}} type="file" id='coverFile' accept='.png, .jpeg, .jpg' onChange={handleUpload} />
            </label>
            <ProfileImage />
        </div>
    )
}
