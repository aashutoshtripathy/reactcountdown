import React from 'react';
import '../App.css';
import { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [inpVal, setInpVal] = useState({
        fname: '',
        lname: '',
        email: '',
        mob: '',
        gender: '',
        pass: '',
        cpass: ''
    })

    const [error, setError] = useState({
        pass: '',
        cpass: ''
    })


    


    const handleSubmit = (e) => {
        e.preventDefault();


        if(inpVal.mob.length < 10){
            setError((prevError) => ({
                ...prevError,
                mob: 'please enter 10 digit mobile number'
            }))
            return;
        }else{
            setError((prevError) => ({
                ...prevError,
                mob: ''
            }))
        }


        if(inpVal.pass !== inpVal.cpass) {
            setError((prevError) => ({
                ...prevError,
                cpass: 'Password dont match'
            }))
            return;
        } else {
            setError((prevError) => ({
                ...prevError,
                cpass: ''
            }))
        }



        axios.post("http://localhost:8001/signup" ,inpVal)
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log('Error in submitting the form',error)
    })

        


        setInpVal({
            fname: '',
            lname: '',
            email: '',
            mob: '',
            gender: '',
            pass: '',
            cpass: '' 
            })
    }

    const handleChange = (identifier, value) => {
        setInpVal(prevVal => ({
            ...prevVal,
            [identifier]: value
        }))

        
    }

  return (
    <div>
        <div>
            <h1>SignUp Form</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <label>First Name:
            <input type='text' value={inpVal.fname} onChange={(e) => handleChange('fname',e.target.value)} placeholder='First Name'/>
        </label>
        <label>Last Name:
            <input type='text' value={inpVal.lname} onChange={(e) => handleChange('lname',e.target.value)} placeholder='Last Name'/>
        </label>
        <label>Email:
            <input type='email' value={inpVal.email} onChange={(e) => handleChange('email',e.target.value)} placeholder='Email'/>
        </label>
        <label>Mobile No.:
            <input type='number' value={inpVal.mob} onChange={(e) => handleChange('mob',e.target.value)} placeholder='Mobile'/>
            {error.mob && <p style={{color:'red'}}>{error.mob}</p>}
        </label>
        <div>
        <label>Gender:</label><br/>
        <label htmlFor="Male">Male
        <input type="radio" id="Male" name="gender" checked={inpVal.gender === 'male'} value="male" onChange={() => handleChange('gender','male')}/>
        </label>
        <label htmlFor="Female">Female
        <input type="radio" id="Female" name="gender" checked={inpVal.gender === 'female'} value="female" onChange={() => handleChange('gender','female')}/>
        </label>
        <label htmlFor="Other">Other
        <input type="radio" id="Other" name="gender" checked={inpVal.gender === 'other'} value="other" onChange={() => handleChange('gender','other')}/>
        </label>
        </div>
        <label>Password:
            <input type='Password' value={inpVal.pass} onChange={(e) => handleChange('pass',e.target.value)} placeholder='Password'/> 
        </label>
        <label>Re-Password:
            <input type='text' value={inpVal.cpass} onChange={(e) => handleChange('cpass',e.target.value)} placeholder='Password'/>
            {error.cpass && <p style={{color:'red'}}>{error.cpass}</p>}
        </label>
        <input style={{width:'10%',backgroundColor:'blue',color:'white'}} value={`SignUp`} type='submit'/>
        </form>
    </div>
  )
}

export default Form