import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProfileImage from '../profileImage/ProfileImage'


const API_URL = process.env.REACT_APP_API_URL;

export default function CoverImage() {

    const [file, setFile] = useState('');

    const handleUpload = e => {
        const uploadData = new FormData();
        uploadData.append('coverPicture', e.target.files[0]);

        axios.post(`${API_URL}/profile/upload/coverPicture`, uploadData, { withCredentials: true })
          .then(res => setFile(res.secure_url))
          .catch(err => console.log('here?', err));
      };

    useEffect(() => {
        const getInfo = () => {
            axios.get(`${API_URL}/profile/info`, { withCredentials: true })
            .then(response => {
                setFile(response.data.coverPicture);
            })
            .catch(err => console.log('err:',err))
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
