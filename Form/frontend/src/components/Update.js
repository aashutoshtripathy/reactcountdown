import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';

const Update = () => {

  const navigate = useNavigate();

  const {id} = useParams();





  const [inpVal, setInpVal] = useState({
    email: '',
    password: ''
  })

  const [edit, setEdit] = useState({
    email: false,
    password: false
  })

  useEffect(() => {
    const fetchData = async(id) => {
    try {
      if(id){
      const response = await axios.get(`http://localhost:8000/api/data/:${id}`);
      setInpVal(response.data[0])
      }
    } catch (error) {
      console.log('Error in fetching the data:',error);
    }
  }

 fetchData();
  }, [id])
  

 


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



        axios.post(`http://localhost:8000/api/data/${id}`,inpVal)
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
            <input type='submit' value={`Update`}/>
        </form>
    </div>
  )
}

 
export default Update