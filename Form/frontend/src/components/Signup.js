import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Signup = () => {
    const [inpVal, setInpVal] = useState({
        fname: '',
        lname: '',
        email: '',
        pass: '',
        cpass: ''
    })


    function handleChange(identifier,value){
        setInpVal(prevVal => ({
            ...prevVal,
            [identifier]: value
        }))
    }


    function handleSubmit(e){
        e.preventDefault();

        setInpVal({
            fname: '',
            lname: '',
            email: '',
            pass: '',
            cpass: '' 
        })



        axios.post('http://localhost:8000/signup',inpVal)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error in submitting the form ',error)
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='fname'>First Name:</label>
            <input type='text' name='fname' id='fname' onChange={(e) => handleChange('fname',e.target.value)} value={inpVal.fname}/>
            <label htmlFor='lname'>Last Name:</label>
            <input type='text' name='lname' id='lname' onChange={(e) => handleChange('lname',e.target.value)} value={inpVal.lname}/>
            <label htmlFor='email'>E-Mail</label>
            <input type='email' name='email' id='email' onChange={(e) => handleChange('email',e.target.value)} value={inpVal.email}/>
            <label htmlFor='pass'>Password:</label>
            <input type='password' name='pass' id='pass' onChange={(e) => handleChange('pass',e.target.value)} value={inpVal.pass}/>
            <label htmlFor='cpass'>Re-Password:</label>
            <input type='text' name='cpass' id='cpass' onChange={(e) => handleChange('cpass',e.target.value)} value={inpVal.cpass}/>    
            <input type='submit' value={`SignUp`} />
        </form>
    </div>
  )
}

export default Signup