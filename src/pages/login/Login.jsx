import { useState, useContext } from 'react';
import './login.css'
import axios from "axios";
import { AuthContext } from '../../context/auth.context';


const API_URL = process.env.REACT_APP_API_URL;

export default function Login(props) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { logInUser } = useContext(AuthContext);  

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestBody = { username, password };
            const userData = await axios.post(`${API_URL}/auth/login`, requestBody, { withCredentials: true });
            console.log('data:', userData)
            logInUser(userData.data.user);
            props.history.push('/profile');
        } catch (err) {
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);
        }
       
    };

    return (
        <div className='login'>
           <form onSubmit={handleLoginSubmit} className='login-form'>
           <label htmlFor="">Username</label>
               <input 
               type="text" 
               placeholder='username...' 
               value={username}
               name='username'
               onChange={handleUsername}
               />
               {errorMessage ? <p className='error'>{errorMessage}</p> : ''}
               <label htmlFor="">Password</label>
               <input 
               type="password" 
               placeholder='password...' 
               value={password}
               name='password'
               onChange={handlePassword}
               />
               <button type='submit'>Login</button>
           </form>  
           <h1>Login</h1>
        </div>   
    )
}
