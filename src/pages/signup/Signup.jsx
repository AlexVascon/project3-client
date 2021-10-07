import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";


const API_URL = "http://localhost:5005";

export default function SignupForm(props) {
    

    const [errorMessage, setErrorMessage] = useState(undefined);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(`${API_URL}/auth/signup`, data)
            props.history.push('/login') 
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='signup'>
           <form onSubmit={handleSubmit(onSubmit)} className='form'>
           <label htmlFor="">Username</label>
               <input 
               type="text" 
               placeholder='username...' 
               {...register('username')} 
               name='username'
               />
               {errorMessage ? <p className='error'>{errorMessage}</p> : 'loading..'}
               <label htmlFor="">Password</label>
               <input 
               type="password" 
               placeholder='password...' 
               {...register('password')} 
               name='password'
               />
               <button type='submit'>Signup</button>
           </form>
           </div>
    )
}
