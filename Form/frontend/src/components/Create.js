import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Create = () => {

  const navigate = useNavigate();


  const [inpVal, setInpVal] = useState({
    email: '',
    password: ''
  })

  const [edit, setEdit] = useState({
    email: false,
    password: false
  })





    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inpVal);
        setInpVal({
          email: '',
          password: ''
        })
        setEdit({
          email:false
        })



        axios.post('http://localhost:8000/create',inpVal)
        .then(response => {
          console.log(response.data);
          navigate('/');
        })
        .catch(error => { 
          console.log('Error in submitting the form', error); 
        })
    }

    function handleChange(identifier,value){
      setInpVal(prevVal => ({
        ...prevVal,
        [identifier]: value
      }))
      setEdit(prevEdit => ({
        ...prevEdit,
        [identifier]: false
      }))
    }

    function handleBlur(identifier){
      setEdit(pervval =>({
        ...pervval,
        [identifier]: true
      }))
    }
    
  
    const emailIsInvalid = edit.email && !inpVal.email.includes('@')
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Username:</label>
            <input type='text' name='email' id='email' value={inpVal.email} onBlur={() => handleBlur('email')} onChange={(event) => handleChange('email' ,event.target.value)} placeholder='Username'/>
            <div>{emailIsInvalid && <p>Please enter a valid email.</p>}</div>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' id='password' value={inpVal.password} onChange={(event) => handleChange('password',event.target.value)} placeholder='Password'/>
            <input type='submit' value={`Login`}/>
        </form>
    </div>
  )
}

export default Create